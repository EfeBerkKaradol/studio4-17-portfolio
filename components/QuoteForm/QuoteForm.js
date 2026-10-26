'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { quoteServiceOptions } from '@/data/services';
import {
  UPLOAD,
  customerTypes,
  contactMethods,
  budgetOptions,
  fieldsForService,
  quantityLabel,
  validateQuote,
  validateFiles,
  fileExt,
} from '@/lib/quote';
import { track } from '@/lib/analytics';
import { buildWhatsAppMessage } from '@/lib/whatsapp';
import { site } from '@/lib/site';
import { WhatsAppLink, EmailLink } from '@/components/Contact/ContactLinks';
import styles from './QuoteForm.module.css';

const newId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

const FIELD_ORDER = ['customerType', 'service', 'description', 'scale', 'dimensions', 'quantity', 'deadline', 'budget', 'files', 'fileLink', 'name', 'organization', 'contactMethod', 'phone', 'email', 'privacy'];

const formatSize = (b) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

export default function QuoteForm({
  defaultService = '',
  defaultCustomerType = '',
  initialFiles = [],
  prefill = {},
  location = 'quote_page',
  title = 'Teklif formu',
}) {
  const pathname = usePathname();
  const [values, setValues] = useState({
    customerType: defaultCustomerType,
    service: defaultService,
    description: prefill.description || '',
    scale: prefill.scale || '',
    dimensions: prefill.dimensions || '',
    quantity: prefill.quantity ? String(prefill.quantity) : '',
    deadline: '',
    budget: '',
    name: '',
    organization: '',
    contactMethod: '',
    phone: '',
    email: '',
    fileLink: '',
    privacy: false,
  });
  const [files, setFiles] = useState(initialFiles);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [progress, setProgress] = useState(0);
  const [serverMessage, setServerMessage] = useState('');
  const [reference, setReference] = useState('');
  const submissionId = useRef(newId());
  const startedAt = useRef(0);
  const started = useRef(false);
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Not: başlangıç dosyaları değişirse üst bileşen formu `key` ile yeniden oluşturur.

  const extra = fieldsForService(values.service);
  const isPro = values.customerType === 'profesyonel';
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const markStarted = () => {
    if (started.current) return;
    started.current = true;
    track('quote_form_start', { location, service: values.service || undefined });
  };

  const update = (name, value) => {
    markStarted();
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    update(name, type === 'checkbox' ? checked : value);
  };

  const addFiles = (list) => {
    markStarted();
    const next = [...files, ...Array.from(list)];
    const err = validateFiles(next);
    if (err) {
      setErrors((e) => ({ ...e, files: err }));
      return;
    }
    setErrors((e) => ({ ...e, files: undefined }));
    setFiles(next);
  };

  const removeFile = (i) => {
    setFiles((f) => f.filter((_, idx) => idx !== i));
    setErrors((e) => ({ ...e, files: undefined }));
  };

  const focusFirstError = (errs) => {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (!first) return;
    const el = formRef.current?.querySelector(`[name="${first}"]`) || formRef.current?.querySelector(`#qf-${first}`);
    el?.focus();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const errs = validateQuote({ ...values, privacy: values.privacy ? 'on' : '' }, files.map((f) => ({ name: f.name, size: f.size })));
    const clean = Object.fromEntries(Object.entries(errs).filter(([, v]) => v));
    if (Object.keys(clean).length) {
      setErrors(clean);
      setStatus('idle');
      focusFirstError(clean);
      return;
    }

    const fd = new FormData();
    Object.entries(values).forEach(([k, v]) => fd.append(k, k === 'privacy' ? (v ? 'on' : '') : v));
    files.forEach((f) => fd.append('files', f, f.name));
    fd.append('submissionId', submissionId.current);
    fd.append('startedAt', String(startedAt.current));
    fd.append('sourcePath', pathname);
    fd.append('website', formRef.current?.elements.website?.value || '');

    setStatus('submitting');
    setServerMessage('');
    setProgress(0);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/quote');
    xhr.responseType = 'json';
    xhr.timeout = 60000;
    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
    };
    const fail = (message, reason, fields) => {
      setStatus('error');
      setServerMessage(message);
      if (fields) {
        setErrors(fields);
        focusFirstError(fields);
      } else {
        setTimeout(() => statusRef.current?.focus(), 0);
      }
      track('quote_form_submit_error', { location, reason, service: values.service });
    };
    xhr.onload = () => {
      const body = xhr.response || {};
      if (xhr.status >= 200 && xhr.status < 300 && body.ok) {
        setReference(body.reference);
        setStatus('success');
        if (files.length) track('file_upload_success', { location, count: files.length });
        track(
          'quote_form_submit_success',
          { location, service: values.service, customer_type: values.customerType, reference: body.reference },
          { dedupeKey: `quote:${body.reference}`, dedupeMs: 60 * 60 * 1000 }
        );
        submissionId.current = newId();
        setTimeout(() => statusRef.current?.focus(), 0);
      } else {
        fail(body.message || 'Talebiniz gönderilemedi. Lütfen tekrar deneyin.', body.error || `http_${xhr.status}`, body.fields);
      }
    };
    xhr.onerror = () => fail('Bağlantı hatası oluştu. İnternet bağlantınızı kontrol edip tekrar deneyin.', 'network');
    xhr.ontimeout = () => fail('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.', 'timeout');
    xhr.send(fd);
  };

  const serviceLabel = quoteServiceOptions.find((s) => s.value === values.service)?.label;
  const waMessage = buildWhatsAppMessage({
    base: 'Merhaba, teklif almak istiyorum.',
    service: serviceLabel,
    scale: extra.includes('scale') ? values.scale : '',
    dimensions: extra.includes('dimensions') ? values.dimensions : '',
    quantity: extra.includes('quantity') ? values.quantity : '',
    reference,
  });

  if (status === 'success') {
    const via = contactMethods.find((c) => c.value === values.contactMethod)?.label;
    return (
      <div className={styles.success} ref={statusRef} tabIndex={-1} role="status">
        <span className="eyebrow">Talebiniz alındı</span>
        <h2>Teşekkürler, {values.name.split(' ')[0]}.</h2>
        <p>
          Referans numaranız: <strong className={styles.ref}>{reference}</strong>
        </p>
        <h3>Bundan sonra ne olacak?</h3>
        <ol className={styles.nextSteps}>
          <li>Gönderdiğiniz bilgi ve dosyaları inceleyip işin uygulanabilirliğini değerlendiririz.</li>
          <li>Eksik bilgi varsa seçtiğiniz kanaldan ({via}) size ulaşırız.</li>
          <li>Kapsam, fiyat ve teslim tarihini içeren yazılı teklif iletilir. Onayınız olmadan üretime başlanmaz.</li>
        </ol>
        <p className="muted small">
          Yanıt süresi iş yoğunluğuna göre değişir. Teslim tarihiniz yakınsa referans numaranızla WhatsApp’tan da yazabilirsiniz.
        </p>
        <div className="btn-row">
          <WhatsAppLink message={waMessage} location="quote_success" service={values.service} className="btn btn-outline">
            Referansla WhatsApp’tan yaz
          </WhatsAppLink>
          <Link href="/portfolyo" className="btn btn-outline">
            Portfolyoya dön
          </Link>
        </div>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((k) => errors[k]);
  const err = (k) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `qf-${k}-err` } : {});
  const errorText = (k) =>
    errors[k] ? (
      <p id={`qf-${k}-err`} className={styles.errorText}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={styles.form} aria-labelledby="qf-title" onFocus={markStarted}>
      <h2 id="qf-title" className={styles.formTitle}>
        {title}
      </h2>
      <p className="muted small">Zorunlu alanlar * ile işaretlidir. Formu doldurmak birkaç dakika sürer.</p>

      {(errorList.length > 0 || (status === 'error' && serverMessage)) && (
        <div className={styles.errorSummary} role="alert" ref={statusRef} tabIndex={-1}>
          <strong>{serverMessage || 'Lütfen aşağıdaki alanları kontrol edin:'}</strong>
          {errorList.length > 0 && (
            <ul>
              {errorList.map((k) => (
                <li key={k}>
                  <a href={`#qf-${k}`}>{errors[k]}</a>
                </li>
              ))}
            </ul>
          )}
          {status === 'error' && !errorList.length && (
            <div className="btn-row" style={{ marginTop: '0.75rem' }}>
              <WhatsAppLink message={waMessage} location="quote_error" service={values.service} className="btn btn-whatsapp" />
              {site.email && (
                <EmailLink location="quote_error" className="btn btn-outline" subject={`Teklif talebi${serviceLabel ? ` · ${serviceLabel}` : ''}`}>
                  E-posta gönder
                </EmailLink>
              )}
            </div>
          )}
        </div>
      )}

      {/* 1. Proje */}
      <fieldset className={styles.group}>
        <legend>1. Proje</legend>

        <div className={styles.field} id="qf-customerType" tabIndex={-1}>
          <span className={styles.label} id="qf-customerType-label">
            Kimsiniz? *
          </span>
          <div className={styles.segment} role="radiogroup" aria-labelledby="qf-customerType-label" {...err('customerType')}>
            {customerTypes.map((c) => (
              <label key={c.value} className={values.customerType === c.value ? styles.segOn : ''}>
                <input type="radio" name="customerType" value={c.value} checked={values.customerType === c.value} onChange={onChange} />
                {c.label}
              </label>
            ))}
          </div>
          {errorText('customerType')}
        </div>

        <div className={styles.field}>
          <label htmlFor="qf-service" className={styles.label}>
            Hangi hizmet? *
          </label>
          <select id="qf-service" name="service" value={values.service} onChange={onChange} {...err('service')}>
            <option value="">Seçin</option>
            {quoteServiceOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {errorText('service')}
        </div>

        <div className={styles.field}>
          <label htmlFor="qf-description" className={styles.label}>
            Projenizi anlatın *
          </label>
          <p className={styles.hint} id="qf-description-hint">
            Ne üretilecek, ne amaçla kullanılacak, elinizde hangi dosyalar var?
          </p>
          <textarea
            id="qf-description"
            name="description"
            rows={5}
            value={values.description}
            onChange={onChange}
            maxLength={3000}
            aria-describedby={errors.description ? 'qf-description-err' : 'qf-description-hint'}
            aria-invalid={errors.description ? true : undefined}
          />
          {errorText('description')}
        </div>

        {extra.length > 0 && (
          <div className={styles.row}>
            {extra.includes('scale') && (
              <div className={styles.field}>
                <label htmlFor="qf-scale" className={styles.label}>
                  Ölçek
                </label>
                <input id="qf-scale" name="scale" placeholder="ör. 1/200" value={values.scale} onChange={onChange} maxLength={60} {...err('scale')} />
                {errorText('scale')}
              </div>
            )}
            {extra.includes('dimensions') && (
              <div className={styles.field}>
                <label htmlFor="qf-dimensions" className={styles.label}>
                  Yaklaşık boyut
                </label>
                <input id="qf-dimensions" name="dimensions" placeholder="ör. 40 × 60 cm taban" value={values.dimensions} onChange={onChange} maxLength={120} {...err('dimensions')} />
                {errorText('dimensions')}
              </div>
            )}
            {extra.includes('quantity') && (
              <div className={styles.field}>
                <label htmlFor="qf-quantity" className={styles.label}>
                  {quantityLabel(values.service)}
                </label>
                <input id="qf-quantity" name="quantity" type="number" inputMode="numeric" min={1} max={1000} value={values.quantity} onChange={onChange} {...err('quantity')} />
                {errorText('quantity')}
              </div>
            )}
          </div>
        )}

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="qf-deadline" className={styles.label}>
              İstenen teslim tarihi
            </label>
            <input id="qf-deadline" name="deadline" type="date" min={today} value={values.deadline} onChange={onChange} {...err('deadline')} />
            {errorText('deadline')}
          </div>
          <div className={styles.field}>
            <label htmlFor="qf-budget" className={styles.label}>
              Tahmini bütçe (isteğe bağlı)
            </label>
            <select id="qf-budget" name="budget" value={values.budget} onChange={onChange} {...err('budget')}>
              {budgetOptions.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* 2. Dosyalar */}
      <fieldset className={styles.group}>
        <legend>2. Dosyalar (isteğe bağlı)</legend>
        <div className={styles.field} id="qf-files" tabIndex={-1}>
          <p className={styles.hint} id="qf-files-hint">
            Çizim, model veya referans görsel ekleyin. En fazla {UPLOAD.maxFiles} dosya, toplam {UPLOAD.maxTotalBytes / 1024 / 1024} MB.
            Kabul edilenler: {UPLOAD.extensions.map((x) => `.${x}`).join(' ')}
          </p>
          <div
            className={styles.drop}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              id="qf-file-input"
              multiple
              accept={UPLOAD.extensions.map((x) => `.${x}`).join(',')}
              className="visually-hidden"
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = '';
              }}
              aria-describedby={errors.files ? 'qf-files-err' : 'qf-files-hint'}
            />
            <label htmlFor="qf-file-input" className="btn btn-outline">
              Dosya seç
            </label>
            <span className="muted small">veya sürükleyip bırakın</span>
          </div>
          {files.length > 0 && (
            <ul className={styles.fileList} aria-label="Eklenen dosyalar">
              {files.map((f, i) => (
                <li key={`${f.name}-${i}`}>
                  <span className={styles.fileExt}>{fileExt(f.name)}</span>
                  <span className={styles.fileName}>{f.name}</span>
                  <span className="muted small">{formatSize(f.size)}</span>
                  <button type="button" onClick={() => removeFile(i)} className={styles.remove} aria-label={`${f.name} dosyasını kaldır`}>
                    Kaldır
                  </button>
                </li>
              ))}
            </ul>
          )}
          {errorText('files')}
        </div>
        <div className={styles.field}>
          <label htmlFor="qf-fileLink" className={styles.label}>
            Büyük dosyalar için paylaşım linki
          </label>
          <input id="qf-fileLink" name="fileLink" type="url" inputMode="url" placeholder="https://drive.google.com/…" value={values.fileLink} onChange={onChange} {...err('fileLink')} />
          {errorText('fileLink')}
        </div>
      </fieldset>

      {/* 3. İletişim */}
      <fieldset className={styles.group}>
        <legend>3. İletişim</legend>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="qf-name" className={styles.label}>
              Adınız *
            </label>
            <input id="qf-name" name="name" autoComplete="name" value={values.name} onChange={onChange} maxLength={80} {...err('name')} />
            {errorText('name')}
          </div>
          <div className={styles.field}>
            <label htmlFor="qf-organization" className={styles.label}>
              {isPro ? 'Firma / ofis (isteğe bağlı)' : 'Okul / bölüm (isteğe bağlı)'}
            </label>
            <input id="qf-organization" name="organization" autoComplete="organization" value={values.organization} onChange={onChange} maxLength={120} {...err('organization')} />
          </div>
        </div>

        <div className={styles.field} id="qf-contactMethod" tabIndex={-1}>
          <span className={styles.label} id="qf-contactMethod-label">
            Size nasıl ulaşalım? *
          </span>
          <div className={styles.segment} role="radiogroup" aria-labelledby="qf-contactMethod-label" {...err('contactMethod')}>
            {contactMethods.map((c) => (
              <label key={c.value} className={values.contactMethod === c.value ? styles.segOn : ''}>
                <input type="radio" name="contactMethod" value={c.value} checked={values.contactMethod === c.value} onChange={onChange} />
                {c.label}
              </label>
            ))}
          </div>
          {errorText('contactMethod')}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="qf-phone" className={styles.label}>
              Telefon {values.contactMethod === 'whatsapp' || values.contactMethod === 'telefon' ? '*' : '(isteğe bağlı)'}
            </label>
            <input id="qf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="05xx xxx xx xx" value={values.phone} onChange={onChange} {...err('phone')} />
            {errorText('phone')}
          </div>
          <div className={styles.field}>
            <label htmlFor="qf-email" className={styles.label}>
              E-posta {values.contactMethod === 'eposta' ? '*' : '(isteğe bağlı)'}
            </label>
            <input id="qf-email" name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={onChange} {...err('email')} />
            {errorText('email')}
          </div>
        </div>

        <div className={styles.check}>
          <input id="qf-privacy" name="privacy" type="checkbox" checked={values.privacy} onChange={onChange} {...err('privacy')} />
          <label htmlFor="qf-privacy">
            Bilgilerimin bu talebe yanıt vermek amacıyla işleneceğini açıklayan{' '}
            <Link href="/gizlilik" target="_blank" className="text-link">
              KVKK Aydınlatma Metni
            </Link>
            ’ni okudum. *
          </label>
        </div>
        {errorText('privacy')}
      </fieldset>

      {/* Bot tuzağı — insanlar görmez */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor="qf-website">Web siteniz</label>
        <input id="qf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-accent" disabled={status === 'submitting'} aria-describedby="qf-submit-note">
          {status === 'submitting' ? (files.length ? `Yükleniyor… %${progress}` : 'Gönderiliyor…') : 'Teklif talebini gönder'}
        </button>
        {status === 'submitting' && files.length > 0 && (
          <progress className={styles.progress} max={100} value={progress} aria-label="Yükleme ilerlemesi" />
        )}
        <p id="qf-submit-note" className="muted small">
          Bu form bir sipariş değildir; fiyat ve teslim tarihi yazılı teklifle netleşir.
        </p>
      </div>
    </form>
  );
}
