import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'Hakkımda | Studio4.17',
  description: 'Mimarlık eğitimim, deneyimlerim ve tasarıma bakış açım.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className="container">
            <span className={styles.subtitle}>HAKKIMDA</span>
            <h1 className="font-serif">Fikirlerinizi dinliyor,<br />geleceği tasarlıyorum.</h1>
            <p className={styles.heroDesc}>
              Mimarlık eğitimim boyunca sürdürülebilir malzemeler, insan psikolojisi ve kentsel dönüşüm üzerine yoğunlaştım. Her projenin sadece bir yapı değil, içinde yaşanacak bir "deneyim" olduğuna inanıyorum. Minimalist çizgileri, işlevsel detaylarla birleştirerek zamansız tasarımlar ortaya koymayı hedefliyorum.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
