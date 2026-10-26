'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WhatsAppLink } from './ContactLinks';
import styles from './MobileActionBar.module.css';

// Mobilde ekranın altında sabit "Teklif Al" + WhatsApp çubuğu.
export default function MobileActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith('/teklif-al')) return null;
  return (
    <div className={styles.bar} role="region" aria-label="Hızlı iletişim">
      <Link href="/teklif-al" className={`btn btn-accent ${styles.item}`}>
        Teklif Al
      </Link>
      <WhatsAppLink
        message="Merhaba, Studio 4.17 hizmetleri hakkında bilgi almak istiyorum."
        location="mobile_bar"
        className={`btn btn-whatsapp ${styles.item}`}
      >
        WhatsApp
      </WhatsAppLink>
    </div>
  );
}
