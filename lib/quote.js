// Teklif formu kuralları — istemci ve sunucu aynı doğrulamayı kullanır.
import { quoteServiceOptions } from '@/data/services';

export const UPLOAD = {
  maxFiles: 5,
  // Vercel sunucu fonksiyonları ~4,5 MB istek gövdesi kabul eder.
  // Daha büyük dosyalar için formda paylaşım linki alanı var.
  maxTotalBytes: 4 * 1024 * 1024,
  extensions: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'stl', 'obj', '3mf', 'dwg', 'dxf', 'skp', '3dm', 'step', 'stp', 'zip'],
};

export const customerTypes = [
  { value: 'ogrenci', label: 'Öğrenciyim' },
  { value: 'profesyonel', label: 'Ofis / firma adına' },
];

export const contactMethods = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telefon', label: 'Telefon' },
  { value: 'eposta', label: 'E-posta' },
];

export const budgetOptions = [
  { value: '', label: 'Belirtmek istemiyorum' },
  { value: '0-2500', label: '2.500 ₺ altı' },
  { value: '2500-7500', label: '2.500 – 7.500 ₺' },
  { value: '7500-20000', label: '7.500 – 20.000 ₺' },
  { value: '20000+', label: '20.000 ₺ üzeri' },
];

// Hizmete göre gösterilecek ek alanlar
const conditional = {
  'mimari-maket': ['scale', 'dimensions', 'quantity'],
  '3d-baski': ['dimensions', 'quantity'],
  'mimari-gorsellestirme': ['quantity'],
  '3d-modelleme': ['scale'],
  'teknik-destek': [],
  'ofislere-ozel-uretim': ['scale', 'dimensions', 'quantity'],
  diger: [],
};

export function fieldsForService(service) {
  return conditional[service] || [];
}

export function quantityLabel(service) {
  return service === 'mimari-gorsellestirme' ? 'Görsel sayısı' : 'Adet';
}

export const fileExt = (name = '') => name.toLowerCase().split('.').pop();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizePhone(v = '') {
  return v.replace(/[^\d+]/g, '');
}

// values: düz nesne (string alanlar). files: [{ name, size }]
export function validateQuote(values, files = []) {
  const e = {};
  const v = (k) => (typeof values[k] === 'string' ? values[k].trim() : '');

  if (!customerTypes.some((c) => c.value === v('customerType'))) e.customerType = 'Lütfen müşteri tipini seçin.';
  if (!quoteServiceOptions.some((s) => s.value === v('service'))) e.service = 'Lütfen bir hizmet seçin.';

  const desc = v('description');
  if (desc.length < 20) e.description = 'Projenizi en az birkaç cümleyle anlatın (en az 20 karakter).';
  else if (desc.length > 3000) e.description = 'Açıklama en fazla 3000 karakter olabilir.';

  const extra = fieldsForService(v('service'));
  if (extra.includes('scale') && v('scale').length > 60) e.scale = 'Ölçek en fazla 60 karakter olabilir.';
  if (extra.includes('dimensions') && v('dimensions').length > 120) e.dimensions = 'Boyut bilgisi en fazla 120 karakter olabilir.';
  if (extra.includes('quantity') && v('quantity')) {
    const q = Number(v('quantity'));
    if (!Number.isInteger(q) || q < 1 || q > 1000) e.quantity = '1 ile 1000 arasında bir sayı girin.';
  }

  if (v('deadline')) {
    const d = new Date(`${v('deadline')}T23:59:59`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(d.getTime())) e.deadline = 'Geçerli bir tarih girin.';
    else if (d < today) e.deadline = 'Teslim tarihi geçmişte olamaz.';
  }

  if (v('budget') && !budgetOptions.some((b) => b.value === v('budget'))) e.budget = 'Geçersiz bütçe seçimi.';

  const name = v('name');
  if (name.length < 2) e.name = 'Adınızı yazın.';
  else if (name.length > 80) e.name = 'Ad en fazla 80 karakter olabilir.';

  if (v('organization').length > 120) e.organization = 'En fazla 120 karakter.';

  const method = v('contactMethod');
  if (!contactMethods.some((c) => c.value === method)) e.contactMethod = 'Size nasıl ulaşalım?';

  const email = v('email');
  const phone = normalizePhone(v('phone'));
  if (method === 'eposta' && !email) e.email = 'E-posta adresinizi yazın.';
  if (email && !EMAIL_RE.test(email)) e.email = 'Geçerli bir e-posta adresi yazın.';
  if ((method === 'whatsapp' || method === 'telefon') && !phone) e.phone = 'Telefon numaranızı yazın.';
  if (phone && (phone.replace(/\D/g, '').length < 10 || phone.replace(/\D/g, '').length > 15))
    e.phone = 'Geçerli bir telefon numarası yazın (ör. 05xx xxx xx xx).';

  const link = v('fileLink');
  if (link) {
    try {
      const u = new URL(link);
      if (!/^https?:$/.test(u.protocol)) throw new Error();
    } catch {
      e.fileLink = 'Geçerli bir link yazın (https:// ile başlamalı).';
    }
  }

  if (values.privacy !== 'on' && values.privacy !== true && values.privacy !== 'true')
    e.privacy = 'Devam etmek için aydınlatma metnini okuduğunuzu onaylayın.';

  const fileError = validateFiles(files);
  if (fileError) e.files = fileError;

  return e;
}

export function validateFiles(files) {
  if (files.length > UPLOAD.maxFiles) return `En fazla ${UPLOAD.maxFiles} dosya ekleyebilirsiniz.`;
  for (const f of files) {
    if (!UPLOAD.extensions.includes(fileExt(f.name))) return `${f.name}: bu dosya türü kabul edilmiyor.`;
    if (f.size === 0) return `${f.name}: dosya boş.`;
  }
  const total = files.reduce((a, f) => a + f.size, 0);
  if (total > UPLOAD.maxTotalBytes)
    return `Dosyaların toplam boyutu ${(UPLOAD.maxTotalBytes / 1024 / 1024).toFixed(0)} MB'ı aşıyor. Büyük dosyalar için paylaşım linki ekleyin.`;
  return null;
}
