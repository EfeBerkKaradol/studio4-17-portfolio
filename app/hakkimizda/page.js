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

// Not: Ekip, deneyim süresi, ünvan veya üyelik bilgisi doğrulanmadan eklenmemelidir.
export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Hakkımızda"
        title="Çizimi okuyan bir üretim stüdyosu."
        lead="Studio 4.17, İstanbul’da mimarlık eğitimi içinden doğmuş küçük bir üretim ve tasarım destek stüdyosudur. Ölçeği bilen, sunumun neyi anlatması gerektiğini soran bir ortak olmayı hedefliyoruz."
      >
        <Breadcrumbs items={[{ label: 'Hakkımızda', href: '/hakkimizda' }]} />
      </PageIntro>

      <section className="section-tight">
        <div className="container">
          <div className={styles.photoSlot} role="note">
            Bu alana gerçek atölye ve üretim fotoğrafları eklenecek. Bilerek temsili görsel kullanılmadı.
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className={`container ${styles.chapters}`}>
          <section aria-labelledby="bakis">
            <div>
              <span className={styles.chapterNum}>01</span>
              <h2 id="bakis">Tasarım bakışı</h2>
            </div>
            <div>
              <p>
                Mimarlık öğrenciliği sırasında maket ve sunum hazırlığının teslim haftalarında ne kadar zaman aldığını yakından
                biliyoruz. Bir maketin ya da görselin işi, projeyi süslemek değil okutmaktır: kütleyi mi, cepheyi mi, topoğrafyayı
                mı anlatacağı baştan net olmalıdır.
              </p>
              <p>Bu yüzden her işe aynı soruyla başlarız: bu çıktı neyi anlatmalı ve kim tarafından okunacak?</p>
            </div>
          </section>

          <section aria-labelledby="ne-yapiyoruz">
            <div>
              <span className={styles.chapterNum}>02</span>
              <h2 id="ne-yapiyoruz">Ne yapıyoruz?</h2>
            </div>
            <div>
              <p>Çalışmalarımızı üç başlıkta topluyor ve bunları birbirinden açıkça ayırıyoruz:</p>
              <CheckList
                items={[
                  'Fiziksel üretim — mimari maket ve 3D baskı',
                  'Dijital tasarım işleri — 3D modelleme, üretim dosyası hazırlığı ve görselleştirme',
                  'Teknik destek — pafta düzeni, çizim standardı ve dosya hazırlığı (akademik işlerde tasarım öğrenciye aittir)',
                ]}
              />
              <p style={{ marginTop: '1rem' }}>
                <Link href="/hizmetler" className="text-link">
                  Hizmetlerin ayrıntıları
                </Link>
              </p>
            </div>
          </section>

          <section aria-labelledby="yaklasim">
            <div>
              <span className={styles.chapterNum}>03</span>
              <h2 id="yaklasim">Malzeme, model ve üretim</h2>
            </div>
            <div>
              <p>
                Üretim yöntemini ölçeğe, süreye ve bütçeye göre seçeriz. El işçiliği ile 3D baskıyı birlikte kullanır, hangi
                parçanın hangi yöntemle üretileceğini teklifte yazarız.
              </p>
              <p>
                Dijital modeller çoğu zaman üretime hazır gelmez: sıfır kalınlıklı duvarlar, açık yüzeyler, ölçek küçülünce
                kaybolan detaylar. Bunları üretimden önce tespit eder, tasarım kararlarına dokunmadan size sorarız.
              </p>
            </div>
          </section>

          <section aria-labelledby="birlikte">
            <div>
              <span className={styles.chapterNum}>04</span>
              <h2 id="birlikte">Öğrenciler ve ofislerle çalışma</h2>
            </div>
            <div>
              <p>
                <strong>Öğrencilerle</strong> jüri tarihinden geriye doğru plan yapar, bütçeye göre malzeme ve detay seviyesi
                öneririz. Tasarım ve teslim öğrenciye aittir.
              </p>
              <p>
                <strong>Ofislerle</strong> kapsamı, teknik değerlendirmeyi, gizliliği ve teslim koşullarını yazılı olarak
                belirleriz; düzenli işlerde ortak bir dosya ve onay düzeni kurarız.
              </p>
              <div className="btn-row" style={{ marginTop: '1rem' }}>
                <Link href="/ogrenciler" className="text-link">
                  Öğrenciler için
                </Link>
                <Link href="/ofisler" className="text-link">
                  Ofisler için
                </Link>
              </div>
            </div>
          </section>

          <section aria-labelledby="beklenti">
            <div>
              <span className={styles.chapterNum}>05</span>
              <h2 id="beklenti">Bizden ne bekleyebilirsiniz?</h2>
            </div>
            <div>
              <CheckList
                items={[
                  'Onayınız olmadan üretime başlanmaz.',
                  'Yetişmeyecek bir teslim tarihini kabul etmeyiz.',
                  'Otomatik fiyat hesapları ön tahmin olarak gösterilir, kesin fiyat gibi sunulmaz.',
                  'Dosyalarınız yalnızca sizin işiniz için kullanılır.',
                  'Portfolyoda her çalışmanın türü (müşteri işi, akademik, örnek) açıkça yazılır.',
                ]}
              />
              <p style={{ marginTop: '1rem' }}>
                <Link href="/surec" className="text-link">
                  Süreç ve çalışma koşulları
                </Link>
              </p>
            </div>
          </section>
        </div>
      </section>

      <CtaBand location="about_page" />
    </>
  );
}
