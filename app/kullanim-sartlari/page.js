import Link from 'next/link';
import { PageIntro } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { legal } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Hizmet ve Kullanım Şartları | Studio 4.17',
  description: 'Studio 4.17 web sitesinin kullanımı, teklifler, fiyat tahminleri, fikri mülkiyet ve sorumluluk sınırlarına ilişkin şartlar.',
  path: '/kullanim-sartlari',
});

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Yasal" title="Hizmet ve Kullanım Şartları">
        <Breadcrumbs items={[{ label: 'Kullanım Şartları', href: '/kullanim-sartlari' }]} />
      </PageIntro>
      <section className="section-tight">
        <div className="container">
          <div className="prose">
            <p className="muted">Son güncelleme: {legal.lastUpdated}</p>

            <h2>Teklifler ve fiyat tahminleri</h2>
            <p>
              Sitedeki 3D baskı fiyat hesaplama aracı, model hacmine dayalı otomatik bir <strong>ön tahmin</strong> üretir;
              teklif veya sipariş değildir. Bağlayıcı fiyat, dosya incelendikten sonra yazılı olarak iletilen teklifte yer
              alır. Teklif formunun gönderilmesi bir sipariş oluşturmaz.
            </p>

            <h2>Sipariş, revizyon ve iptal</h2>
            <p>
              İş, yazılı teklifin onaylanmasıyla başlar. Revizyon, iptal, teslim ve ödeme koşulları her teklifte ayrıca
              belirtilir; genel ilkeler için <Link href="/surec">Süreç</Link> sayfasına bakabilirsiniz.
            </p>

            <h2>Gönderdiğiniz dosyalar</h2>
            <p>
              Bize gönderdiğiniz dosyaları kullanma ve üretme hakkına sahip olduğunuzu kabul edersiniz. Üçüncü kişilere ait
              telif haklarını ihlal eden işler üretilmez. Dosyalarınızın fikri mülkiyeti size aittir; yalnızca işinizi yapmak
              için kullanılır.
            </p>

            <h2>Akademik çalışmalar</h2>
            <p>
              Akademik projelerde tasarım ve teslim öğrenciye aittir. Studio 4.17, öğrencinin yerine tasarım yapmaz veya
              ödev teslim etmez; üretim ve teknik destek sağlar.
            </p>

            <h2>Sitedeki içerik</h2>
            <p>
              Portfolyoda “örnek içerik” olarak işaretlenen çalışmalar ve “temsili görsel” olarak belirtilen görseller
              Studio 4.17’nin tamamlanmış işleri değildir. Sitedeki metin ve özgün görseller izinsiz kopyalanamaz.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
