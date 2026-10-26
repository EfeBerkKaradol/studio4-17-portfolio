import Link from 'next/link';
import { PageIntro, ServiceGrid, Faq, CtaBand, CheckList, ProcessSteps } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { getService } from '@/data/services';
import { pageMeta } from '@/lib/seo';
import styles from '../content.module.css';

export const metadata = pageMeta({
  title: 'Mimarlık Ofisleri için Maket ve Prototip Üretimi | Studio 4.17',
  description:
    "İstanbul'daki mimarlık, iç mimarlık ve tasarım ofisleri için sunum maketi, prototip, görselleştirme ve düzenli üretim desteği. Yazılı kapsam ve teslim takvimiyle çalışırız.",
  path: '/ofisler',
});

const proServices = ['ofislere-ozel-uretim', 'mimari-maket', '3d-baski', 'mimari-gorsellestirme'].map(getService).filter(Boolean);

const faq = [
  {
    q: 'Düzenli çalışmak için nasıl bir düzen kuruyorsunuz?',
    a: 'İlk işte iletişim kişisi, dosya formatı, onay süreci ve teslim takvimini birlikte belirleriz. Sonraki işler aynı düzenle ilerler.',
  },
  {
    q: 'Fatura ve ödeme koşulları nasıl?',
    a: 'Fatura, ödeme planı ve varsa ön ödeme koşulları her teklifte yazılı olarak belirtilir.',
  },
  {
    q: 'Proje dosyalarımızın gizliliği nasıl korunuyor?',
    a: 'Dosyalar yalnızca teklif ve üretim için kullanılır; yazılı izniniz olmadan portfolyoda veya sosyal medyada paylaşılmaz. Gerekirse gizlilik sözleşmesi konuşulur.',
  },
];

export default function OfficesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Ofisler için"
        title="Sunum maketleri ve prototipler için üretim ortağı"
        lead="Mimarlık, iç mimarlık ve tasarım ofisleri ile emlak sunum ekipleri için yazılı kapsam, net teslim tarihi ve tutarlı kaliteyle çalışırız."
      >
        <Breadcrumbs items={[{ label: 'Ofisler', href: '/ofisler' }]} />
      </PageIntro>

      <section className="section-tight">
        <div className="container">
          <div className={styles.blocks}>
            <div>
              <h3>Yazılı kapsam</h3>
              <p>Ölçek, detay seviyesi, malzeme, teslim ve revizyon koşulları üretimden önce yazılı olarak netleşir.</p>
            </div>
            <div>
              <h3>Takvime göre planlama</h3>
              <p>Sunum veya yarışma tarihinizden geriye doğru plan yaparız; ara kontrol noktalarını önceden belirleriz.</p>
            </div>
            <div>
              <h3>Gizlilik</h3>
              <p>Dosyalarınız izniniz olmadan hiçbir yerde paylaşılmaz; portfolyo kullanımı için ayrıca izin isteriz.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight section-alt" aria-labelledby="ofis-hizmet">
        <div className="container">
          <h2 id="ofis-hizmet" className={styles.sectionTitle}>
            Ofislere sunduğumuz hizmetler
          </h2>
          <ServiceGrid services={proServices} />
        </div>
      </section>

      <section className="section-tight">
        <div className={`container ${styles.split}`}>
          <div>
            <h2 className={styles.sectionTitle}>Ofislerle çalışma süreci</h2>
            <ProcessSteps
              steps={[
                'Proje dosyaları ve sunum tarihi paylaşılır.',
                'Fizibilite değerlendirmesi ve yazılı teklif hazırlanır.',
                'Kapsam, fiyat ve teslim koşulları onaylanır.',
                'Üretim ve kalite kontrol; ara fotoğraf paylaşımı.',
                'Teslim veya kurulum.',
              ]}
            />
          </div>
          <aside className={styles.card}>
            <h2>İlk görüşme için</h2>
            <CheckList items={['Proje dosyaları ve hedef ölçek', 'Sunum / teslim tarihi', 'Adet ve tekrar ihtiyacı', 'Gizlilik gereksinimleri']} />
            <Link href="/teklif-al?musteri=profesyonel&hizmet=ofislere-ozel-uretim" className="btn btn-accent btn-block">
              Ofis olarak teklif al
            </Link>
          </aside>
        </div>
      </section>

      <section className="section-tight section-alt" aria-labelledby="ofis-sss">
        <div className="container narrow">
          <h2 id="ofis-sss" className={styles.sectionTitle}>
            Sık sorulan sorular
          </h2>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand
        title="Yaklaşan bir sunumunuz mu var?"
        quoteHref="/teklif-al?musteri=profesyonel&hizmet=ofislere-ozel-uretim"
        waMessage="Merhaba, ofisimiz için maket/üretim desteği hakkında görüşmek istiyoruz."
        location="offices_page"
      />
    </>
  );
}
