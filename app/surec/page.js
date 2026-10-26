import Link from 'next/link';
import { PageIntro, ProcessStages, CtaBand, Faq, SectionHeading } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { pageMeta } from '@/lib/seo';
import styles from './surec.module.css';

export const metadata = pageMeta({
  title: 'Süreç ve Çalışma Koşulları | Studio 4.17',
  description:
    'Teklif talebinden teslime Studio 4.17 ile çalışma süreci: teklif, onay, üretim, kalite kontrol ve teslim. Revizyon, iptal, teslim ve dosya gizliliği koşulları.',
  path: '/surec',
});

const steps = [
  { title: 'Proje bilgileri', text: 'Teklif formu veya WhatsApp üzerinden dosyalarınızı, ölçeği, adedi ve teslim tarihinizi paylaşırsınız.' },
  { title: 'Fizibilite ve teklif', text: 'Dosyaları inceler, eksik bilgileri sorar; kapsam, fiyat ve teslim tarihini yazılı olarak iletiriz.' },
  { title: 'Onay', text: 'Teklifi onayladığınızda iş planlanır. Ön ödeme gerekiyorsa teklifte açıkça yazılır.' },
  { title: 'Üretim ve kalite kontrol', text: 'Gerekirse ara fotoğraf paylaşılır; teslimden önce ölçü ve yüzey kontrolü yapılır.' },
  { title: 'Teslim', text: 'Elden teslim veya uygun ambalajla gönderim. Dijital işler dosya olarak teslim edilir.' },
];

const byService = [
  {
    title: 'Fiziksel mimari maket',
    href: '/hizmetler/mimari-maket',
    points: [
      'Ölçek, taban ölçüsü ve detay seviyesi teklifte sabitlenir.',
      'Onaydan sonra gelen ölçü veya tasarım değişikliği ek iş sayılır.',
      'Hassas maketlerde elden teslim önerilir.',
    ],
  },
  {
    title: '3D baskı',
    href: '/hizmetler/3d-baski',
    points: [
      'Otomatik hesaplama yalnızca ön tahmindir; dosya baskıya uygunluk için incelenir.',
      'Destek yapısı, baskı yönü ve son işlem kesin teklifte netleşir.',
      'Tabla ölçüsünü aşan parçalar bölünerek basılabilir.',
    ],
  },
  {
    title: 'Görselleştirme ve modelleme',
    href: '/hizmetler/mimari-gorsellestirme',
    points: [
      'Üretim yerine kamera açısı önizlemesi ve onay aşaması vardır.',
      'Revizyon sayısı teklifte yazılıdır.',
      'Teslim, istenen formatta dijital dosyadır.',
    ],
  },
  {
    title: 'Proje ve teknik destek',
    href: '/hizmetler/teknik-destek',
    points: [
      'Desteğin kapsamı ve sınırları başta yazılı olarak belirlenir.',
      'Akademik işlerde tasarım ve teslim öğrenciye aittir.',
      'Dosya üzerinden veya birlikte çalışma oturumuyla ilerlenir.',
    ],
  },
];

const terms = [
  {
    q: 'Teklif ne kadar süre geçerli?',
    a: 'Geçerlilik süresi her teklifte yazılır. Malzeme fiyatları ve iş yoğunluğu değişebildiği için süresi geçen teklifler yeniden değerlendirilir.',
  },
  {
    q: 'Revizyon hakkı var mı?',
    a: 'Dijital işlerde (render, modelleme) revizyon sayısı teklifte belirtilir. Fiziksel üretimde, onaylanan dosya ve ölçülerden sonra gelen değişiklikler ek iş olarak fiyatlandırılır.',
  },
  {
    q: 'İptal edersem ne olur?',
    a: 'Üretime başlanmadan önce yapılan iptallerde ücret alınmaz. Üretim başladıktan sonra yapılan iptallerde o ana kadar yapılan iş ve kullanılan malzeme ücretlendirilebilir; koşullar teklifte yazılıdır.',
  },
  {
    q: 'Teslim ve teslim alma nasıl oluyor?',
    a: 'Teslim şekli (elden teslim veya gönderim) ve varsa gönderim ücreti teklifte belirtilir. Hassas maketlerde elden teslim öneririz.',
  },
  {
    q: 'Dosyalarım ne oluyor?',
    a: 'Dosyalar yalnızca teklif ve üretim için kullanılır, izniniz olmadan paylaşılmaz veya portfolyoda yayınlanmaz. Ayrıntılar KVKK ve Gizlilik sayfasındadır.',
  },
  {
    q: 'Ürün hasarlı ulaşırsa?',
    a: 'Teslim anında kontrol etmenizi rica ederiz. Gönderimde oluşan hasarı fotoğrafla birlikte hemen bildirin; durumu birlikte değerlendiririz.',
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageIntro
        eyebrow="Süreç"
        title="Teklif talebinden teslime."
        lead="Projenizi birlikte değerlendiriyor; kapsamı, fiyatı ve teslim koşullarını üretim öncesinde netleştiriyoruz."
        actions={
          <Link href="/teklif-al" className="btn btn-accent arrow">
            Teklif Al
          </Link>
        }
      >
        <Breadcrumbs items={[{ label: 'Süreç', href: '/surec' }]} />
      </PageIntro>

      <section className="section-tight" aria-labelledby="asamalar">
        <div className="container">
          <h2 id="asamalar" className="visually-hidden">
            Beş aşama
          </h2>
          <ProcessStages steps={steps} />
        </div>
      </section>

      <section className="section-tight section-alt" aria-labelledby="hizmete-gore">
        <div className="container">
          <SectionHeading
            id="hizmete-gore"
            eyebrow="Hizmete göre farklar"
            title="Her işin süreci biraz farklıdır."
            intro="Temel akış aynıdır; aşağıda her hizmet türünde nelerin değiştiğini özetledik."
          />
          <div className={styles.services}>
            {byService.map((s) => (
              <article key={s.title} className={styles.service}>
                <h3>{s.title}</h3>
                <ul>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <Link href={s.href} className="text-link small">
                  Hizmet ayrıntıları
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="kosullar">
        <div className={`container ${styles.termsGrid}`}>
          <div>
            <span className="eyebrow">Çalışma koşulları</span>
            <h2 id="kosullar">Önceden bilmeniz gerekenler.</h2>
            <p className={styles.termsIntro}>
              Bağlayıcı koşullar her işin yazılı teklifinde yer alır. Buradaki maddeler genel ilkelerimizdir.
            </p>
            <Link href="/kullanim-sartlari" className="text-link small">
              Hizmet ve kullanım şartları
            </Link>
          </div>
          <Faq items={terms} />
        </div>
      </section>

      <CtaBand title="Teklif talebiyle başlayalım." location="process_page" />
    </>
  );
}
