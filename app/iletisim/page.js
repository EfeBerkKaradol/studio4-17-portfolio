import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from './page.module.css';

export const metadata = {
  title: 'İletişim | Studio4.17',
  description: 'Yeni projeler, staj imkanları veya mimari tartışmalar için iletişime geçin.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className="container">
            <h1 className="font-serif">Birlikte Çalışalım</h1>
            <p className={styles.heroDesc}>
              Yeni projelere, staj imkanlarına veya mimari tartışmalara her zaman açığım.
              Detaylı portfolyomu ve CV'mi incelemek isterseniz iletişime geçebilirsiniz.
            </p>
            <a href="mailto:info@studio4-17.com" className="btn btn-secondary" style={{ marginTop: '2.5rem' }}>
              Bana Ulaşın
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
