import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import { projects } from '@/data/projects';
import styles from './page.module.css';

export const metadata = {
  title: 'Portfolyo | Studio4.17',
  description: 'Mimari projeler, iç mekan tasarımları ve kentsel ölçek çalışmalarından seçkiler.',
};

export default function PortfolioPage() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className="container">
            <span className={styles.subtitle}>PORTFOLYO</span>
            <h1 className="font-serif">Öne Çıkan Projeler</h1>
            <p className={styles.heroDesc}>
              Öğrencilik dönemimde ve stajlarımda yer aldığım, mimari tasarım,
              iç mekan ve kentsel ölçekteki projelerden seçkiler.
            </p>
          </div>
        </div>

        <section className="section-padding">
          <div className="container">
            <div className={styles.featuredGrid}>
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>

            <div className={styles.projectsGrid}>
              {otherProjects.map(project => (
                <ProjectCard key={project.id} {...project} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
