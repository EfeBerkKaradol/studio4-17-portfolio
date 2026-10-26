import Link from 'next/link';
import { PageIntro, CtaBand, CheckList } from '@/components/Blocks/Blocks';
import Breadcrumbs from '@/components/Seo/Breadcrumbs';
import { pageMeta } from '@/lib/seo';
import styles from '../content.module.css';

export const metadata = pageMeta({
  title: 'Hakkımızda | Studio 4.17',
  description:
    'Studio 4.17, mimarlık eğitiminden gelen bakışla İstanbul’da maket, 3D baskı, görselleştirme ve teknik destek sunan küçük bir üretim stüdyosudur. Nasıl çalıştığımızı okuyun.',
  path: '/hakkimizda',
});

// Not: Ekip, deneyim süresi veya ünvan bilgisi doğrulanmadan eklenmemelidir.
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Hakkımızda"
        title="Mimarlık bilen bir üretim stüdyosu"
        lead="Studio 4.17, İstanbul’da mimarlık eğitimi içinden doğmuş küçük bir üretim ve tasarım destek stüdyosudur. Çizimi okuyan, ölçeği bilen ve sunumun neyi anlatması gerektiğini soran bir ortak olmayı hedefliyoruz."
      >
        <Breadcrumbs items={[{ label: 'Hakkımızda', href: '/hakkimizda' }]} />
      </PageIntro>

      <section className="section-tight">
        <div className={`container ${styles.split}`}>
          <div className="prose">
            <h2>Neden kurulduk?</h2>
            <p>
              Mimarlık öğrenciliği sırasında maket ve sunum hazırlığının teslim haftalarında ne kadar zaman aldığını yakından
              biliyoruz. Studio 4.17, bu tecrübeyi öğrencilere ve tasarım ofislerine üretim desteği olarak sunmak için
              kuruldu.
            </p>
            <h2>Ne yapıyoruz?</h2>
            <p>
              Çalışmalarımız üç ayrı başlıkta toplanır ve bunları birbirinden net olarak ayırırız:
            </p>
            <ul>
              <li>
                <strong>Fiziksel üretim:</strong> mimari maket ve 3D baskı.
              </li>
              <li>
                <strong>Dijital tasarım işleri:</strong> 3D modelleme, üretim dosyası hazırlığı ve görselleştirme.
              </li>
              <li>
                <strong>Akademik teknik destek:</strong> pafta düzeni, çizim standardı ve dosya hazırlığı — tasarım her zaman
                öğrenciye aittir.
              </li>
            </ul>
            <h2>Nasıl çalışıyoruz?</h2>
            <p>
              Her iş yazılı bir teklifle başlar: kapsam, fiyat, teslim tarihi ve kapsam dışı kalanlar önceden yazılır.
              Teslim edemeyeceğimiz bir tarihi kabul etmeyiz; dosyada bir sorun görürsek üretimden önce söyleriz.
            </p>
            <h2>Neden güvenebilirsiniz?</h2>
            <CheckList
              items={[
                'Onayınız olmadan üretime başlanmaz.',
                'Otomatik fiyat hesapları ön tahmin olarak gösterilir, kesin fiyat gibi sunulmaz.',
                'Dosyalarınız yalnızca sizin işiniz için kullanılır.',
                'Portfolyoda gösterilen her çalışmanın türü (müşteri işi, akademik, örnek) açıkça yazılır.',
              ]}
            />
          </div>
          <aside className={styles.aside}>
            <div className={styles.card}>
              <h2>Atölye ve süreç fotoğrafları</h2>
              <p className="muted">
                Bu alana gerçek atölye, üretim ve ekip fotoğrafları eklenecek. Temsili görsel kullanılmamıştır.
              </p>
            </div>
            <div className={styles.card}>
              <h2>Birlikte çalışalım</h2>
              <p>Projenizi ve teslim tarihinizi paylaşın, yazılı teklifle dönelim.</p>
              <Link href="/teklif-al" className="btn btn-accent btn-block">
                Teklif Al
              </Link>
              <p style={{ marginTop: '0.75rem' }}>
                <Link href="/surec" className="text-link">
                  Süreç ve koşullar
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand location="about_page" />
    </>
  );
}
