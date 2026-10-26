import Link from 'next/link';
import { PageIntro } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { EmailLink } from '@/components/Contact/ContactLinks';
import { site } from '@/lib/site';
import { legal } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'KVKK Aydınlatma Metni ve Gizlilik | Studio 4.17',
  description: 'Studio 4.17 web sitesi ve teklif formu üzerinden toplanan kişisel verilerin işlenmesine ilişkin aydınlatma metni.',
  path: '/gizlilik',
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Yasal" title="KVKK Aydınlatma Metni ve Gizlilik">
        <Breadcrumbs items={[{ label: 'KVKK ve Gizlilik', href: '/gizlilik' }]} />
      </PageIntro>
      <section className="section-tight">
        <div className="container">
          <div className="prose">
            <p className="muted">Son güncelleme: {legal.lastUpdated}</p>

            <h2>1. Veri sorumlusu</h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında veri sorumlusu{' '}
              {legal.controllerName ? <strong>{legal.controllerName}</strong> : <strong>{site.name}</strong>}
              {legal.controllerAddress ? ` (${legal.controllerAddress})` : ''}’dur.
              {site.email && (
                <>
                  {' '}
                  İletişim: <EmailLink location="privacy_page" />
                </>
              )}
            </p>

            <h2>2. Hangi verileri işliyoruz?</h2>
            <ul>
              <li>Kimlik ve iletişim bilgileri: ad, telefon numarası, e-posta adresi, okul veya firma adı (isteğe bağlı).</li>
              <li>Talep bilgileri: proje açıklaması, ölçek, boyut, adet, teslim tarihi, bütçe aralığı.</li>
              <li>Gönderdiğiniz dosyalar: çizim, model ve referans görseller.</li>
              <li>
                Çerez onayı verirseniz: site kullanımına ilişkin analiz ve reklam ölçüm verileri (ayrıntılar{' '}
                <Link href="/cerez-politikasi">Çerez Politikası</Link>’nda).
              </li>
            </ul>
            <p>
              3D baskı fiyat tahmini aracına yüklediğiniz dosyalar yalnızca tarayıcınızda işlenir; siz teklif formuyla
              göndermedikçe sunucularımıza iletilmez.
            </p>

            <h2>3. Hangi amaçlarla ve hangi hukuki sebeple?</h2>
            <ul>
              <li>Teklif talebinizi değerlendirmek, size dönüş yapmak ve teklif hazırlamak — bir sözleşmenin kurulmasıyla doğrudan ilgili olması (KVKK m.5/2-c).</li>
              <li>Onaylanan işi üretmek ve teslim etmek — sözleşmenin ifası (m.5/2-c).</li>
              <li>Fatura ve muhasebe yükümlülükleri — hukuki yükümlülük (m.5/2-ç).</li>
              <li>Analiz ve reklam ölçümü — yalnızca çerez onayınıza dayanarak (açık rıza, m.5/1).</li>
            </ul>

            <h2>4. Verileri kimlere aktarıyoruz?</h2>
            <p>
              Teklif talepleri, işletmeye iletilebilmesi için e-posta altyapı sağlayıcısı ve barındırma hizmeti (ör. Vercel,
              Resend) üzerinden iletilir. Bu sağlayıcıların sunucuları yurt dışında bulunabilir. Çerez onayı verirseniz
              Google ve Meta’ya analiz/ölçüm verisi aktarılır. Verileriniz bunların dışında satılmaz veya üçüncü kişilerle
              paylaşılmaz; yasal zorunluluk hâlleri saklıdır.
            </p>

            <h2>5. Ne kadar süre saklıyoruz?</h2>
            <p>
              Sonuçlanmayan teklif talepleri ve dosyaları en geç {legal.quoteRetentionMonths} ay içinde silinir. Onaylanan
              işlere ait bilgiler, yasal saklama süreleri boyunca muhafaza edilir. Dosyalarınız izniniz olmadan portfolyoda
              veya sosyal medyada yayınlanmaz.
            </p>

            <h2>6. Haklarınız</h2>
            <p>
              KVKK’nın 11. maddesi uyarınca verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya
              silinmesini isteme, itiraz etme ve zararın giderilmesini talep etme haklarına sahipsiniz. Talepleriniz için
              {site.email ? ' yukarıdaki e-posta adresinden' : ' iletişim kanallarımızdan'} bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
