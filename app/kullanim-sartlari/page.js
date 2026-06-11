import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '6rem', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="font-serif" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Kullanım Şartları</h1>
          <div className="content" style={{ lineHeight: '1.8', color: 'var(--color-text-muted)' }}>
            <p style={{ marginBottom: '1.5rem' }}>Bu web sitesine (Studio4.17) erişim sağlayarak aşağıdaki şartları kabul etmiş sayılırsınız:</p>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginTop: '2rem', marginBottom: '1rem' }}>Fikri Mülkiyet</h2>
            <p style={{ marginBottom: '1.5rem' }}>Bu sitede yer alan tüm mimari projeler, tasarımlar, 3D modeller, metinler ve görsellerin telif hakkı aksi belirtilmedikçe Studio4.17'ye aittir. Yazılı izin alınmadan kopyalanamaz, çoğaltılamaz ve ticari amaçla kullanılamaz.</p>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginTop: '2rem', marginBottom: '1rem' }}>Sorumluluk Reddi</h2>
            <p>Sitede yer alan konsept projeler ve teknik detaylar, bilgilendirme ve portfolyo sergileme amaçlıdır. Profesyonel bir mimari uygulama tavsiyesi yerine geçmez.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
