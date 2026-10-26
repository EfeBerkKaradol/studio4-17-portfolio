'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import QuoteForm from '@/components/QuoteForm/QuoteForm';
import { parseSTL, parseOBJ, parse3MF } from '@/lib/meshParse';
import { pricing, materials, qualities, estimatePrint, formatTRY, PRICING_VERSION } from '@/lib/pricing';
import { UPLOAD } from '@/lib/quote';
import { track } from '@/lib/analytics';
import styles from './Calculator.module.css';

const ModelViewer = dynamic(() => import('@/components/ModelViewer/ModelViewer'), { ssr: false });

const fmt = (n, d = 1) => n.toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d });

function formatDuration(min) {
  if (min < 60) return `${Math.max(5, Math.round(min / 5) * 5)} dk`;
  const h = Math.floor(min / 60);
  const m = Math.round((min % 60) / 10) * 10;
  return m ? `${h} sa ${m} dk` : `${h} sa`;
}

const AUTO_EXT = ['stl', 'obj', '3mf'];
const MANUAL_EXT = ['step', 'stp'];
const MAX_ANALYSIS_MB = 100;

async function buildGeometry(ext, buffer, text, data) {
  try {
    const THREE = await import('three');
    if (ext === 'stl') {
      const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
      return new STLLoader().parse(buffer);
    }
    if (ext === 'obj') {
      const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js');
      const { mergeGeometries } = await import('three/examples/jsm/utils/BufferGeometryUtils.js');
      const parts = [];
      new OBJLoader().parse(text).traverse((c) => {
        if (c.isMesh) {
          const g = c.geometry.clone();
          g.deleteAttribute('uv');
          g.deleteAttribute('normal');
          parts.push(g);
        }
      });
      return parts.length ? mergeGeometries(parts, false) || parts[0] : null;
    }
    if (ext === '3mf' && data.mesh) {
      const pos = [];
      for (const [i, j, k] of data.mesh.faces) {
        const a = data.mesh.vertices[i], b = data.mesh.vertices[j], c = data.mesh.vertices[k];
        if (a && b && c) pos.push(...a, ...b, ...c);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      return g;
    }
  } catch {
    /* önizleme olmadan da tahmin çalışır */
  }
  return null;
}

export default function Calculator() {
  const [file, setFile] = useState(null);
  const [model, setModel] = useState(null); // { data, geometry }
  const [state, setState] = useState('empty'); // empty | reading | ready | manual | error
  const [message, setMessage] = useState('');
  const [materialId, setMaterialId] = useState('pla');
  const [qualityId, setQualityId] = useState('normal');
  const [infill, setInfill] = useState(20);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const inputRef = useRef(null);
  const started = useRef(false);
  const lastSuccess = useRef(null);

  const material = materials.find((m) => m.id === materialId);
  const quality = qualities.find((q) => q.id === qualityId);

  const fail = (msg, reason) => {
    setState('error');
    setMessage(msg);
    track('calculator_error', { reason });
  };

  const handleFile = async (f) => {
    if (!f) return;
    if (!started.current) {
      started.current = true;
      track('calculator_start');
    }
    setFile(f);
    setModel(null);
    setShowForm(false);
    const ext = f.name.toLowerCase().split('.').pop();

    if (MANUAL_EXT.includes(ext)) {
      setState('manual');
      setMessage('STEP dosyaları tarayıcıda analiz edilemiyor. Dosyayı teklif formuyla gönderin; manuel olarak değerlendirelim.');
      track('calculator_error', { reason: 'step_manual' });
      return;
    }
    if (!AUTO_EXT.includes(ext)) return fail('Bu dosya türü desteklenmiyor. STL, OBJ veya 3MF yükleyin; diğer biçimler için teklif formunu kullanın.', 'unsupported_format');
    if (f.size > MAX_ANALYSIS_MB * 1024 * 1024) return fail(`Dosya ${MAX_ANALYSIS_MB} MB’tan büyük; tarayıcıda analiz edilemiyor. Teklif formundan paylaşım linkiyle gönderin.`, 'too_large');

    setState('reading');
    setMessage('');
    try {
      const buffer = await f.arrayBuffer();
      const text = ext === 'obj' ? new TextDecoder().decode(buffer) : null;
      const data = ext === 'stl' ? parseSTL(buffer) : ext === 'obj' ? parseOBJ(text) : await parse3MF(buffer);
      if (!data || !(data.volume > 0)) throw new Error('Modelde ölçülebilir bir hacim bulunamadı. Mesh kapalı (su geçirmez) olmayabilir.');
      const maxDim = Math.max(data.dimensions.x, data.dimensions.y, data.dimensions.z);
      if (maxDim > pricing.autoEstimateMaxMm) {
        setModel({ data, geometry: await buildGeometry(ext, buffer, text, data) });
        setState('manual');
        setMessage(`Model ${maxDim.toFixed(0)} mm ile otomatik tahmin sınırını (${pricing.autoEstimateMaxMm} mm) aşıyor. Bölünerek basılması gerekebilir; manuel teklif hazırlayalım.`);
        track('calculator_error', { reason: 'too_big_auto' });
        return;
      }
      setModel({ data, geometry: await buildGeometry(ext, buffer, text, data) });
      setState('ready');
    } catch (e) {
      fail(`Dosya okunamadı: ${e.message || 'bilinmeyen hata'}. Dosyayı teklif formuyla gönderebilirsiniz.`, 'parse_error');
    }
  };

  const estimate = useMemo(() => {
    if (state !== 'ready' || !model || !material?.auto) return null;
    return estimatePrint(model.data, { materialId, qualityId, infillPercent: infill, quantity });
  }, [state, model, material, materialId, qualityId, infill, quantity]);

  // Her dosya için bir kez başarı olayı
  useEffect(() => {
    if (estimate && file && lastSuccess.current !== file) {
      lastSuccess.current = file;
      track('calculator_success', { material: materialId });
    }
  }, [estimate, file, materialId]);

  const dims = model?.data.dimensions;
  const dimsText = dims ? `${dims.x.toFixed(0)} × ${dims.y.toFixed(0)} × ${dims.z.toFixed(0)} mm` : '';
  const maxDim = dims ? Math.max(dims.x, dims.y, dims.z) : 0;
  const tinyModel = dims && maxDim < 5;
  const splitWarning = dims && maxDim > pricing.singlePieceWarnMm && maxDim <= pricing.autoEstimateMaxMm;
  const attachable = file && file.size <= UPLOAD.maxTotalBytes;

  const prefillDescription = [
    `3D baskı fiyat tahmini aracından geliyorum. Dosya: ${file?.name || '-'}.`,
    dims ? `Model ölçüsü: ${dimsText}.` : '',
    `Tercih: ${material?.name}, ${quality?.name} (${quality?.layer} mm), %${infill} dolgu, ${quantity} adet.`,
    estimate ? `Otomatik ön tahmin: ${formatTRY(estimate.low)} – ${formatTRY(estimate.high)} (fiyat yapılandırması ${PRICING_VERSION}).` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div className={styles.viewer}>
          <ModelViewer geometry={model?.geometry || null} fileName={file?.name} />
        </div>

        <div className={styles.side}>
          <div
            className={styles.drop}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile(e.dataTransfer.files[0]);
            }}
          >
            <input
              ref={inputRef}
              id="calc-file"
              type="file"
              accept=".stl,.obj,.3mf,.step,.stp"
              className="visually-hidden"
              onChange={(e) => {
                handleFile(e.target.files[0]);
                e.target.value = '';
              }}
            />
            <label htmlFor="calc-file" className="btn btn-primary">
              {file ? 'Başka dosya seç' : 'Model dosyası seç'}
            </label>
            <p className="muted small">veya sürükleyip bırakın · STL, OBJ, 3MF (STEP: manuel teklif)</p>
            <p className="muted small">Dosya sunucuya gönderilmez; analiz tarayıcınızda yapılır.</p>
          </div>

          <div aria-live="polite">
            {state === 'reading' && <p className={styles.info}>Dosya okunuyor…</p>}
            {(state === 'error' || state === 'manual') && (
              <div className={state === 'error' ? styles.error : styles.info} role={state === 'error' ? 'alert' : undefined}>
                <p>{message}</p>
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(true)} style={{ marginTop: '0.75rem' }}>
                  Manuel teklif iste
                </button>
              </div>
            )}
          </div>

          {model && (
            <dl className={styles.facts}>
              <div>
                <dt>Ölçü</dt>
                <dd>{dimsText}</dd>
              </div>
              <div>
                <dt>Hacim</dt>
                <dd>{fmt(model.data.volume / 1000)} cm³</dd>
              </div>
              <div>
                <dt>Üçgen</dt>
                <dd>{model.data.triangleCount.toLocaleString('tr-TR')}</dd>
              </div>
            </dl>
          )}
          {tinyModel && (
            <p className={styles.warn}>Model çok küçük görünüyor ({dimsText}). Dosya metre veya inç biriminde olabilir; birimin mm olduğundan emin olun.</p>
          )}
          {splitWarning && (
            <p className={styles.warn}>Model {pricing.singlePieceWarnMm} mm’den büyük; tek parça basılamayabilir. Bölme ve birleştirme kesin teklifte değerlendirilir.</p>
          )}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.options}>
          <fieldset>
            <legend>Malzeme</legend>
            <div className={styles.choices}>
              {materials.map((m) => (
                <label key={m.id} className={materialId === m.id ? styles.on : ''}>
                  <input type="radio" name="material" value={m.id} checked={materialId === m.id} onChange={() => setMaterialId(m.id)} />
                  <span>
                    <strong>{m.name}</strong>
                    <small>{m.note}</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Katman yüksekliği</legend>
            <div className={styles.choices}>
              {qualities.map((q) => (
                <label key={q.id} className={qualityId === q.id ? styles.on : ''}>
                  <input type="radio" name="quality" value={q.id} checked={qualityId === q.id} onChange={() => setQualityId(q.id)} />
                  <span>
                    <strong>{q.name}</strong>
                    <small>{q.layer} mm</small>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="calc-infill">Dolgu oranı: %{infill}</label>
              <input id="calc-infill" type="range" min={10} max={100} step={5} value={infill} onChange={(e) => setInfill(Number(e.target.value))} />
            </div>
            <div className={styles.field}>
              <label htmlFor="calc-qty">Adet</label>
              <input
                id="calc-qty"
                type="number"
                inputMode="numeric"
                min={1}
                max={pricing.maxQuantity}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(pricing.maxQuantity, Number(e.target.value) || 1)))}
              />
            </div>
          </div>
        </div>

        <aside className={styles.result} aria-live="polite">
          <span className="eyebrow">Otomatik ön tahmin</span>
          {estimate ? (
            <>
              <p className={styles.price}>
                {formatTRY(estimate.low)} – {formatTRY(estimate.high)}
              </p>
              <ul className={styles.breakdown}>
                <li>
                  <span>Tahmini malzeme</span>
                  <span>≈ {fmt(estimate.weightGrams, 0)} g / adet</span>
                </li>
                <li>
                  <span>Tahmini baskı süresi</span>
                  <span>≈ {formatDuration(estimate.printMinutes)} / adet</span>
                </li>
                <li>
                  <span>Adet</span>
                  <span>{estimate.qty}</span>
                </li>
              </ul>
              <p className="small muted">
                Bu bir <strong>slicer çıktısı değildir</strong>; model hacmine dayalı yaklaşık bir hesaptır. Destek yapıları, baskı
                yönü, son işlemler ve gönderim dahil değildir. Kesin fiyat, dosya incelendikten sonra yazılı teklifle verilir.
              </p>
            </>
          ) : state === 'ready' && !material?.auto ? (
            <p className="small">
              {material.name} için otomatik tahmin gösterilmiyor; uygunluk ve fiyat teklif aşamasında belirlenir.
            </p>
          ) : (
            <p className="small muted">Tahmin görmek için STL, OBJ veya 3MF dosyası yükleyin.</p>
          )}
          <button type="button" className="btn btn-accent btn-block" onClick={() => setShowForm(true)} disabled={!file}>
            Bu dosya için kesin teklif iste
          </button>
          {!file && (
            <p className="small muted" style={{ marginTop: '0.5rem' }}>
              Dosyanız hazır değil mi? <Link href="/teklif-al?hizmet=3d-baski" className="text-link">Teklif formuna gidin</Link>.
            </p>
          )}
        </aside>
      </div>

      {showForm && file && (
        <div className={styles.formWrap} id="kesin-teklif">
          {!attachable && (
            <p className="notice" style={{ marginBottom: '1rem' }}>
              Dosyanız {UPLOAD.maxTotalBytes / 1024 / 1024} MB’tan büyük olduğu için forma otomatik eklenemedi. Lütfen “paylaşım linki”
              alanına bir indirme linki ekleyin.
            </p>
          )}
          <QuoteForm
            key={file.name + file.size}
            title="Kesin teklif iste"
            defaultService="3d-baski"
            initialFiles={attachable ? [file] : []}
            prefill={{ description: prefillDescription, dimensions: dimsText, quantity }}
            location="calculator"
          />
        </div>
      )}
    </div>
  );
}
