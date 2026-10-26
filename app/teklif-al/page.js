import Link from 'next/link';
import { PageIntro } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import QuoteForm from '@/components/QuoteForm/QuoteForm';
import { WhatsAppLink, EmailLink } from '@/components/Contact/ContactLinks';
import { quoteServiceOptions, getService } from '@/data/services';
import { customerTypes } from '@/lib/quote';
import { site } from '@/lib/site';
import { pageMeta } from '@/lib/seo';
import styles from '../content.module.css';

export const metadata = pageMeta({
  title: 'Teklif Al | Mimari Maket ve 3D Baskı | Studio 4.17',
  description:
    'Mimari maket, 3D baskı, görselleştirme veya teknik destek için proje bilgilerinizi ve dosyalarınızı gönderin; uygulanabilirliği değerlendirip yazılı teklif hazırlayalım.',
  path: '/teklif-al',
});

export default async function QuotePage({ searchParams }) {
  const sp = await searchParams;
  const service = quoteServiceOptions.some((s) => s.value === sp?.hizmet) ? sp.hizmet : '';
  const customerType = customerTypes.some((c) => c.value === sp?.musteri) ? sp.musteri : '';
  const svc = getService(service);

  return (
    <>
      <PageIntro
        eyebrow="Teklif al"
        title={svc ? `${svc.title} için teklif` : 'Projenizi anlatın, teklif hazırlayalım'}
        lead="Bilgileri ve varsa dosyalarınızı gönderin. İşin uygulanabilirliğini değerlendirip kapsam, fiyat ve teslim tarihini yazılı olarak iletiriz."
      >
        <Breadcrumbs items={[{ label: 'Teklif Al', href: '/teklif-al' }]} />
      </PageIntro>
      <section className="section-tight">
        <div className={`container ${styles.split}`}>
          <QuoteForm key={`${service}-${customerType}`} defaultService={service} defaultCustomerType={customerType} location="quote_page" />
          <aside className={styles.aside}>
            <div className={styles.card}>
              <h2>Hazırlamanız gerekenler</h2>
              <ul className="prose" style={{ listStyle: 'disc', paddingLeft: '1.1rem' }}>
                <li>Çizim veya model dosyaları (PDF, DWG, 3DM, SKP, STL…)</li>
                <li>İstenen ölçek ve yaklaşık boyut</li>
                <li>Adet ve teslim tarihi</li>
                <li>Varsa malzeme/renk tercihi ve referans görseller</li>
              </ul>
              <p className="muted small">Emin olmadığınız bilgileri boş bırakabilirsiniz; gerekirse biz sorarız.</p>
            </div>
            <div className={styles.card}>
              <h2>Teklif nasıl işler?</h2>
              <p>Teklif talebi ücretsizdir ve sizi bağlamaz. Üretim, yazılı teklifi onaylamanızla başlar.</p>
              <Link href="/surec" className="text-link">
                Süreç ve koşullar
              </Link>
            </div>
            {(site.whatsappNumber || site.email) && (
              <div className={styles.card}>
                <h2>Form yerine yazmak isterseniz</h2>
                <div className="btn-row">
                  <WhatsAppLink
                    message={svc ? svc.waMessage : 'Merhaba, teklif almak istiyorum.'}
                    location="quote_page_aside"
                    service={service}
                  />
                  <EmailLink location="quote_page_aside" className="btn btn-outline" subject="Teklif talebi">
                    E-posta
                  </EmailLink>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
