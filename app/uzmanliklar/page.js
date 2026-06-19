import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import CategorySection from '@/components/CategorySection/CategorySection';
import { categories } from '@/data/projects';
import styles from './page.module.css';

export const metadata = {
  title: 'Uzmanlıklar | Studio4.17',
  description: 'Mimari projeler, maketler ve teknik çizimler alanlarındaki uzmanlık alanlarımız.',
};

export default function ExpertisePage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <span className={styles.subtitle}>UZMANLIKLAR</span>
            <h1 className="font-serif">Tasarım Alanlarımız</h1>
            <p className={styles.heroDesc}>
              Mimari projelerden teknik çizimlere, farklı ölçeklerde tasarım çözümleri sunuyoruz.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            {categories.map((category) => (
              <CategorySection key={category.id} {...category} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
