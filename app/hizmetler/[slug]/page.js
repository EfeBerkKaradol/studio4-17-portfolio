import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { activeServices, getService } from '@/data/services';
import { projects } from '@/data/projects';
import { ProcessSteps, Faq, CheckList, CtaBand, ProjectCard, Testimonials } from '@/components/Blocks/Blocks';
import { WhatsAppLink } from '@/components/Contact/ContactLinks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import JsonLd from '@/components/Seo/JsonLd';
import { pageMeta } from '@/lib/seo';
import { site, absoluteUrl } from '@/lib/site';
import styles from './service.module.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return activeServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/hizmetler/${s.slug}`, image: s.image });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const related = s.related.map(getService).filter(Boolean);
  const cases = projects.filter((p) => p.service === s.slug || p.categories.includes(s.portfolioCategory)).slice(0, 3);
  const quoteHref = `/teklif-al?hizmet=${s.slug}`;

  return (
    <>
      <section className={`page-top ${styles.hero}`}>
        <div className={`container ${styles.heroGrid}`}>
          <div>
            <Breadcrumbs
              items={[
                { label: 'Hizmetler', href: '/hizmetler' },
                { label: s.title, href: `/hizmetler/${s.slug}` },
              ]}
            />
            <span className="eyebrow">{s.title}</span>
            <h1>{s.h1}</h1>
            <p className="lead">{s.lead}</p>
            <div className="btn-row" style={{ marginTop: '1.75rem' }}>
              <Link href={quoteHref} className="btn btn-accent">
                Bu hizmet için teklif al
              </Link>
              <WhatsAppLink message={s.waMessage} location="service_hero" service={s.slug} />
            </div>
            {s.slug === '3d-baski' && (
              <p style={{ marginTop: '1rem' }}>
                <Link href="/fiyat-hesaplama" className="text-link">
                  Dosyanızı yükleyip ön tahmin görün
                </Link>
              </p>
            )}
          </div>
          <figure>
            <div className={styles.heroImage}>
              <Image src={s.image} alt={s.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 40vw" />
            </div>
            <figcaption className="muted small">Temsili görsel</figcaption>
          </figure>
        </div>
      </section>

      <section className="section-tight">
        <div className={`container ${styles.body}`}>
          <div className={styles.main}>
            <h2>Hizmet hakkında</h2>
            {s.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}

            <div className={styles.twoCol}>
              <div>
                <h2>Sizden istediklerimiz</h2>
                <CheckList items={s.provide} />
              </div>
              <div>
                <h2>Teslim edilenler</h2>
                <CheckList items={s.deliverables} />
              </div>
            </div>

            <h2>Kapsam dışı</h2>
            <CheckList items={s.exclusions} variant="x" />

            <h2>Fiyatı neler belirler?</h2>
            <p>Sabit liste yerine dosyanızı inceleyip yazılı teklif veriyoruz. Fiyatı etkileyen başlıca etkenler:</p>
            <CheckList items={s.priceFactors} />

            <h2>Süreç</h2>
            <ProcessSteps steps={s.process} />
          </div>

          <aside className={styles.aside} aria-label="Teknik bilgiler">
            <div className={styles.specCard}>
              <h2>Teknik bilgiler</h2>
              <dl>
                {s.specs.map((sp) => (
                  <div key={sp.label}>
                    <dt>{sp.label}</dt>
                    <dd>{sp.value}</dd>
                  </div>
                ))}
                <div>
                  <dt>Hizmet bölgesi</dt>
                  <dd>{site.serviceArea}</dd>
                </div>
              </dl>
              <Link href={quoteHref} className="btn btn-primary btn-block">
                Teklif al
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-tight section-alt" aria-labelledby="sss">
        <div className="container narrow">
          <h2 id="sss" style={{ marginBottom: '1.25rem' }}>
            Sık sorulan sorular
          </h2>
          <Faq items={s.faqs} />
        </div>
      </section>

      <Testimonials service={s.slug} />

      {cases.length > 0 && (
        <section className="section-tight" aria-labelledby="ornekler">
          <div className="container">
            <div className="section-head">
              <h2 id="ornekler">İlgili çalışmalar</h2>
              <Link href={`/portfolyo?kategori=${s.portfolioCategory}`} className="text-link">
                Portfolyoda gör
              </Link>
            </div>
            <div className={styles.cases}>
              {cases.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-tight" aria-labelledby="ilgili">
        <div className="container">
          <h2 id="ilgili" style={{ marginBottom: '1.25rem' }}>
            İlgili hizmetler
          </h2>
          <ul className={styles.related}>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/hizmetler/${r.slug}`}>
                  <strong>{r.title}</strong>
                  <span>{r.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={`${s.title} için teklif alın`}
        quoteHref={quoteHref}
        waMessage={s.waMessage}
        location={`service_${s.slug}`}
        service={s.slug}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.title,
          description: s.metaDescription,
          serviceType: s.title,
          url: absoluteUrl(`/hizmetler/${s.slug}`),
          areaServed: { '@type': 'City', name: 'İstanbul' },
          provider: { '@type': 'Organization', name: site.name, url: site.url },
        }}
      />
    </>
  );
}
