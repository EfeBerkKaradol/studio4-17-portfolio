import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import HeroSection from '@/components/HeroSection/HeroSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />

        <section className={`section-padding ${styles.pricingPromo}`}>
          <div className="container">
            <div className={styles.promoGrid}>
              <div className={styles.promoContent}>
                <span className={styles.sectionSubtitle}>3D BASKI HİZMETİ</span>
                <h2 className={styles.promoTitle}>Anında Fiyat Hesaplama</h2>
                <p className={styles.promoDesc}>
                  3D modelinizi yükleyin, malzeme ve kalite seçin — saniyeler içinde detaylı fiyat tahmini alın.
                  STL, OBJ ve 3MF formatları desteklenir.
                </p>
                <div className={styles.promoFeatures}>
                  <div className={styles.promoFeature}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                    <span>3D Model Önizleme</span>
                  </div>
                  <div className={styles.promoFeature}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    <span>Slicer Tabanlı Fiyatlandırma</span>
                  </div>
                  <div className={styles.promoFeature}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>Anlık Sonuç</span>
                  </div>
                </div>
                <Link href="/fiyat-hesaplama" className={styles.promoBtn}>
                  Fiyat Hesapla
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
              </div>
              <div className={styles.promoVisual}>
                <div className={styles.promoCard}>
                  <div className={styles.promoCardHeader}>
                    <span>model.stl</span>
                    <span className={styles.promoCardBadge}>Analiz Tamamlandı</span>
                  </div>
                  <div className={styles.promoCardBody}>
                    <div className={styles.promoCardRow}><span>Boyut</span><span>120 × 80 × 45 mm</span></div>
                    <div className={styles.promoCardRow}><span>Hacim</span><span>432,000 mm³</span></div>
                    <div className={styles.promoCardRow}><span>Malzeme</span><span>PLA</span></div>
                    <div className={styles.promoCardRow}><span>Kalite</span><span>0.2mm Katman</span></div>
                    <div className={styles.promoCardDivider}></div>
                    <div className={`${styles.promoCardRow} ${styles.promoCardTotal}`}><span>Tahmini Fiyat</span><span>₺285.00</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
