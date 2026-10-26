import Image from 'next/image';
import Link from 'next/link';
import { activeServices } from '@/data/services';
import { projectKinds, isSample } from '@/data/projects';
import { testimonials } from '@/data/testimonials';
import { WhatsAppLink } from '@/components/Contact/ContactLinks';
import styles from './Blocks.module.css';

export function ServiceGrid({ services = activeServices, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  return (
    <ul className={styles.serviceGrid}>
      {services.map((s, i) => (
        <li key={s.slug} className={styles.serviceItem}>
          <Link href={`/hizmetler/${s.slug}`} className={styles.serviceLink}>
            <span className={styles.serviceNum}>{String(i + 1).padStart(2, '0')}</span>
            <H className={styles.serviceTitle}>{s.title}</H>
            <p>{s.short}</p>
            <span className={styles.more} aria-hidden="true">
              Ayrıntılar →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project, priority = false }) {
  return (
    <article className={styles.projectCard}>
      <Link href={`/portfolyo/${project.slug}`} className={styles.projectLink}>
        <div className={styles.projectImage}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
          />
        </div>
        <div className={styles.projectBody}>
          <span className={`tag ${isSample(project) ? 'tag-sample' : ''}`}>{projectKinds[project.kind]}</span>
          <h3>{project.title}</h3>
          <p>{project.summary}</p>
        </div>
      </Link>
    </article>
  );
}

export function ProcessSteps({ steps }) {
  return (
    <ol className={styles.steps}>
      {steps.map((step, i) => (
        <li key={i} className={styles.step}>
          <span className={styles.stepNum} aria-hidden="true">
            {i + 1}
          </span>
          <div>
            {typeof step === 'string' ? (
              <p>{step}</p>
            ) : (
              <>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Faq({ items }) {
  return (
    <div className={styles.faq}>
      {items.map((item) => (
        <details key={item.q} className={styles.faqItem}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function CheckList({ items, variant }) {
  return (
    <ul className={`${styles.checklist} ${variant === 'x' ? styles.xlist : ''}`}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function CtaBand({
  title = 'Projenizi konuşalım',
  text = 'Dosyalarınızı ve teslim tarihinizi gönderin; uygulanabilirliği değerlendirip yazılı teklif hazırlayalım.',
  quoteHref = '/teklif-al',
  waMessage = 'Merhaba, bir proje için teklif almak istiyorum.',
  location = 'cta_band',
  service,
}) {
  return (
    <section className={styles.ctaBand} aria-labelledby={`cta-${location}`}>
      <div className={`container ${styles.ctaInner}`}>
        <div>
          <h2 id={`cta-${location}`}>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="btn-row">
          <Link href={quoteHref} className="btn btn-accent">
            Teklif Al
          </Link>
          <WhatsAppLink message={waMessage} location={location} service={service} />
        </div>
      </div>
    </section>
  );
}

// Yalnızca gerçek, izinli yorumlar varsa görünür.
export function Testimonials({ service }) {
  const list = testimonials.filter((t) => !service || t.service === service);
  if (list.length === 0) return null;
  return (
    <section className="section-tight" aria-labelledby="yorumlar">
      <div className="container">
        <h2 id="yorumlar">Müşterilerimiz ne diyor?</h2>
        <ul className={styles.quotes}>
          {list.map((t) => (
            <li key={t.quote}>
              <blockquote>
                <p>“{t.quote}”</p>
                <footer>
                  {t.name}
                  {t.role ? `, ${t.role}` : ''}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, lead, children }) {
  return (
    <section className={`page-top ${styles.intro}`}>
      <div className="container">
        {children}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
