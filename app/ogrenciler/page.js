import Link from 'next/link';
import { PageIntro, ServiceGrid, Faq, CtaBand, CheckList } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { getService } from '@/data/services';
import { pageMeta } from '@/lib/seo';
import styles from '../content.module.css';

export const metadata = pageMeta({
  title: 'Mimarlık Öğrencileri için Maket ve 3D Baskı | Studio 4.17 İstanbul',
  description:
    "İstanbul'daki mimarlık ve iç mimarlık öğrencileri için jüri maketi, 3D baskı, render ve teknik destek. Teslim tarihinizi ve dosyalarınızı gönderin, yazılı teklif alın.",
  path: '/ogrenciler',
});

const studentServices = ['mimari-maket', '3d-baski', 'mimari-gorsellestirme', 'teknik-destek'].map(getService).filter(Boolean);

const faq = [
  {
    q: 'Jüriye kaç gün kala yazmalıyım?',
    a: 'Mümkün olduğunca erken. Teslim süresi ölçek, detay ve o haftaki yoğunluğa göre değişir; dosyalarınızı gönderdiğinizde yetişip yetişemeyeceğini açıkça söyleriz. Jüri haftalarında yoğunluk arttığı için erken planlama fiyatı ve riski düşürür.',
  },
  {
    q: 'Tasarımımı sizin yapmanızı isteyebilir miyim?',
    a: 'Hayır. Tasarım ve fikir size aittir. Biz sizin tasarımınızı fiziksel olarak üretir, dosyalarınızı üretime hazırlar ve teknik konularda destek veririz.',
  },
  {
    q: 'Maketin bir kısmını kendim yapsam, kalanını siz yapsanız olur mu?',
    a: 'Evet. Örneğin yalnızca 3D baskı parçaları, topoğrafya katmanları veya tekrar eden cephe elemanları için teklif alabilirsiniz.',
  },
  {
    q: 'Öğrenci fiyatı var mı?',
    a: 'Fiyat; ölçek, malzeme, detay ve süreye göre belirlenir. Bütçenizi formda belirtirseniz kapsamı ona göre önerebiliriz (ör. daha sade malzeme, daha az detay).',
  },
];

export default function StudentsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Öğrenciler için"
        title="Jüri ve teslim haftaları için maket, 3D baskı ve teknik destek"
        lead="İstanbul’da mimarlık ve iç mimarlık okuyan öğrenciler için: tasarım sizin, üretimi ve teknik hazırlığı birlikte planlayalım."
      >
        <Breadcrumbs items={[{ label: 'Öğrenciler', href: '/ogrenciler' }]} />
      </PageIntro>

      <section className="section-tight">
        <div className="container">
          <div className={styles.blocks}>
            <div>
              <h3>Erken yazın, rahat edin</h3>
              <p>Jüri tarihini ilk mesajda paylaşın. Gerçekçi bir takvim kurar, yetişmeyecek bir işi kabul etmeyiz.</p>
            </div>
            <div>
              <h3>Dosyanızı hazırlayın</h3>
              <p>Plan, kesit, görünüş ya da 3D model yeterli. Modeliniz baskıya uygun değilse ne düzeltilmesi gerektiğini söyleriz.</p>
            </div>
            <div>
              <h3>Bütçenize göre kapsam</h3>
              <p>Bütçenizi belirtirseniz malzeme ve detay seviyesini ona göre öneririz; sürpriz maliyet çıkmaz.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight section-alt" aria-labelledby="ogrenci-hizmet">
        <div className="container">
          <h2 id="ogrenci-hizmet" className={styles.sectionTitle}>
            Öğrencilerin en çok istediği hizmetler
          </h2>
          <ServiceGrid services={studentServices} />
        </div>
      </section>

      <section className="section-tight">
        <div className={`container ${styles.split}`}>
          <div>
            <h2 className={styles.sectionTitle}>Akademik dürüstlük</h2>
            <p style={{ marginBottom: '1rem' }}>
              Akademik projelerde tasarım fikri, kararları ve teslim öğrenciye aittir. Bu nedenle sınırlarımız nettir:
            </p>
            <CheckList
              items={[
                'Sizin tasarımınızı ölçekli maket olarak üretiriz',
                'Modelinizi 3D baskıya ve maket üretimine hazırlarız',
                'Çizim düzeni, pafta yerleşimi ve yazılım kullanımında destek veririz',
              ]}
            />
            <CheckList
              variant="x"
              items={['Projenizi sizin yerinize tasarlamayız', 'Ödev veya jüri teslimini sizin adınıza yapmayız']}
            />
          </div>
          <aside className={styles.card}>
            <h2>Teklif için gerekenler</h2>
            <CheckList items={['Jüri / teslim tarihi', 'Çizim veya model dosyası', 'Ölçek ve taban ölçüsü', 'Varsa bütçe aralığı']} />
            <Link href="/teklif-al?musteri=ogrenci" className="btn btn-accent btn-block">
              Öğrenci olarak teklif al
            </Link>
          </aside>
        </div>
      </section>

      <section className="section-tight section-alt" aria-labelledby="ogrenci-sss">
        <div className="container narrow">
          <h2 id="ogrenci-sss" className={styles.sectionTitle}>
            Öğrencilerden gelen sorular
          </h2>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand
        title="Jüri tarihiniz belli mi?"
        text="Dosyalarınızı ve teslim tarihinizi gönderin; yetişip yetişmeyeceğini ve fiyatı yazılı olarak bildirelim."
        quoteHref="/teklif-al?musteri=ogrenci"
        waMessage="Merhaba, öğrenciyim. Jüri için maket/3D baskı konusunda teklif almak istiyorum."
        location="students_page"
      />
    </>
  );
}
