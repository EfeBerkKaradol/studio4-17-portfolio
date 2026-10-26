import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { activeServices, getService } from '@/data/services';
import { projects } from '@/data/projects';
import { ProcessStages, Faq, CheckList, CtaBand, ProjectCard, Testimonials, SectionHeading, ServiceIndex } from '@/components/Blocks/Blocks';
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

  const index = activeServices.findIndex((x) => x.slug === s.slug) + 1;
  const related = s.related.map(getService).filter(Boolean);
  const cases = projects.filter((p) => p.service === s.slug || p.categories.includes(s.portfolioCategory)).slice(0, 3);
  const quoteHref = `/teklif-al?hizmet=${s.slug}`;

  return (
    <>
      <section className={`page-top ${styles.hero}`}>
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Hizmetler', href: '/hizmetler' },
              { label: s.title, href: `/hizmetler/${s.slug}` },
            ]}
          />
          <div className={styles.heroGrid}>
            <div>
              <span className="eyebrow">
                Hizmet {String(index).padStart(2, '0')} — {s.title}
              </span>
              <h1 className={styles.title}>{s.h1}</h1>
              <p className="lead">{s.lead}</p>
              <div className="btn-row" style={{ marginTop: '2rem' }}>
                <Link href={quoteHref} className="btn btn-accent arrow">
                  Bu hizmet için teklif al
                </Link>
                <WhatsAppLink message={s.waMessage} location="service_hero" service={s.slug} />
              </div>
              {s.slug === '3d-baski' && (
                <p style={{ marginTop: '1.25rem' }}>
                  <Link href="/fiyat-hesaplama" className="text-link">
                    Dosyanızı yükleyip ön tahmin görün
                  </Link>
                </p>
              )}
            </div>
            <figure>
              <div className={`frame ${styles.heroImage}`}>
                <Image src={s.image} alt={s.imageAlt} fill priority sizes="(max-width: 900px) 100vw, 42vw" />
              </div>
              <figcaption className="caption">Temsili görsel</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className={`container ${styles.body}`}>
          <div className={styles.main}>
            <section aria-labelledby="hakkinda" className={styles.block}>
              <h2 id="hakkinda">Hizmet hakkında</h2>
              <div>
                {s.intro.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="kapsam" className={styles.block}>
              <h2 id="kapsam">Kapsam</h2>
              <div className={styles.twoCol}>
                <div>
                  <h3 className={styles.listTitle}>Teslim edilenler</h3>
                  <CheckList items={s.deliverables} />
                </div>
                <div>
                  <h3 className={styles.listTitle}>Kapsam dışı</h3>
                  <CheckList items={s.exclusions} variant="x" />
                </div>
              </div>
            </section>

            <section aria-labelledby="gerekenler" className={styles.block}>
              <h2 id="gerekenler">Sizden istediklerimiz</h2>
              <CheckList items={s.provide} />
            </section>

            <section aria-labelledby="fiyat" className={styles.block}>
              <h2 id="fiyat">Fiyatı neler belirler?</h2>
              <div>
                <p>Sabit liste yerine dosyanızı inceleyip yazılı teklif veriyoruz. Başlıca etkenler:</p>
                <CheckList items={s.priceFactors} />
              </div>
            </section>
          </div>

          <aside className={styles.aside} aria-label="Teknik bilgiler">
            <h2 className={styles.asideTitle}>Teknik bilgiler</h2>
            <dl className={styles.specs}>
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
            <Link href={quoteHref} className="btn btn-primary btn-block arrow">
              Teklif al
            </Link>
          </aside>
        </div>
      </section>

      <section className="section-tight section-alt" aria-labelledby="surec">
        <div className="container">
          <SectionHeading
            id="surec"
            eyebrow="Süreç ve teslim"
            title="Bu hizmette nasıl ilerliyoruz?"
            action={
              <Link href="/surec" className="text-link">
                Genel çalışma koşulları
              </Link>
            }
          />
          <ProcessStages steps={s.process} />
        </div>
      </section>

      <section className="section-tight" aria-labelledby="sss">
        <div className={`container ${styles.faqGrid}`}>
          <div>
            <span className="eyebrow">Sık sorulanlar</span>
            <h2 id="sss">{s.title} hakkında sorular</h2>
          </div>
          <Faq items={s.faqs} />
        </div>
      </section>

      <Testimonials service={s.slug} />

      {cases.length > 0 && (
        <section className="section-tight section-alt" aria-labelledby="ornekler">
          <div className="container">
            <SectionHeading
              id="ornekler"
              eyebrow="Portfolyo"
              title="İlgili çalışmalar"
              action={
                <Link href={`/portfolyo?kategori=${s.portfolioCategory}`} className="text-link">
                  Portfolyoda gör
                </Link>
              }
            />
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
          <SectionHeading id="ilgili" eyebrow="Diğer hizmetler" title="Birlikte sık istenenler" />
          <ServiceIndex services={related} images={false} />
        </div>
      </section>

      <CtaBand
        title={`${s.title} için teklif alın.`}
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
