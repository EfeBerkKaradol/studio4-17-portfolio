import Image from 'next/image';
import Link from 'next/link';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const images = [
    { src: "/images/project-model.png", label: "Konsept Çalışma Maketi" },
    { src: "/images/project-interior.png", label: "İç Mekan Detayı" },
    { src: "/images/project-urban.png", label: "Vaziyet Planı" }
  ];

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.textContent}>
          <span className={styles.number}>02</span>
          <div className={styles.divider}></div>
          <h1 className={`${styles.title} font-serif`}>
            Maketler &amp;<br />Teknik Çizimler
          </h1>
          <p className={styles.description}>
            Tasarımların 3 boyutlu algısını güçlendiren
            çalışma maketleri ve projenin dilini anlatan
            kavramsal eskizler, teknik detay çözümleri.
          </p>
          <Link href="/projeler?kategori=maket" className={styles.link}>
            Tümünü Gör
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        <div className={styles.imageGrid}>
          {images.map((img, index) => (
            <div key={index} className={`${styles.imageItem} ${index === 0 ? styles.mainImage : styles.subImage}`}>
              <Image
                src={img.src}
                alt={img.label}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                className={styles.image}
              />
              {img.label && (
                <div className={styles.imageLabel}>{img.label}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
