import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        {/* Placeholder image, later will use generated image */}
        <div className={styles.overlay}></div>
      </div>
      
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.textContent}>
          <span className={styles.subtitle}>MİMARLIK & TASARIM PORTFOLYOSU</span>
          <h1 className={`${styles.title} font-serif`}>
            Fikirleri <br />
            <span className={styles.highlight}>Mekanlara</span><br />
            Dönüştürüyoruz.
          </h1>
          <p className={styles.description}>
            Mimarlık öğrencisi olarak edindiğim deneyimler, 
            katıldığım projeler ve tasarıma dair kişisel bakış açım.
            Modern, sürdürülebilir ve insan odaklı mekanlar tasarlıyorum.
          </p>
          <div className={styles.actions}>
            <Link href="#projeler" className="btn btn-primary">
              Projeleri İncele
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
            <Link href="#hakkimda" className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
              Hakkımda
            </Link>
          </div>
        </div>

        <div className={styles.heroImageWrapper}>
          <div className={styles.imageReveal}>
            <Image 
              src="/images/hero.png" 
              alt="Mimari Maket" 
              fill
              priority
              style={{ objectFit: 'cover' }}
              className={styles.heroImage}
            />
          </div>
          <div className={styles.imageAccent}></div>
        </div>
      </div>
      
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>AŞAĞI KAYDIR</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  );
}
