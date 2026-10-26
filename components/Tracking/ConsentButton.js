'use client';

import { trackingConfigured, OPEN_CONSENT_EVENT } from '@/lib/analytics';

export default function ConsentButton({ className }) {
  if (!trackingConfigured) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Çerez tercihleri
    </button>
  );
}
