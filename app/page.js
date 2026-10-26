import Image from 'next/image';
import Link from 'next/link';
import { ServiceGrid, ProjectCard, ProcessSteps, Faq, CtaBand, Testimonials } from '@/components/Blocks/Blocks';
import { WhatsAppLink } from '@/components/Contact/ContactLinks';
import { projects } from '@/data/projects';
import { pageMeta } from '@/lib/seo';
import styles from './home.module.css';

export const metadata = pageMeta({
  title: 'Studio 4.17 | İstanbul Mimari Maket, 3D Baskı ve Görselleştirme',
  description:
    "İstanbul'da mimarlık öğrencileri ve tasarım ofisleri için mimari maket üretimi, 3D baskı, görselleştirme ve teknik destek. Projenizi gönderin, yazılı teklif alın.",
  path: '/',
});

const workflow = [
  { title: 'Proje bilgilerini gönderin', text: 'Çizim, model veya referanslarınızı, ölçeği ve teslim tarihini paylaşın.' },
  { title: 'Değerlendirme ve teklif', text: 'Uygulanabilirliği inceler, kapsam, fiyat ve süreyi yazılı olarak iletiriz.' },
  { title: 'Onay', text: 'Kapsam, fiyat ve teslim koşullarını onayladığınızda üretim planlanır.' },
  { title: 'Üretim ve kontrol', text: 'Üretim sonrası ölçü ve yüzey kontrolü yapılır; gerekirse ara fotoğraf paylaşılır.' },
  { title: 'Teslim', text: 'Elden teslim veya uygun ambalajla gönderim.' },
];

const reasons = [
  {
    title: 'Mimarlık bilen bir üretim ortağı',
    text: 'Ölçek, kesit ve sunum mantığını biliyoruz; çiziminizi okurken neyin anlatılmak istendiğini sorarız.',
  },
  {
    title: 'Önce yazılı teklif, sonra üretim',
    text: 'Kapsam, fiyat ve teslim tarihi yazılı olarak netleşmeden üretime başlamayız.',
  },
  {
    title: 'Dürüst tahmin',
    text: 'Otomatik hesaplama yalnızca bir ön tahmindir; kesin fiyatı dosyanızı inceledikten sonra veririz.',
  },
  {
    title: 'Dosyalarınız size aittir',
    text: 'Dosyalar yalnızca teklif ve üretim için kullanılır; izniniz olmadan paylaşılmaz veya yayınlanmaz.',
  },
];

const pricingFaq = [
  {
    q: 'Fiyatı neler belirler?',
    a: 'Ölçek ve boyut, geometrinin karmaşıklığı, malzeme ve yüzey kalitesi, üretim yöntemi, adet, montaj/son işlem ve teslim süresi.',
  },
  {
    q: 'Teklif için ne hazırlamalıyım?',
    a: 'Elinizdeki çizim veya model dosyaları, istenen ölçek, yaklaşık taban ölçüsü, adet ve teslim tarihi. Emin olmadığınız bilgileri boş bırakabilirsiniz.',
  },
  {
    q: 'Teklif almak ücretli mi, beni bağlar mı?',
    a: 'Teklif talebi ücretsizdir ve sizi bağlamaz. Üretim, yazılı teklifi onaylamanızla başlar.',
  },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const selected = featured.length >= 3 ? featured : projects.slice(0, 3);

  return (
    <>
      {/* A. Giriş */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <span className="eyebrow">İstanbul · Mimari maket · 3D baskı</span>
            <h1 className={styles.heroTitle}>Mimari maket, 3D baskı ve dijital tasarım desteği</h1>
            <p className="lead">
              İstanbul’da mimarlık öğrencileri ve tasarım ekipleri için çizim ve modellerinizi jüriye, sunuma ve üretime
              hazır fiziksel ve dijital çıktılara dönüştürüyoruz.
            </p>
            <div className={`btn-row ${styles.heroActions}`}>
              <Link href="/teklif-al" className="btn btn-accent">
                Teklif Al
              </Link>
              <Link href="/portfolyo" className="btn btn-outline">
                Portfolyoyu İncele
              </Link>
            </div>
            <WhatsAppLink
              message="Merhaba, Studio 4.17 hizmetleri hakkında bilgi almak istiyorum."
              location="home_hero"
              className={styles.heroWa}
            >
              Hızlı soru için WhatsApp’tan yazın
            </WhatsAppLink>
          </div>
          <figure className={styles.heroFigure}>
            <div className={styles.heroImage}>
              <Image
                src="/images/project-model.png"
                alt="Ağaçlar ve insan figürleriyle peyzajlı, çok katlı beyaz bir mimari maket"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            <figcaption className="muted small">Temsili görsel — gerçek üretim fotoğraflarıyla değiştirilecek.</figcaption>
          </figure>
        </div>
      </section>

      {/* B. Hizmetler */}
      <section className="section" aria-labelledby="hizmetler">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Hizmetler</span>
              <h2 id="hizmetler">Ne yapıyoruz?</h2>
            </div>
            <Link href="/hizmetler" className="text-link">
              Tüm hizmetler
            </Link>
          </div>
          <ServiceGrid />
        </div>
      </section>

      {/* C. İki müşteri yolu */}
      <section className="section section-alt" aria-labelledby="kimin-icin">
        <div className="container">
          <span className="eyebrow">Kimin için?</span>
          <h2 id="kimin-icin" className={styles.pathsTitle}>
            Öğrenci jürisinden ofis sunumuna
          </h2>
          <div className={styles.paths}>
            <article className={styles.path}>
              <h3>Mimarlık ve iç mimarlık öğrencileri</h3>
              <p>
                Jüri ve teslim haftaları için maket, 3D baskı parçaları, görselleştirme ve teknik destek. Tasarım sizin;
                üretimi ve teknik hazırlığı birlikte planlarız.
              </p>
              <ul className={styles.pathList}>
                <li>Ölçekli maket ve maket parçaları</li>
                <li>3D baskı ve dosya hazırlığı</li>
                <li>Render ve pafta düzeni desteği</li>
              </ul>
              <Link href="/ogrenciler" className="btn btn-outline">
                Öğrenciler için
              </Link>
            </article>
            <article className={styles.path}>
              <h3>Mimarlık ofisleri ve tasarım ekipleri</h3>
              <p>
                Yarışma ve müşteri sunumları, prototipler ve tekrar eden üretim işleri için yazılı kapsamla çalışan bir
                üretim ortağı.
              </p>
              <ul className={styles.pathList}>
                <li>Sunum ve satış ofisi maketleri</li>
                <li>Ürün ve detay prototipleri</li>
                <li>Görselleştirme ve düzenli üretim desteği</li>
              </ul>
              <Link href="/ofisler" className="btn btn-outline">
                Ofisler için
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* D. Seçili işler */}
      <section className="section" aria-labelledby="secili-isler">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Portfolyo</span>
              <h2 id="secili-isler">Seçili çalışmalar</h2>
            </div>
            <Link href="/portfolyo" className="text-link">
              Tüm portfolyo
            </Link>
          </div>
          <p className="notice" style={{ marginBottom: '1.5rem' }}>
            Portfolyo şu an örnek içerik ve temsili görseller içeriyor; gerçek çalışmalar eklendikçe güncellenecek.
          </p>
          <div className={styles.projects}>
            {selected.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* E. Nasıl çalışır */}
      <section className="section section-alt" aria-labelledby="nasil-calisir">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Süreç</span>
              <h2 id="nasil-calisir">Nasıl çalışıyoruz?</h2>
            </div>
            <Link href="/surec" className="text-link">
              Süreç ve koşullar
            </Link>
          </div>
          <ProcessSteps steps={workflow} />
        </div>
      </section>

      {/* F. Neden Studio 4.17 */}
      <section className="section" aria-labelledby="neden">
        <div className="container">
          <span className="eyebrow">Neden Studio 4.17</span>
          <h2 id="neden" className={styles.pathsTitle}>
            Çalışma ilkelerimiz
          </h2>
          <div className={styles.reasons}>
            {reasons.map((r) => (
              <div key={r.title}>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* G. Fiyat ve SSS */}
      <section className="section section-alt" aria-labelledby="fiyat">
        <div className={`container ${styles.pricing}`}>
          <div>
            <span className="eyebrow">Fiyatlandırma</span>
            <h2 id="fiyat">Fiyat nasıl belirlenir?</h2>
            <p>
              Her proje farklı olduğu için sabit fiyat listesi yerine dosyanızı inceleyip yazılı teklif veriyoruz. 3D baskı
              için dosyanızı yükleyip hacme dayalı bir ön tahmin görebilirsiniz.
            </p>
            <div className="btn-row" style={{ marginTop: '1.5rem' }}>
              <Link href="/fiyat-hesaplama" className="btn btn-outline">
                3D baskı ön tahmini
              </Link>
              <Link href="/teklif-al" className="btn btn-primary">
                Teklif iste
              </Link>
            </div>
          </div>
          <Faq items={pricingFaq} />
        </div>
      </section>

      {/* H. Son çağrı */}
      <CtaBand location="home_final" />
    </>
  );
}
