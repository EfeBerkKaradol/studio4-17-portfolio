import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.logo}>
            <span className="font-serif">STUDIO</span>4.17
          </Link>
          <p className={styles.brandDesc}>
            Mimari tasarım ve üretim süreçlerinde yaratıcı çözümler sunan bir portfolyo.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" aria-label="Behance" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 11h-4.3v-.6c0-.9.7-1.4 1.7-1.4h.4v-2h-.6c-2.3 0-3.6 1.4-3.6 3.6v.6c0 2.2 1.3 3.6 3.6 3.6h.6v-2h-.4c-.9 0-1.7-.5-1.7-1.4v-.4zm-8.8 3.8v-8h-3c-2.3 0-3.6 1.4-3.6 3.6v.6c0 2.2 1.3 3.6 3.6 3.6h3v-2h-1c-1 0-1.6-.5-1.6-1.5v-.2h4.6v3.9zm-4.6-5.8c0-1 .6-1.5 1.6-1.5h1v3.2h-1c-1 0-1.6-.5-1.6-1.5v-.2z"></path></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <h4 className={styles.footerTitle}>HIZLI LİNKLER</h4>
          <ul>
            <li><Link href="/">Ana Sayfa</Link></li>
            <li><Link href="#hizmetler">Uzmanlıklar</Link></li>
            <li><Link href="#projeler">Projeler</Link></li>
            <li><Link href="#surec">Süreç</Link></li>
            <li><Link href="#hakkimda">Hakkımda</Link></li>
          </ul>
        </div>

        <div className={styles.footerLinks}>
          <h4 className={styles.footerTitle}>HİZMETLER</h4>
          <ul>
            <li>3D Modelleme & Tasarım</li>
            <li>Mimari Render</li>
            <li>İç Mekan Tasarımı</li>
            <li>Kentsel Tasarım</li>
            <li>Mimari Maket</li>
          </ul>
        </div>

        <div className={styles.footerContact}>
          <h4 className={styles.footerTitle}>BİZE ULAŞIN</h4>
          <ul className={styles.contactList}>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              info@studio4-17.com
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              +90 555 123 45 67
            </li>
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              İstanbul, Türkiye
            </li>
          </ul>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomContainer}`}>
          <p>&copy; {currentYear} STUDIO4.17. Tüm hakları saklıdır.</p>
          <div className={styles.socialLinks}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer">Behance</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
          <div className={styles.legalLinks}>
            <Link href="/gizlilik">Gizlilik Politikası</Link>
            <span className={styles.separator}>|</span>
            <Link href="/kullanim-sartlari">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
