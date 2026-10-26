'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import {
  analyticsConfig,
  trackingConfigured,
  getConsent,
  setConsent,
  CONSENT_EVENT,
  OPEN_CONSENT_EVENT,
} from '@/lib/analytics';
import styles from './Tracking.module.css';

// Çerez onayı + GA4 / Google Ads / Meta Pixel yükleyici.
// Hiçbir izleme kimliği tanımlı değilse banner da gösterilmez (zorunlu olmayan çerez yok).
function subscribe(callback) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export default function Tracking() {
  // Sunucuda 'unknown' döner; böylece banner yalnızca tarayıcıda gösterilir.
  const consent = useSyncExternalStore(subscribe, getConsent, () => 'unknown');
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, onOpen);
  }, []);

  // Onay geri çekilirse Google tarafına da bildir.
  useEffect(() => {
    if (consent === 'denied' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  }, [consent]);

  if (!trackingConfigured || consent === 'unknown') return null;

  const { gaId, adsId, metaPixelId } = analyticsConfig;
  const googleId = gaId || adsId;
  const granted = consent === 'granted';
  const showBanner = consent === null || reopened;

  const choose = (value) => {
    setConsent(value);
    setReopened(false);
  };

  return (
    <>
      {granted && googleId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{ad_storage:'granted',analytics_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});
gtag('js',new Date());
${gaId ? `gtag('config','${gaId}',{anonymize_ip:true});` : ''}
${adsId ? `gtag('config','${adsId}');` : ''}`}
          </Script>
        </>
      )}
      {granted && metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
      )}

      {showBanner && (
        <div className={styles.banner} role="dialog" aria-live="polite" aria-label="Çerez tercihleri">
          <p>
            Siteyi geliştirmek ve reklamlarımızın etkisini ölçmek için, onay verirseniz analiz ve reklam çerezleri
            (Google Analytics, Google Ads, Meta) kullanırız. Reddederseniz site aynı şekilde çalışır.{' '}
            <Link href="/cerez-politikasi" className="text-link">
              Çerez politikası
            </Link>
          </p>
          <div className={styles.actions}>
            <button type="button" className="btn btn-outline" onClick={() => choose('denied')}>
              Reddet
            </button>
            <button type="button" className="btn btn-primary" onClick={() => choose('granted')}>
              Kabul et
            </button>
          </div>
        </div>
      )}
    </>
  );
}
