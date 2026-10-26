import { PageIntro, ProcessSteps, CtaBand, Faq } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { pageMeta } from '@/lib/seo';
import styles from '../content.module.css';

export const metadata = pageMeta({
  title: 'Süreç ve Çalışma Koşulları | Studio 4.17',
  description:
    'Teklif talebinden teslime Studio 4.17 ile çalışma süreci: teklif, onay, üretim, kalite kontrol ve teslim. Revizyon, iptal, teslim ve dosya koşulları.',
  path: '/surec',
});

const steps = [
  { title: 'Proje bilgileri', text: 'Teklif formu veya WhatsApp üzerinden dosyalarınızı, ölçeği, adedi ve teslim tarihinizi paylaşırsınız.' },
  { title: 'Fizibilite ve teklif', text: 'Dosyaları inceler, eksik bilgileri sorar; kapsam, fiyat ve teslim tarihini yazılı olarak iletiriz.' },
  { title: 'Onay', text: 'Teklifi onayladığınızda üretim planına alınır. Ön ödeme gerekiyorsa teklifte belirtilir.' },
  { title: 'Üretim ve kalite kontrol', text: 'Üretim sırasında gerekirse ara fotoğraf paylaşılır; teslimden önce ölçü ve yüzey kontrolü yapılır.' },
  { title: 'Teslim', text: 'Elden teslim veya uygun ambalajla gönderim. Dijital işler dosya olarak teslim edilir.' },
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
    a: 'Dosyalar yalnızca teklif ve üretim için kullanılır, izniniz olmadan paylaşılmaz. Ayrıntılar KVKK ve Gizlilik sayfasındadır.',
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
        title="Teklif talebinden teslime"
        lead="Her iş yazılı bir teklifle başlar. Onayınız olmadan üretime başlanmaz, teslim edemeyeceğimiz bir tarihi kabul etmeyiz."
      >
        <Breadcrumbs items={[{ label: 'Süreç', href: '/surec' }]} />
      </PageIntro>
      <section className="section-tight">
        <div className="container">
          <ProcessSteps steps={steps} />
        </div>
      </section>
      <section className="section-tight section-alt" aria-labelledby="kosullar">
        <div className="container narrow">
          <h2 id="kosullar" className={styles.sectionTitle}>
            Çalışma koşulları
          </h2>
          <Faq items={terms} />
        </div>
      </section>
      <CtaBand location="process_page" />
    </>
  );
}
