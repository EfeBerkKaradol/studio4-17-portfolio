import { site } from './site';

// wa.me linki mobilde uygulamayı, masaüstünde WhatsApp Web'i açar.
export function whatsappHref(message = '') {
  if (!site.whatsappNumber) return null;
  const text = message.trim();
  return `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}

// Hizmet ve form bilgilerinden bağlamlı mesaj üretir.
export function buildWhatsAppMessage({ base, service, scale, dimensions, quantity, reference } = {}) {
  const lines = [base || 'Merhaba, Studio 4.17 hakkında bilgi almak istiyorum.'];
  if (service) lines.push(`Hizmet: ${service}`);
  if (scale) lines.push(`Ölçek: ${scale}`);
  if (dimensions) lines.push(`Boyut: ${dimensions}`);
  if (quantity) lines.push(`Adet: ${quantity}`);
  if (reference) lines.push(`Referans: ${reference}`);
  return lines.join('\n');
}
