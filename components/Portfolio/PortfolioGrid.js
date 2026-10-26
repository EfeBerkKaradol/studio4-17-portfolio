'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ProjectCard } from '@/components/Blocks/Blocks';
import styles from './PortfolioGrid.module.css';

// Filtre URL'de tutulur (?kategori=...), böylece paylaşılabilir ve geri tuşu çalışır.
export default function PortfolioGrid({ projects, categories }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const active = categories.some((c) => c.id === params.get('kategori')) ? params.get('kategori') : 'tumu';

  const select = (id) => {
    const q = id === 'tumu' ? '' : `?kategori=${id}`;
    router.replace(`${pathname}${q}`, { scroll: false });
  };

  const shown = active === 'tumu' ? projects : projects.filter((p) => p.categories.includes(active));
  const options = [{ id: 'tumu', label: 'Tümü' }, ...categories];

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Kategoriye göre filtrele">
        {options.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`${styles.filter} ${active === c.id ? styles.on : ''}`}
            aria-pressed={active === c.id}
            onClick={() => select(c.id)}
          >
            {c.label}{' '}
            <span className={styles.count}>
              {c.id === 'tumu' ? projects.length : projects.filter((p) => p.categories.includes(c.id)).length}
            </span>
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">
        {shown.length} çalışma gösteriliyor
      </p>
      {shown.length ? (
        <div className={styles.grid}>
          {shown.map((p, i) => (
            <ProjectCard key={p.slug} project={p} priority={i < 3} />
          ))}
        </div>
      ) : (
        <p className="muted">Bu kategoride henüz çalışma yok.</p>
      )}
    </>
  );
}
