import Link from 'next/link';
import { PageIntro, ServiceGrid, CtaBand } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Hizmetler | Mimari Maket, 3D Baskı, Render | Studio 4.17',
  description:
    'Studio 4.17 hizmetleri: mimari maket üretimi, 3D baskı ve prototipleme, mimari görselleştirme, 3D modelleme, teknik destek ve ofislere özel üretim. İstanbul.',
  path: '/hizmetler',
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Hizmetler"
        title="Maketten render’a, öğrenciler ve ofisler için üretim"
        lead="Her hizmetin kendi sayfasında ne göndermeniz gerektiğini, neyin teslim edildiğini, neyin kapsam dışında olduğunu ve fiyatı neyin belirlediğini açıkça yazdık."
      >
        <Breadcrumbs items={[{ label: 'Hizmetler', href: '/hizmetler' }]} />
      </PageIntro>
      <section className="section-tight">
        <div className="container">
          <ServiceGrid headingLevel={2} />
          <p className="muted" style={{ marginTop: '2rem' }}>
            İhtiyacınız listede yok mu?{' '}
            <Link href="/teklif-al" className="text-link">
              Teklif formunda “Diğer” seçeneğiyle
            </Link>{' '}
            anlatın; yapabileceğimiz bir işse söyleriz, değilse de açıkça belirtiriz.
          </p>
        </div>
      </section>
      <CtaBand location="services_index" />
    </>
  );
}
