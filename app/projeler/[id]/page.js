import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectDetail({ params }) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.heroImageWrapper}>
          <Image 
            src={project.image} 
            alt={project.title} 
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={`container ${styles.content}`}>
          <div className={styles.header}>
            <span className={styles.category}>{project.category}</span>
            <h1 className="font-serif">{project.title}</h1>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.mainInfo}>
              <h2>Proje Hakkında</h2>
              <p>{project.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            
            <div className={styles.metaInfo}>
              <div className={styles.metaBlock}>
                <h3>Konum</h3>
                <p>İstanbul, Türkiye</p>
              </div>
              <div className={styles.metaBlock}>
                <h3>Yıl</h3>
                <p>2024</p>
              </div>
              <div className={styles.metaBlock}>
                <h3>Rol</h3>
                <p>Mimari Tasarım, 3D Modelleme</p>
              </div>
            </div>
          </div>

          <div className={styles.gallery}>
            {/* Using the same image repeatedly for demo purposes */}
            <div className={styles.galleryImage}>
              <Image src={project.image} alt={`${project.title} Detay 1`} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className={styles.galleryImage}>
              <Image src={project.image} alt={`${project.title} Detay 2`} fill style={{ objectFit: 'cover' }} />
            </div>
          </div>

          <div className={styles.navigation}>
            <Link href="/projeler" className="btn btn-outline">Tüm Projelere Dön</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
