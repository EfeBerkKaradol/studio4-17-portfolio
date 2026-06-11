import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import HeroSection from '@/components/HeroSection/HeroSection';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import CategorySection from '@/components/CategorySection/CategorySection';
import ProcessTimeline from '@/components/ProcessTimeline/ProcessTimeline';
import { projects, categories } from '@/data/projects';
import styles from './page.module.css';

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <>
      <Header />
      
      <main>
        <HeroSection />
        
        {/* Öne Çıkan Çalışmalar */}
        <section id="projeler" className="section-padding">
          <div className="container">
            <div className={styles.sectionHeader}>
              <div>
                <span className={styles.sectionSubtitle}>ÇALIŞMALARIMIZ</span>
                <h2 className={`${styles.sectionTitle} font-serif`}>
                  Öne Çıkan <br />Projeler
                </h2>
              </div>
              <p className={styles.sectionDesc}>
                Öğrencilik dönemimde ve stajlarımda yer aldığım, mimari tasarım, 
                iç mekan ve kentsel ölçekteki projelerden seçkiler.
              </p>
            </div>
            
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

        {/* Kategoriler */}
        <section id="hizmetler" className={`section-padding ${styles.bgCreamDark}`}>
          <div className="container">
            {categories.map((category) => (
              <CategorySection key={category.id} {...category} />
            ))}
          </div>
        </section>

        {/* Süreç */}
        <div id="surec">
          <ProcessTimeline />
        </div>
        
        {/* Kısa Hakkımda / İletişim CTA */}
        <section id="hakkimda" className="section-padding">
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className={styles.sectionSubtitle} style={{ justifyContent: 'center' }}>HAKKIMDA</span>
            <h2 className="font-serif" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Fikirlerinizi dinliyor,<br />geleceği tasarlıyorum.</h2>
            <p className="text-muted" style={{ fontSize: '1.125rem', marginBottom: '3rem', lineHeight: '1.8' }}>
              Mimarlık eğitimim boyunca sürdürülebilir malzemeler, insan psikolojisi ve kentsel dönüşüm üzerine yoğunlaştım. Her projenin sadece bir yapı değil, içinde yaşanacak bir "deneyim" olduğuna inanıyorum. Minimalist çizgileri, işlevsel detaylarla birleştirerek zamansız tasarımlar ortaya koymayı hedefliyorum.
            </p>
          </div>
        </section>

        <section id="iletisim" className="section-padding" style={{ textAlign: 'center', backgroundColor: 'var(--color-dark)', color: 'var(--color-white)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 className="font-serif" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Birlikte Çalışalım</h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '2.5rem', opacity: 0.8 }}>
              Yeni projelere, staj imkanlarına veya mimari tartışmalara her zaman açığım. 
              Detaylı portfolyomu ve CV'mi incelemek isterseniz iletişime geçebilirsiniz.
            </p>
            <a href="mailto:info@studio4-17.com" className="btn btn-primary">Bana Ulaşın</a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
