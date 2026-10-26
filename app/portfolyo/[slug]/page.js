import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProject, portfolioCategories, isSample } from '@/data/projects';
import { getService } from '@/data/services';
import { CtaBand, ProjectMeta, ProjectCard, SectionHeading } from '@/components/Blocks/Blocks';
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
  const others = projects.filter((x) => x.slug !== p.slug).slice(0, 3);

  // Yalnızca bilinen bölümler gösterilir
  const sections = [
    ['Kısa tanım', p.brief],
    ['Hedef', p.goal],
    ['Studio 4.17’nin katkısı', p.contribution],
    ['Sonuç ve teslim', p.result],
  ].filter(([, v]) => v);

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
          <div className={styles.head}>
            <div>
              <p className="meta">{cats.join(' · ')}</p>
              <h1 className={styles.title}>{p.title}</h1>
              <p className="lead">{p.summary}</p>
            </div>
            {isSample(p) && (
              <p className="notice">
                <strong>Örnek içerik.</strong> Görsel yapay zekâ ile üretilmiş temsili bir görseldir; Studio 4.17’nin tamamlanmış
                bir işi değildir.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <figure>
            <div className={`frame ${styles.cover}`}>
              <Image src={p.image} alt={p.imageAlt} fill priority sizes="(max-width: 1320px) 100vw, 1220px" />
            </div>
            {p.gallery[0]?.caption && <figcaption className="caption">{p.gallery[0].caption}</figcaption>}
          </figure>

          <div className={styles.body}>
            <aside className={styles.aside}>
              <ProjectMeta project={p} />
              {service && (
                <p className={styles.serviceLink}>
                  <span className="meta">İlgili hizmet</span>
                  <Link href={`/hizmetler/${service.slug}`} className="text-link">
                    {service.title}
                  </Link>
                </p>
              )}
              <Link href={quoteHref} className="btn btn-accent btn-block arrow">
                Benzer bir iş için teklif al
              </Link>
            </aside>
            <div className={styles.main}>
              {sections.map(([title, text]) => (
                <section key={title} className={styles.block}>
                  <h2>{title}</h2>
                  <p>{text}</p>
                </section>
              ))}
              {p.process.length > 0 && (
                <section className={styles.block}>
                  <h2>Süreç</h2>
                  <ol className={styles.process}>
                    {p.process.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                </section>
              )}
            </div>
          </div>

          {p.gallery.length > 1 && (
            <div className={styles.gallery}>
              {p.gallery.slice(1).map((g) => (
                <figure key={g.src}>
                  <div className={`frame ${styles.galleryImage}`}>
                    <Image src={g.src} alt={g.alt || g.caption || p.title} fill sizes="(max-width: 700px) 100vw, 50vw" />
                  </div>
                  {g.caption && <figcaption className="caption">{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-tight section-alt" aria-labelledby="diger">
        <div className="container">
          <SectionHeading
            id="diger"
            eyebrow="Portfolyo"
            title="Diğer çalışmalar"
            action={
              <Link href="/portfolyo" className="text-link">
                Tümü
              </Link>
            }
          />
          <div className={styles.others}>
            {others.map((o) => (
              <ProjectCard key={o.slug} project={o} />
            ))}
          </div>
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
