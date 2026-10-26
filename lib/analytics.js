// Olay katmanı (yalnızca istemci bileşenlerinden çağrılır). Bütün izleme buradan geçer:
//  - Kişisel veri (ad, e-posta, telefon, mesaj, dosya içeriği) asla gönderilmez.
//  - Harici araçlara (GA4, Google Ads, Meta) yalnızca çerez onayı verildiyse gider.
//  - Aynı olay kısa süre içinde tekrar gelirse yok sayılır.

export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID || null, // G-XXXXXXX
  adsId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || null, // AW-XXXXXXX
  adsLabelQuote: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_QUOTE || null,
  adsLabelWhatsapp: process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL_WHATSAPP || null,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || null,
};

export const trackingConfigured = Boolean(
  analyticsConfig.gaId || analyticsConfig.adsId || analyticsConfig.metaPixelId
);

const CONSENT_KEY = 's417_consent_v1';
export const CONSENT_EVENT = 's417:consent';
export const OPEN_CONSENT_EVENT = 's417:open-consent';

export function getConsent() {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* depolama kapalı olabilir */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

const BLOCKED_KEYS = /mail|phone|tel|name|ad_soyad|message|mesaj|description|aciklama|file_?content/i;
const recent = new Map();

function sanitize(params) {
  const out = {};
  for (const [k, v] of Object.entries(params || {})) {
    if (BLOCKED_KEYS.test(k)) continue;
    if (v === undefined || v === null || v === '') continue;
    out[k] = typeof v === 'string' ? v.slice(0, 100) : v;
  }
  return out;
}

export function track(event, params = {}, { dedupeKey, dedupeMs = 1500 } = {}) {
  if (typeof window === 'undefined') return;
  const key = dedupeKey || `${event}:${JSON.stringify(params)}`;
  const now = Date.now();
  if (recent.has(key) && now - recent.get(key) < dedupeMs) return;
  recent.set(key, now);

  const data = sanitize(params);
  window.__s417Events = window.__s417Events || [];
  window.__s417Events.push({ event, ...data, t: now });
  if (process.env.NODE_ENV !== 'production') console.info('[analytics]', event, data);

  if (getConsent() !== 'granted') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, data);
    const { adsId, adsLabelQuote, adsLabelWhatsapp } = analyticsConfig;
    if (adsId && event === 'quote_form_submit_success' && adsLabelQuote) {
      window.gtag('event', 'conversion', {
        send_to: `${adsId}/${adsLabelQuote}`,
        transaction_id: data.reference,
      });
    }
    if (adsId && event === 'whatsapp_click' && adsLabelWhatsapp) {
      window.gtag('event', 'conversion', { send_to: `${adsId}/${adsLabelWhatsapp}` });
    }
  }

  if (typeof window.fbq === 'function') {
    if (event === 'quote_form_submit_success') {
      window.fbq('track', 'Lead', { content_category: data.service }, { eventID: data.reference });
    } else if (event === 'whatsapp_click' || event === 'phone_click' || event === 'email_click') {
      window.fbq('track', 'Contact', { content_category: event });
    }
  }
}
