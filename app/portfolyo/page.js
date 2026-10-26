import { Suspense } from 'react';
import { PageIntro, CtaBand } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import PortfolioGrid from '@/components/Portfolio/PortfolioGrid';
import { projects, portfolioCategories } from '@/data/projects';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Portfolyo | Mimari Maket, 3D Baskı ve Render Çalışmaları | Studio 4.17',
  description:
    'Studio 4.17 portfolyosu: mimari maket, 3D baskı, görselleştirme ve modelleme çalışmaları. Her çalışmada türü (müşteri işi, akademik, örnek) açıkça belirtilir.',
  path: '/portfolyo',
});

export default function PortfolioPage() {
  // Yalnızca en az bir projesi olan kategoriler filtrede gösterilir
  const categories = portfolioCategories.filter((c) => projects.some((p) => p.categories.includes(c.id)));
  return (
    <>
      <PageIntro
        eyebrow="Portfolyo"
        title="Çalışmalar"
        lead="Her çalışmanın türünü açıkça belirtiyoruz: müşteri işi, akademik çalışma, kişisel çalışma veya örnek içerik."
      >
        <Breadcrumbs items={[{ label: 'Portfolyo', href: '/portfolyo' }]} />
      </PageIntro>
      <section className="section-tight">
        <div className="container">
          <p className="notice" style={{ marginBottom: '2rem' }}>
            <strong>Not:</strong> Bu sayfadaki çalışmalar şu an <strong>örnek içeriktir</strong> ve görseller temsilidir
            (yapay zekâ ile üretilmiştir). Gerçek üretim fotoğrafları ve vaka çalışmaları eklendikçe güncellenecektir.
          </p>
          <Suspense fallback={null}>
            <PortfolioGrid projects={projects} categories={categories} />
          </Suspense>
        </div>
      </section>
      <CtaBand title="Benzer bir iş mi planlıyorsunuz?" location="portfolio_index" />
    </>
  );
}
