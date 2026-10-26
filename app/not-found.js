import Link from 'next/link';

export const metadata = {
  title: 'Sayfa bulunamadı | Studio 4.17',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="page-top section-tight">
      <div className="container narrow">
        <span className="eyebrow">404</span>
        <h1>Aradığınız sayfa bulunamadı</h1>
        <p className="lead" style={{ margin: '1rem 0 2rem' }}>
          Sayfa taşınmış veya kaldırılmış olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz.
        </p>
        <div className="btn-row">
          <Link href="/" className="btn btn-primary">
            Ana sayfa
          </Link>
          <Link href="/hizmetler" className="btn btn-outline">
            Hizmetler
          </Link>
          <Link href="/teklif-al" className="btn btn-outline">
            Teklif Al
          </Link>
        </div>
      </div>
    </section>
  );
}
