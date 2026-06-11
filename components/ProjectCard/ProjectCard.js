import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ id, title, category, image, description, featured = false }) {
  return (
    <div className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <Link href={`/projeler/${id}`} className={styles.imageLink}>
        <div className={styles.imageWrapper}>
          <Image 
            src={image || '/images/project-residential.png'} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.overlay}>
            <span className={styles.viewText}>Projeyi İncele</span>
          </div>
        </div>
      </Link>
      <div className={styles.content}>
        <span className={styles.category}>{category}</span>
        <h3 className={`${styles.title} font-serif`}>
          <Link href={`/projeler/${id}`}>{title}</Link>
        </h3>
        {featured && description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </div>
  );
}
