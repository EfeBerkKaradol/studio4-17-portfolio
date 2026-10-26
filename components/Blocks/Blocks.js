import Image from 'next/image';
import Link from 'next/link';
import { activeServices } from '@/data/services';
import { projectKinds, isSample, projectMeta } from '@/data/projects';
import { testimonials } from '@/data/testimonials';
import { WhatsAppLink } from '@/components/Contact/ContactLinks';
import styles from './Blocks.module.css';

const pad = (n) => String(n).padStart(2, '0');

// Bölüm başlığı: üst etiket + serif başlık + kısa açıklama + sağda bağlantı
export function SectionHeading({ eyebrow, title, intro, action, id, level = 2 }) {
  const H = `h${level}`;
  return (
    <div className="section-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <H id={id}>{title}</H>
        {intro && <p>{intro}</p>}
      </div>
      {action}
    </div>
  );
}

// Editoryal hizmet dizini: numara · başlık · açıklama · küçük görsel
export function ServiceIndex({ services = activeServices, headingLevel = 3, images = true }) {
  const H = `h${headingLevel}`;
  return (
    <ol className={styles.index}>
      {services.map((s, i) => (
        <li key={s.slug}>
          <Link href={`/hizmetler/${s.slug}`} className={`${styles.indexRow} ${images ? '' : styles.noImage}`}>
            <span className={styles.indexNum}>{pad(i + 1)}</span>
            <H className={styles.indexTitle}>{s.title}</H>
            <p className={styles.indexText}>{s.short}</p>
            {images && (
              <span className={`frame ${styles.indexImage}`} aria-hidden="true">
                <Image src={s.image} alt="" fill sizes="160px" />
              </span>
            )}
            <span className={styles.indexArrow} aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

// Eski adla kullanımlar için
export const ServiceGrid = ServiceIndex;

export function ProjectCard({ project, priority = false, large = false }) {
  return (
    <article className={`${styles.project} ${large ? styles.projectLarge : ''}`}>
      <Link href={`/portfolyo/${project.slug}`} className={styles.projectLink}>
        <div className={`frame ${styles.projectImage}`}>
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority={priority}
            sizes={large ? '(max-width: 900px) 100vw, 60vw' : '(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw'}
          />
          {isSample(project) && <span className={`tag tag-sample ${styles.projectFlag}`}>Örnek içerik</span>}
        </div>
        <div className={styles.projectBody}>
          <p className="meta">
            {project.typeLabel}
            {!isSample(project) && ` · ${projectKinds[project.kind]}`}
          </p>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectSummary}>{project.summary}</p>
        </div>
      </Link>
    </article>
  );
}

export function ProjectMeta({ project }) {
  return (
    <dl className={styles.metaList}>
      {projectMeta(project).map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

// Süreç aşamaları: masaüstünde yatay, mobilde dikey
export function ProcessStages({ steps, compact = false }) {
  return (
    <ol className={`${styles.stages} ${compact ? styles.stagesCompact : ''}`}>
      {steps.map((step, i) => (
        <li key={i} className={styles.stage}>
          <span className={styles.stageNum}>{pad(i + 1)}</span>
          {typeof step === 'string' ? (
            <p>{step}</p>
          ) : (
            <>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

export const ProcessSteps = ProcessStages;

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
  title = 'Projenizi konuşalım.',
  text = 'Dosyalarınızı ve teslim tarihinizi gönderin; uygulanabilirliği değerlendirip yazılı teklif hazırlayalım.',
  quoteHref = '/teklif-al',
  quoteLabel = 'Teklif Al',
  waMessage = 'Merhaba, bir proje için teklif almak istiyorum.',
  location = 'cta_band',
  service,
}) {
  return (
    <section className={styles.cta} aria-labelledby={`cta-${location}`}>
      <div className={`container ${styles.ctaInner}`}>
        <h2 id={`cta-${location}`}>{title}</h2>
        <div className={styles.ctaSide}>
          <p>{text}</p>
          <div className="btn-row">
            <Link href={quoteHref} className="btn btn-accent arrow">
              {quoteLabel}
            </Link>
            <WhatsAppLink message={waMessage} location={location} service={service} />
          </div>
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
        <SectionHeading eyebrow="Geri bildirim" title="Birlikte çalıştıklarımız" id="yorumlar" />
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

// Alt sayfaların giriş bölümü
export function PageIntro({ eyebrow, title, lead, children, actions, aside }) {
  return (
    <section className={`page-top ${styles.intro}`}>
      <div className="container">
        {children}
        <div className={aside ? styles.introGrid : undefined}>
          <div>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1 className={styles.introTitle}>{title}</h1>
            {lead && <p className="lead">{lead}</p>}
            {actions && <div className={`btn-row ${styles.introActions}`}>{actions}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
