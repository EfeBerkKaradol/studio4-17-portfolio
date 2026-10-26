'use client';

import { track } from '@/lib/analytics';
import { whatsappHref } from '@/lib/whatsapp';
import { site, phoneHref } from '@/lib/site';

// WhatsApp numarası yapılandırılmamışsa hiçbir şey göstermez.
export function WhatsAppLink({ message, location, service, className = 'btn btn-whatsapp', children, fallback = null }) {
  const href = whatsappHref(message);
  if (!href) return fallback;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track('whatsapp_click', { location, service }, { dedupeMs: 2000 })}
    >
      <WhatsAppIcon />
      {children || 'WhatsApp’tan yazın'}
      <span className="visually-hidden"> (yeni sekmede açılır)</span>
    </a>
  );
}

export function PhoneLink({ location, className, children }) {
  const href = phoneHref();
  if (!href) return null;
  return (
    <a href={href} className={className} onClick={() => track('phone_click', { location })}>
      {children || site.phone}
    </a>
  );
}

export function EmailLink({ location, className, children, subject }) {
  if (!site.email) return null;
  const href = `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
  return (
    <a href={href} className={className} onClick={() => track('email_click', { location })}>
      {children || site.email}
    </a>
  );
}

export function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 6.68 2.77 9.38 9.38 0 0 1 2.76 6.68c0 5.21-4.24 9.44-9.45 9.44zm8.04-17.48A11.3 11.3 0 0 0 12.04.7C5.77.7.67 5.8.67 12.07c0 2 .52 3.96 1.52 5.68L.57 23.65l6.04-1.58a11.33 11.33 0 0 0 5.43 1.38h.01c6.26 0 11.36-5.1 11.37-11.37a11.3 11.3 0 0 0-3.34-8.06z" />
    </svg>
  );
}
