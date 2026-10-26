import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, projectKinds, portfolioCategories, isSample } from '@/data/projects';
import { getService } from '@/data/services';
import { CtaBand } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { pageMeta } from '@/lib/seo';
import styles from './project.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.title} | Portfolyo | Studio 4.17`,
    description: p.summary,
    path: `/portfolyo/${p.slug}`,
    image: p.image,
    // Örnek içerik arama motorlarına kapalı
    noindex: isSample(p),
  });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const service = getService(p.service);
  const cats = p.categories.map((id) => portfolioCategories.find((c) => c.id === id)?.label).filter(Boolean);
  const quoteHref = `/teklif-al?hizmet=${p.service}`;

  return (
    <>
      <section className="page-top">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Portfolyo', href: '/portfolyo' },
              { label: p.title, href: `/portfolyo/${p.slug}` },
            ]}
          />
          <div className={styles.tags}>
            <span className={`tag ${isSample(p) ? 'tag-sample' : ''}`}>{projectKinds[p.kind]}</span>
            {cats.map((c) => (
              <span key={c} className="tag">
                {c}
              </span>
            ))}
          </div>
          <h1 className={styles.title}>{p.title}</h1>
          <p className="lead">{p.summary}</p>
          {isSample(p) && (
            <p className="notice" style={{ marginTop: '1.5rem' }}>
              Bu sayfa <strong>örnek içeriktir</strong>. Görsel yapay zekâ ile üretilmiş temsili bir görseldir; Studio 4.17’nin
              tamamlanmış bir işi değildir.
            </p>
          )}
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <figure className={styles.cover}>
            <div className={styles.coverImage}>
              <Image src={p.image} alt={p.imageAlt} fill priority sizes="(max-width: 1280px) 100vw, 1200px" />
            </div>
            <figcaption className="muted small">{p.gallery[0]?.caption}</figcaption>
          </figure>

          <div className={styles.body}>
            <div className={styles.main}>
              <h2>Kısa tanım</h2>
              <p>{p.brief}</p>
              <h2>Hedef</h2>
              <p>{p.goal}</p>
              <h2>Studio 4.17’nin katkısı</h2>
              <p>{p.contribution}</p>
              <h2>Süreç</h2>
              <ol className={styles.process}>
                {p.process.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <h2>Sonuç</h2>
              <p>{p.result}</p>
            </div>
            <aside className={styles.aside}>
              <dl>
                <div>
                  <dt>Tür</dt>
                  <dd>{projectKinds[p.kind]}</dd>
                </div>
                {p.client && (
                  <div>
                    <dt>Müşteri</dt>
                    <dd>{p.client}</dd>
                  </div>
                )}
                {p.year && (
                  <div>
                    <dt>Yıl</dt>
                    <dd>{p.year}</dd>
                  </div>
                )}
                <div>
                  <dt>Malzeme ve teknik</dt>
                  <dd>{p.materials}</dd>
                </div>
                {service && (
                  <div>
                    <dt>İlgili hizmet</dt>
                    <dd>
                      <Link href={`/hizmetler/${service.slug}`} className="text-link">
                        {service.title}
                      </Link>
                    </dd>
                  </div>
                )}
              </dl>
              <Link href={quoteHref} className="btn btn-accent btn-block">
                Benzer bir iş için teklif al
              </Link>
            </aside>
          </div>

          {p.gallery.length > 1 && (
            <div className={styles.gallery}>
              {p.gallery.slice(1).map((g) => (
                <figure key={g.src}>
                  <div className={styles.galleryImage}>
                    <Image src={g.src} alt={g.alt || g.caption || p.title} fill sizes="(max-width: 700px) 100vw, 50vw" />
                  </div>
                  {g.caption && <figcaption className="muted small">{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          <p style={{ marginTop: '3rem' }}>
            <Link href="/portfolyo" className="text-link">
              ← Tüm çalışmalar
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Benzer bir iş mi planlıyorsunuz?"
        quoteHref={quoteHref}
        waMessage={`Merhaba, portfolyonuzdaki “${p.title}” benzeri bir iş için teklif almak istiyorum.`}
        location="project_detail"
        service={p.service}
      />
    </>
  );
}
