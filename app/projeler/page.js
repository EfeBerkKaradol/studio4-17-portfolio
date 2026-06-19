import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import { projects } from '@/data/projects';
import styles from './page.module.css';

export default function ProjectsPage({ searchParams }) {
  // Basit kategori filtreleme (URL üzerinden örn: ?kategori=mimari)
  const categoryFilter = searchParams?.kategori;
  
  let displayedProjects = projects;
  if (categoryFilter === 'mimari') {
    displayedProjects = projects.filter(p => p.category.includes('Mimari') || p.category.includes('Yapı'));
  } else if (categoryFilter === 'maket') {
    displayedProjects = projects.filter(p => !p.category.includes('Mimari') && !p.category.includes('Yapı'));
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className="container">
            <h1 className="font-serif">Tüm Projeler</h1>
            <p>Konsept tasarımdan bitmiş projelere uzanan geniş bir yelpaze.</p>
          </div>
        </div>

        <section className="section-padding">
          <div className="container">
            <div className={styles.grid}>
              {displayedProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
            {displayedProjects.length === 0 && (
              <p style={{ textAlign: 'center', marginTop: '4rem' }}>Bu kategoride proje bulunamadı.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
