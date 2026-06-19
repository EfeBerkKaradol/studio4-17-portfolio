import styles from './ProcessTimeline.module.css';

export default function ProcessTimeline() {
  const steps = [
    {
      id: "01",
      icon: "💬", // Can be replaced with proper SVG icons
      title: "Fikir / Analiz",
      description: "İhtiyaçlarınızı dinliyor, alanın potansiyelini analiz ediyoruz."
    },
    {
      id: "02",
      icon: "✏️",
      title: "Konsept Tasarımı",
      description: "Fikirleri taslaklara döküyor, ana konsepti belirliyoruz."
    },
    {
      id: "03",
      icon: "🖥️",
      title: "3D Modelleme",
      description: "Mekanı dijital ortamda tüm detaylarıyla modelliyoruz."
    },
    {
      id: "04",
      icon: "✨",
      title: "Görselleştirme",
      description: "Gerçekçi renderlar ile projenin bitmiş halini sunuyoruz."
    },
    {
      id: "05",
      icon: "📐",
      title: "Teknik Çizim",
      description: "Uygulama için gerekli tüm detay ve sistem çizimlerini hazırlıyoruz."
    }
  ];

  return (
    <section className={styles.processSection}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className={styles.subtitle}>SÜREÇ</span>
          <h2 className={`${styles.title} font-serif`}>Fikirden gerçeğe,<br/>adım adım.</h2>
        </div>
        
        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <div key={step.id} className={styles.step}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{step.icon}</span>
              </div>
              <div className={styles.stepNumber}>{step.id}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
              
              {index !== steps.length - 1 && (
                <div className={styles.connector}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
