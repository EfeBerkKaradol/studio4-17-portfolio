import { randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { validateQuote, UPLOAD, fileExt, fieldsForService, normalizePhone, budgetOptions, customerTypes, contactMethods } from '@/lib/quote';
import { quoteServiceOptions } from '@/data/services';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// --- Basit kötüye kullanım korumaları (sunucusuz ortamda örnek başına çalışır) ---
const recentSubmissions = new Map(); // submissionId -> yanıt
const ipHits = new Map(); // ip -> [zaman damgaları]
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 8;

function rateLimited(ip) {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  ipHits.set(ip, hits);
  return hits.length > RATE_MAX;
}

// Dosya içeriğinin uzantıyla uyuştuğunu kontrol eder (görsel, PDF, ZIP tabanlı biçimler).
function signatureOk(ext, buf) {
  const b = buf.subarray(0, 12);
  const hex = b.toString('hex');
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return hex.startsWith('ffd8ff');
    case 'png':
      return hex.startsWith('89504e470d0a1a0a');
    case 'webp':
      return b.subarray(0, 4).toString() === 'RIFF' && b.subarray(8, 12).toString() === 'WEBP';
    case 'pdf':
      return b.subarray(0, 4).toString() === '%PDF';
    case 'zip':
    case '3mf':
      return hex.startsWith('504b0304');
    default:
      // CAD/mesh biçimleri için güvenilir imza yok; uzantı + boyut kontrolü yeterli.
      return true;
  }
}

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const labelOf = (list, value) => list.find((o) => o.value === value)?.label || value || '—';

function makeReference() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `S417-${ymd}-${randomBytes(2).toString('hex').toUpperCase()}`;
}

function summarize(values, files, reference) {
  const extra = fieldsForService(values.service);
  const rows = [
    ['Referans', reference],
    ['Müşteri tipi', labelOf(customerTypes, values.customerType)],
    ['Hizmet', labelOf(quoteServiceOptions, values.service)],
    ['Okul / firma', values.organization],
    extra.includes('scale') && ['Ölçek', values.scale],
    extra.includes('dimensions') && ['Boyut', values.dimensions],
    extra.includes('quantity') && ['Adet', values.quantity],
    ['İstenen teslim', values.deadline],
    ['Bütçe', values.budget ? labelOf(budgetOptions, values.budget) : ''],
    ['Ad', values.name],
    ['Tercih edilen iletişim', labelOf(contactMethods, values.contactMethod)],
    ['E-posta', values.email],
    ['Telefon', values.phone],
    ['Dosya linki', values.fileLink],
    ['Ekler', files.map((f) => `${f.name} (${(f.size / 1024).toFixed(0)} KB)`).join(', ')],
    ['Kaynak sayfa', values.sourcePath],
  ].filter((r) => r && r[1]);
  return rows;
}

async function sendEmail({ values, files, reference }) {
  const { RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !QUOTE_TO_EMAIL || !QUOTE_FROM_EMAIL) return null;

  const rows = summarize(values, files, reference);
  const html = `
    <h2 style="font-family:sans-serif">Yeni teklif talebi · ${esc(reference)}</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${esc(v)}</td></tr>`).join('')}
    </table>
    <h3 style="font-family:sans-serif">Proje açıklaması</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${esc(values.description)}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nProje açıklaması:\n${values.description}`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: QUOTE_FROM_EMAIL,
      to: QUOTE_TO_EMAIL.split(',').map((s) => s.trim()),
      reply_to: values.email || undefined,
      subject: `Teklif talebi ${reference} · ${labelOf(quoteServiceOptions, values.service)}`,
      html,
      text,
      attachments: files.map((f) => ({ filename: f.name, content: f.buffer.toString('base64') })),
    }),
  });
  if (!res.ok) throw new Error(`email ${res.status}`);
  return 'email';
}

async function sendWebhook({ values, files, reference }) {
  const url = process.env.QUOTE_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.QUOTE_WEBHOOK_SECRET ? { 'X-Studio417-Secret': process.env.QUOTE_WEBHOOK_SECRET } : {}),
    },
    // Dosya içeriği webhook'a gönderilmez; yalnızca adlar.
    body: JSON.stringify({
      reference,
      receivedAt: new Date().toISOString(),
      ...values,
      files: files.map((f) => ({ name: f.name, size: f.size })),
    }),
  });
  if (!res.ok) throw new Error(`webhook ${res.status}`);
  return 'webhook';
}

// Yalnızca yerel geliştirme/test için: talepleri .quotes/ klasörüne yazar.
async function storeLocally({ values, files, reference }) {
  if (process.env.QUOTE_LOCAL_STORE !== '1' || process.env.VERCEL) return null;
  const dir = path.join(process.cwd(), '.quotes', reference);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'talep.json'), JSON.stringify({ reference, ...values, files: files.map((f) => f.name) }, null, 2));
  for (const f of files) await writeFile(path.join(dir, path.basename(f.name)), f.buffer);
  return 'local';
}

const json = (body, status = 200) => Response.json(body, { status });

export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'bad_request', message: 'Form verisi okunamadı.' }, 400);
  }

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'local';
  const submissionId = String(form.get('submissionId') || '').slice(0, 64);

  if (submissionId && recentSubmissions.has(submissionId)) {
    return json(recentSubmissions.get(submissionId));
  }

  // Bot tuzağı: gizli alan doluysa ya da form çok hızlı gönderildiyse sessizce reddet.
  const startedAt = Number(form.get('startedAt') || 0);
  if (form.get('website') || (startedAt && Date.now() - startedAt < 3000)) {
    return json({ ok: false, error: 'rejected', message: 'Gönderim doğrulanamadı. Lütfen tekrar deneyin.' }, 400);
  }

  if (rateLimited(ip)) {
    return json({ ok: false, error: 'rate_limited', message: 'Çok fazla deneme yapıldı. Birkaç dakika sonra tekrar deneyin.' }, 429);
  }

  const keys = ['customerType', 'service', 'description', 'scale', 'dimensions', 'quantity', 'deadline', 'budget', 'name', 'organization', 'contactMethod', 'email', 'phone', 'fileLink', 'privacy', 'sourcePath'];
  const values = {};
  for (const k of keys) values[k] = String(form.get(k) ?? '').trim().slice(0, 4000);
  values.phone = normalizePhone(values.phone);

  const rawFiles = form.getAll('files').filter((f) => f && typeof f === 'object' && 'arrayBuffer' in f && f.size > 0);
  const errors = validateQuote(values, rawFiles.map((f) => ({ name: f.name, size: f.size })));
  if (Object.keys(errors).length) {
    return json({ ok: false, error: 'validation', message: 'Lütfen işaretli alanları kontrol edin.', fields: errors }, 422);
  }

  const files = [];
  for (const f of rawFiles) {
    const buffer = Buffer.from(await f.arrayBuffer());
    const ext = fileExt(f.name);
    if (!signatureOk(ext, buffer)) {
      return json({ ok: false, error: 'validation', message: 'Dosya içeriği uzantısıyla uyuşmuyor.', fields: { files: `${f.name}: dosya içeriği .${ext} biçimiyle uyuşmuyor.` } }, 422);
    }
    const safeName = path.basename(f.name).replace(/[^\w.\-çğıöşüÇĞİÖŞÜ ]/g, '_').slice(0, 120);
    files.push({ name: safeName, size: f.size, buffer });
  }
  if (files.reduce((a, f) => a + f.size, 0) > UPLOAD.maxTotalBytes) {
    return json({ ok: false, error: 'validation', message: 'Dosyalar çok büyük.', fields: { files: 'Dosyaların toplam boyutu sınırı aşıyor.' } }, 413);
  }

  const reference = makeReference();
  const payload = { values, files, reference };
  const results = await Promise.allSettled([sendEmail(payload), sendWebhook(payload), storeLocally(payload)]);
  const delivered = results.filter((r) => r.status === 'fulfilled' && r.value).map((r) => r.value);
  const failed = results.filter((r) => r.status === 'rejected');
  failed.forEach((r) => console.error('[quote] teslim hatası', reference, r.reason?.message));

  if (delivered.length === 0) {
    const configured = failed.length > 0;
    console.error('[quote] talep iletilemedi', reference, configured ? 'tüm kanallar başarısız' : 'teslim kanalı yapılandırılmamış');
    return json(
      {
        ok: false,
        error: configured ? 'delivery_failed' : 'not_configured',
        message: 'Talebiniz şu anda iletilemedi. Lütfen WhatsApp veya e-posta ile ulaşın; bilgileriniz kaybolmasın diye formu kapatmadan önce kopyalayabilirsiniz.',
      },
      configured ? 502 : 503
    );
  }

  const response = { ok: true, reference, contactMethod: values.contactMethod, business: site.name };
  if (submissionId) {
    recentSubmissions.set(submissionId, response);
    setTimeout(() => recentSubmissions.delete(submissionId), 10 * 60 * 1000).unref?.();
  }
  return json(response);
}
