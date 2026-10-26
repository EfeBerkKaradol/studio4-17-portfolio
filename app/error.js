'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-top section-tight">
      <div className="container narrow">
        <span className="eyebrow">Hata</span>
        <h1>Bir şeyler ters gitti</h1>
        <p className="lead" style={{ margin: '1rem 0 2rem' }}>
          Sayfa yüklenirken beklenmeyen bir hata oluştu. Tekrar deneyebilir veya ana sayfaya dönebilirsiniz.
        </p>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Tekrar dene
          </button>
          <Link href="/" className="btn btn-outline">
            Ana sayfa
          </Link>
        </div>
      </div>
    </section>
  );
}
