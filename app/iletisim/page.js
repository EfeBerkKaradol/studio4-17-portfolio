import Link from 'next/link';
import { PageIntro } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { WhatsAppLink, EmailLink, PhoneLink } from '@/components/Contact/ContactLinks';
import { site, socialLinks } from '@/lib/site';
import { pageMeta } from '@/lib/seo';
import styles from '../content.module.css';

export const metadata = pageMeta({
  title: 'İletişim | Studio 4.17 İstanbul',
  description:
    "Studio 4.17 ile iletişime geçin: teklif formu, WhatsApp ve e-posta. İstanbul'da mimari maket, 3D baskı ve görselleştirme hizmetleri.",
  path: '/iletisim',
});

export default function ContactPage() {
  const hasDirect = site.whatsappNumber || site.email || site.phone;
  return (
    <>
      <PageIntro
        eyebrow="İletişim"
        title="Bize ulaşın"
        lead="Fiyat ve teslim tarihi gerektiren işler için en hızlı yol teklif formudur: tüm bilgiler ve dosyalar tek seferde bize ulaşır. Kısa sorular için doğrudan yazabilirsiniz."
      >
        <Breadcrumbs items={[{ label: 'İletişim', href: '/iletisim' }]} />
      </PageIntro>
      <section className="section-tight">
        <div className={`container ${styles.split}`}>
          <div className={styles.stack}>
            <div className={styles.card}>
              <h2>Teklif formu</h2>
              <p>Proje bilgilerinizi, dosyalarınızı ve teslim tarihinizi gönderin. Yazılı teklifle dönüş yapılır.</p>
              <Link href="/teklif-al" className="btn btn-accent">
                Teklif formuna git
              </Link>
            </div>
            {hasDirect && (
              <div className={styles.card}>
                <h2>Doğrudan iletişim</h2>
                <ul className={styles.contactList}>
                  {site.whatsappNumber && (
                    <li>
                      <span>WhatsApp</span>
                      <WhatsAppLink
                        location="contact_page"
                        message="Merhaba, Studio 4.17 hakkında bilgi almak istiyorum."
                        className="text-link"
                      >
                        Mesaj gönder
                      </WhatsAppLink>
                    </li>
                  )}
                  {site.email && (
                    <li>
                      <span>E-posta</span>
                      <EmailLink location="contact_page" />
                    </li>
                  )}
                  {site.phone && (
                    <li>
                      <span>Telefon</span>
                      <PhoneLink location="contact_page" />
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <aside className={styles.aside}>
            <div className={styles.card}>
              <h2>Konum ve teslim</h2>
              <p>
                {site.city} merkezli çalışıyoruz. Teslim; elden teslim veya gönderim olarak teklif aşamasında belirlenir.
                Ziyaret ve teslim noktası için önceden iletişime geçin.
              </p>
              <p className="muted small">Hizmet bölgesi: {site.serviceArea}</p>
            </div>
            {socialLinks.length > 0 && (
              <div className={styles.card}>
                <h2>Sosyal medya</h2>
                <ul>
                  {socialLinks.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-link">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
