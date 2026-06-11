import Image from 'next/image';
import Link from 'next/link';
import styles from './CategorySection.module.css';

export default function CategorySection({ number, title, description, linkText, linkUrl, images }) {
  return (
    <div className={styles.categoryRow}>
      <div className={styles.categoryInfo}>
        <span className={styles.number}>{number}</span>
        <h2 className={`${styles.title} font-serif`}>{title}</h2>
        <p className={styles.description}>{description}</p>
        
        {linkUrl && (
          <Link href={linkUrl} className={styles.link}>
            {linkText || 'Tümünü Gör'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        )}
      </div>
      
      <div className={styles.imageGrid}>
        {images.map((img, index) => (
          <div key={index} className={`${styles.imageItem} ${index === 0 ? styles.mainImage : styles.subImage}`}>
            <Image 
              src={img.src} 
              alt={img.alt || title} 
              fill
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
  );
}
