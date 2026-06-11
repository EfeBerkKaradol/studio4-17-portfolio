import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 'calc(var(--header-height) + 4rem)', paddingBottom: '6rem', minHeight: '80vh' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="font-serif" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Gizlilik Politikası</h1>
          <div className="content" style={{ lineHeight: '1.8', color: 'var(--color-text-muted)' }}>
            <p style={{ marginBottom: '1.5rem' }}>Son güncellenme: {new Date().toLocaleDateString('tr-TR')}</p>
            <p style={{ marginBottom: '1.5rem' }}>Studio4.17 olarak gizliliğinize önem veriyoruz. Bu web sitesi üzerinden bizimle paylaştığınız (iletişim formu veya e-posta aracılığıyla) hiçbir kişisel veri, üçüncü şahıslarla paylaşılmaz ve yalnızca size geri dönüş yapmak amacıyla kullanılır.</p>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-dark)', marginTop: '2rem', marginBottom: '1rem' }}>Çerezler (Cookies)</h2>
            <p>Bu portfolyo sitesinde, size daha iyi bir deneyim sunmak amacıyla temel düzeyde analitik çerezleri (örneğin sayfa görüntülenme sayıları) kullanılabilir. Tarayıcı ayarlarınızdan çerezleri dilediğiniz zaman kapatabilirsiniz.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
