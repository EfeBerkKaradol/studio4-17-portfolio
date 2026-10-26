import Link from 'next/link';
import { site, socialLinks, mainNav } from '@/lib/site';
import { activeServices } from '@/data/services';
import { WhatsAppLink, PhoneLink, EmailLink } from '@/components/Contact/ContactLinks';
import ConsentButton from '@/components/Tracking/ConsentButton';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <p className={styles.statement}>
          Fikirden makete, <em>projeden üretime.</em>
        </p>
      </div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="Studio 4.17 ana sayfa">
            Studio <span>4.17</span>
          </Link>
          <p>{site.tagline}</p>
          <p className={styles.area}>Hizmet bölgesi: {site.serviceArea}</p>
        </div>

        <nav aria-label="Hizmetler" className={styles.col}>
          <h2 className={styles.title}>Hizmetler</h2>
          <ul>
            {activeServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`}>{s.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/fiyat-hesaplama">3D baskı fiyat tahmini</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Site" className={styles.col}>
          <h2 className={styles.title}>Stüdyo</h2>
          <ul>
            {mainNav.slice(2).map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/ogrenciler">Öğrenciler için</Link>
            </li>
            <li>
              <Link href="/ofisler">Ofisler için</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.title}>İletişim</h2>
          <ul className={styles.contact}>
            <li>
              <Link href="/teklif-al" className="text-link">
                Teklif formu
              </Link>
            </li>
            {site.whatsappNumber && (
              <li>
                <WhatsAppLink location="footer" className={styles.inlineLink} message="Merhaba, Studio 4.17 hakkında bilgi almak istiyorum.">
                  WhatsApp
                </WhatsAppLink>
              </li>
            )}
            {site.email && (
              <li>
                <EmailLink location="footer" />
              </li>
            )}
            {site.phone && (
              <li>
                <PhoneLink location="footer" />
              </li>
            )}
            <li>{site.city}, {site.country}</li>
          </ul>
          {socialLinks.length > 0 && (
            <ul className={styles.social}>
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomRow}`}>
          <p>© {year} {site.name}</p>
          <ul className={styles.legal}>
            <li>
              <Link href="/gizlilik">KVKK ve Gizlilik</Link>
            </li>
            <li>
              <Link href="/cerez-politikasi">Çerez Politikası</Link>
            </li>
            <li>
              <Link href="/kullanim-sartlari">Hizmet ve Kullanım Şartları</Link>
            </li>
            <li>
              <ConsentButton className={styles.linkButton} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
