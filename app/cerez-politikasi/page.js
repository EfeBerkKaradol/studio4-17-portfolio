import { PageIntro } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import ConsentButton from '@/components/Tracking/ConsentButton';
import { legal } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Çerez Politikası | Studio 4.17',
  description: 'Studio 4.17 web sitesinde kullanılan çerezler ve benzeri teknolojiler, onay ve tercih yönetimi.',
  path: '/cerez-politikasi',
});

export default function CookiePage() {
  return (
    <>
      <PageIntro eyebrow="Yasal" title="Çerez Politikası">
        <Breadcrumbs items={[{ label: 'Çerez Politikası', href: '/cerez-politikasi' }]} />
      </PageIntro>
      <section className="section-tight">
        <div className="container">
          <div className="prose">
            <p className="muted">Son güncelleme: {legal.lastUpdated}</p>
            <h2>Zorunlu teknolojiler</h2>
            <p>
              Çerez tercihinizi hatırlamak için tarayıcınızın yerel depolamasına tek bir kayıt (<code>s417_consent_v1</code>)
              yazılır. Sitenin çalışması için başka bir çerez kullanılmaz.
            </p>
            <h2>Analiz ve reklam çerezleri (yalnızca onayınızla)</h2>
            <p>Onay verirseniz, yapılandırılmış olmaları hâlinde aşağıdaki araçlar yüklenir:</p>
            <ul>
              <li>Google Analytics 4 — site kullanımını anlamak için.</li>
              <li>Google Ads dönüşüm ölçümü — reklamlardan gelen teklif taleplerini ölçmek için.</li>
              <li>Meta Pixel — Instagram/Facebook reklamlarının etkisini ölçmek için.</li>
            </ul>
            <p>
              Bu araçlara ad, telefon, e-posta, mesaj içeriği veya dosya gönderilmez; yalnızca “teklif formu gönderildi”,
              “WhatsApp butonuna tıklandı” gibi olaylar ve ilgili hizmet bilgisi iletilir. Onay vermezseniz bu araçlar hiç
              yüklenmez ve site aynı şekilde çalışır.
            </p>
            <h2>Tercihinizi değiştirme</h2>
            <p>
              Tercihinizi istediğiniz zaman değiştirebilirsiniz: <ConsentButton className="text-link" />. Tarayıcınızın
              ayarlarından çerezleri ve site verilerini de silebilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
