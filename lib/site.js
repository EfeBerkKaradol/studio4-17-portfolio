// Studio 4.17 — işletme bilgileri tek yerden yönetilir.
// Gerçek iletişim bilgileri ortam değişkenlerinden gelir; burada hiçbir numara
// veya adres uydurulmaz. Değer yoksa ilgili buton/link gösterilmez.

const clean = (v) => (typeof v === 'string' && v.trim() ? v.trim() : null);

export const site = {
  name: 'Studio 4.17',
  shortName: 'Studio4.17',
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) || 'https://studio4-17-portfolio.vercel.app').replace(/\/$/, ''),
  tagline: "İstanbul'da mimarlık öğrencileri ve tasarım ekipleri için mimari maket, 3D baskı ve dijital tasarım desteği.",
  city: 'İstanbul',
  country: 'Türkiye',
  serviceArea: 'İstanbul (kargo ile Türkiye geneli, teklif aşamasında teyit edilir)',
  locale: 'tr_TR',

  // Örn. 905xxxxxxxxx (ülke kodu ile, + ve boşluk olmadan)
  whatsappNumber: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/\D/g, '') || null,
  // Örn. +90 5xx xxx xx xx (görünen biçim)
  phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  instagram: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  behance: clean(process.env.NEXT_PUBLIC_BEHANCE_URL),
  linkedin: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL),
};

export const socialLinks = [
  { label: 'Instagram', href: site.instagram },
  { label: 'Behance', href: site.behance },
  { label: 'LinkedIn', href: site.linkedin },
].filter((s) => s.href);

export function phoneHref(phone = site.phone) {
  return phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : null;
}

export function absoluteUrl(path = '/') {
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

// Ana menü
export const mainNav = [
  { label: 'Ana Sayfa', href: '/' },
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Portfolyo', href: '/portfolyo' },
  { label: 'Süreç', href: '/surec' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'İletişim', href: '/iletisim' },
];
