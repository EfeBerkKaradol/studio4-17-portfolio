import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProcessTimeline from '@/components/ProcessTimeline/ProcessTimeline';

export const metadata = {
  title: 'Süreç | Studio4.17',
  description: 'Fikirden gerçeğe, adım adım tasarım sürecimiz.',
};

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--header-height)' }}>
        <ProcessTimeline />
      </main>
      <Footer />
    </>
  );
}
