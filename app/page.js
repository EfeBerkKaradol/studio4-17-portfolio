import Image from 'next/image';
import Link from 'next/link';
import { SectionHeading, ServiceIndex, ProjectCard, ProcessStages, Faq, CtaBand, Testimonials, CheckList } from '@/components/Blocks/Blocks';
import { WhatsAppLink } from '@/components/Contact/ContactLinks';
import { projects, isSample } from '@/data/projects';
import { pageMeta } from '@/lib/seo';
import styles from './home.module.css';

export const metadata = pageMeta({
  title: 'Studio 4.17 | İstanbul Mimari Maket, 3D Baskı ve Görselleştirme',
  description:
    "İstanbul'da mimarlık öğrencileri ve tasarım ofisleri için mimari maket üretimi, 3D baskı, görselleştirme ve teknik destek. Projenizi gönderin, yazılı teklif alın.",
  path: '/',
});

const workflow = [
  { title: 'Proje bilgileri', text: 'Çizim, model veya referanslarınızı, ölçeği ve teslim tarihini paylaşırsınız.' },
  { title: 'Fizibilite ve teklif', text: 'Dosyaları inceler; kapsam, fiyat ve süreyi yazılı olarak iletiriz.' },
  { title: 'Onay', text: 'Kapsam, fiyat ve teslim koşulları onaylanınca üretim planlanır.' },
  { title: 'Üretim ve kontrol', text: 'Üretim sonrası ölçü ve yüzey kontrolü; gerekirse ara fotoğraf.' },
  { title: 'Teslim', text: 'Elden teslim, gönderim ya da dijital işlerde dosya teslimi.' },
];

const principles = [
  { title: 'Mimarlık bilen bir üretim ortağı', text: 'Ölçek, kesit ve sunum mantığını biliyoruz; çiziminizi okurken neyin anlatılmak istendiğini sorarız.' },
  { title: 'Önce yazılı teklif', text: 'Kapsam, fiyat ve teslim tarihi yazılı olarak netleşmeden üretime başlamayız.' },
  { title: 'Dürüst tahmin', text: 'Otomatik hesaplama bir ön tahmindir; kesin fiyatı dosyanızı inceledikten sonra veririz.' },
  { title: 'Gizlilik', text: 'Dosyalar yalnızca teklif ve üretim için kullanılır; izniniz olmadan paylaşılmaz veya yayınlanmaz.' },
];

const faq = [
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
  {
    q: 'Jüri tarihime yetişir mi?',
    a: 'Dosyalarınızı gördükten sonra yetişip yetişmeyeceğini açıkça söyleriz. Yetişmeyecek bir tarihi kabul etmeyiz.',
  },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const selected = featured.length === 3 ? featured : projects.slice(0, 3);
  const allSamples = selected.every(isSample);

  return (
    <>
      {/* A. Giriş */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <span className="eyebrow">Mimari maket · 3D baskı · Dijital tasarım — İstanbul</span>
            <h1 className={`display ${styles.heroTitle}`}>
              Fikirden makete, <em>projeden üretime.</em>
            </h1>
            <p className="lead">
              İstanbul’da mimarlık öğrencileri ve tasarım ekipleri için mimari maket, 3D baskı ve dijital tasarım desteği.
            </p>
            <div className={`btn-row ${styles.heroActions}`}>
              <Link href="/teklif-al" className="btn btn-accent arrow">
                Projem İçin Teklif Al
              </Link>
              <Link href="/portfolyo" className="btn btn-outline">
                İşleri İncele
              </Link>
            </div>
            <WhatsAppLink
              message="Merhaba, Studio 4.17 hizmetleri hakkında bilgi almak istiyorum."
              location="home_hero"
              className={styles.heroWa}
            >
              Kısa bir soru mu var? WhatsApp’tan yazın
            </WhatsAppLink>
          </div>
          <figure className={styles.heroFigure}>
            <div className={`frame ${styles.heroImage}`}>
              <Image
                src="/images/project-model.png"
                alt="Ağaçlar ve insan figürleriyle peyzajlı, çok katlı beyaz bir mimari maket"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 46vw"
              />
            </div>
            <figcaption className="caption">Temsili görsel — gerçek üretim fotoğraflarıyla değiştirilecek.</figcaption>
          </figure>
        </div>
        <div className="container">
          <ul className={styles.facts}>
            <li>
              <span className="meta">Kimin için</span>
              <span>Mimarlık öğrencileri ve tasarım ofisleri</span>
            </li>
            <li>
              <span className="meta">Dosyalar</span>
              <span>PDF, DWG, 3DM, SKP, STL, OBJ, 3MF</span>
            </li>
            <li>
              <span className="meta">Çalışma şekli</span>
              <span>Üretim öncesi yazılı teklif</span>
            </li>
            <li>
              <span className="meta">Konum</span>
              <span>İstanbul · elden teslim veya gönderim</span>
            </li>
          </ul>
        </div>
      </section>

      {/* B. Hizmetler */}
      <section className="section" aria-labelledby="hizmetler">
        <div className="container">
          <SectionHeading
            id="hizmetler"
            eyebrow="Hizmetler"
            title="Maketten render’a, tek stüdyo."
            intro="Her hizmetin sayfasında ne göndermeniz gerektiğini, neyin teslim edildiğini ve fiyatı neyin belirlediğini açıkça yazdık."
            action={
              <Link href="/hizmetler" className="text-link">
                Tüm hizmetler
              </Link>
            }
          />
          <ServiceIndex />
        </div>
      </section>

      {/* C. İki müşteri yolu */}
      <section className="section section-alt" aria-labelledby="kimin-icin">
        <div className="container">
          <SectionHeading id="kimin-icin" eyebrow="İki yol, tek stüdyo" title="Öğrenci jürisinden ofis sunumuna." />
          <div className={styles.paths}>
            <article className={styles.path}>
              <span className="meta">01 — Öğrenciler</span>
              <h3 className={styles.pathTitle}>Mimarlık ve iç mimarlık öğrencileri</h3>
              <p>
                Jüri ve teslim haftaları için maket, 3D baskı, görselleştirme ve teknik destek. Tasarım sizin; üretimi ve
                teknik hazırlığı birlikte planlarız.
              </p>
              <h4 className={styles.pathSub}>Gönderebilecekleriniz</h4>
              <CheckList items={['Plan, kesit, görünüş (PDF/DWG)', 'Rhino, SketchUp veya STL/OBJ model', 'Referans görseller ve eskizler']} />
              <h4 className={styles.pathSub}>Süre ve bütçe</h4>
              <p className="small">
                Jüri tarihinizi ilk mesajda yazın; yetişmeyecek bir işi kabul etmeyiz. Bütçenizi belirtirseniz malzeme ve detay
                seviyesini ona göre öneririz.
              </p>
              <div className="btn-row">
                <Link href="/teklif-al?musteri=ogrenci" className="btn btn-accent arrow">
                  Öğrenci olarak teklif al
                </Link>
                <Link href="/ogrenciler" className="text-link">
                  Öğrenciler için
                </Link>
              </div>
            </article>
            <article className={styles.path}>
              <span className="meta">02 — Ofisler</span>
              <h3 className={styles.pathTitle}>Mimarlık ofisleri ve tasarım ekipleri</h3>
              <p>
                Yarışma ve müşteri sunumları, prototipler ve tekrar eden üretim işleri için yazılı kapsamla çalışan bir üretim
                ortağı.
              </p>
              <h4 className={styles.pathSub}>Teklif için gerekenler</h4>
              <CheckList items={['Proje dosyaları ve hedef ölçek', 'Sunum / teslim tarihi ve yeri', 'Adet, tekrar ve gizlilik gereksinimleri']} />
              <h4 className={styles.pathSub}>Çalışma koşulları</h4>
              <p className="small">
                Kapsam, teknik değerlendirme, teslim ve fatura koşulları yazılı teklifte netleşir. Düzenli işlerde ortak bir dosya
                ve onay düzeni kurarız.
              </p>
              <div className="btn-row">
                <Link href="/teklif-al?musteri=profesyonel&hizmet=ofislere-ozel-uretim" className="btn btn-primary arrow">
                  Ofis olarak teklif al
                </Link>
                <Link href="/ofisler" className="text-link">
                  Ofisler için
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* D. Seçili işler */}
      <section className="section" aria-labelledby="secili-isler">
        <div className="container">
          <SectionHeading
            id="secili-isler"
            eyebrow="Portfolyo"
            title="Seçili çalışmalar"
            action={
              <Link href="/portfolyo" className="text-link">
                Tüm portfolyo
              </Link>
            }
          />
          {allSamples && (
            <p className="notice" style={{ marginBottom: '2rem' }}>
              Portfolyo şu an örnek içerik ve temsili görseller içeriyor; gerçek çalışmalar eklendikçe güncellenecek.
            </p>
          )}
          <div className={styles.work}>
            <ProjectCard project={selected[0]} large />
            <div className={styles.workSide}>
              {selected.slice(1).map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* E. Süreç */}
      <section className="section section-alt" aria-labelledby="surec">
        <div className="container">
          <SectionHeading
            id="surec"
            eyebrow="Süreç"
            title="Teklif talebinden teslime."
            intro="Dijital işlerde (render, modelleme) üretim yerine önizleme ve revizyon aşamaları yer alır."
            action={
              <Link href="/surec" className="text-link">
                Süreç ve koşullar
              </Link>
            }
          />
          <ProcessStages steps={workflow} />
        </div>
      </section>

      {/* F. Güven */}
      <section className="section" aria-labelledby="ilkeler">
        <div className="container">
          <SectionHeading id="ilkeler" eyebrow="Çalışma ilkeleri" title="Neye güvenebilirsiniz?" />
          <div className={styles.principles}>
            {principles.map((r, i) => (
              <div key={r.title}>
                <span className={styles.principleNum}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="section section-alt" aria-labelledby="sss">
        <div className={`container ${styles.faqGrid}`}>
          <div>
            <span className="eyebrow">Fiyat ve sorular</span>
            <h2 id="sss">Sabit liste yerine yazılı teklif.</h2>
            <p className={styles.faqIntro}>
              Her proje farklı olduğu için dosyanızı inceleyip yazılı teklif veriyoruz. 3D baskı için dosyanızı yükleyip hacme
              dayalı bir ön tahmin görebilirsiniz.
            </p>
            <div className="btn-row">
              <Link href="/fiyat-hesaplama" className="btn btn-outline">
                3D baskı ön tahmini
              </Link>
            </div>
          </div>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand title="Projenizi konuşalım." quoteLabel="Projem İçin Teklif Al" location="home_final" />
    </>
  );
}
