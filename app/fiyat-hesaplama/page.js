import Link from 'next/link';
import { PageIntro } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import Calculator from '@/components/Calculator/Calculator';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: '3D Baskı Fiyat Tahmini | STL, OBJ, 3MF | Studio 4.17',
  description:
    '3D model dosyanızı yükleyin, malzeme ve katman yüksekliğine göre hacme dayalı otomatik ön tahmin görün. Kesin fiyat için dosyanızı tek tıkla teklif talebine ekleyin.',
  path: '/fiyat-hesaplama',
});

export default function PricePage() {
  return (
    <>
      <PageIntro
        eyebrow="3D baskı"
        title="3D baskı fiyat tahmini"
        lead="Dosyanızı yükleyin, yaklaşık bir fiyat aralığı görün. Bu bir ön tahmindir; kesin fiyat dosya incelendikten sonra yazılı teklifle verilir."
      >
        <Breadcrumbs
          items={[
            { label: 'Hizmetler', href: '/hizmetler' },
            { label: '3D Baskı Fiyat Tahmini', href: '/fiyat-hesaplama' },
          ]}
        />
      </PageIntro>
      <section className="section-tight">
        <div className="container">
          <div className="notice" style={{ marginBottom: '2rem' }}>
            <strong>Üç aşama:</strong> 1) <em>Otomatik ön tahmin</em> — bu sayfa, yaklaşık aralık. 2) <em>Manuel teklif</em> —
            dosyanız incelenir. 3) <em>Onaylı üretim teklifi</em> — yazılı fiyat ve teslim tarihi. Mimari maketler için bu
            araç uygun değildir;{' '}
            <Link href="/teklif-al?hizmet=mimari-maket" className="text-link">
              maket teklifi isteyin
            </Link>
            .
          </div>
          <Calculator />
        </div>
      </section>
    </>
  );
}
