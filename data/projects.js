// Portfolyo verisi.
//
// ÖNEMLİ: Aşağıdaki kayıtlar şu an ÖRNEK içeriktir. Görseller yapay zekâ ile
// üretilmiş temsili görsellerdir ve Studio 4.17'nin tamamlanmış işleri değildir.
// `kind: 'ornek'` olan kayıtlar sitede "Örnek içerik" etiketiyle gösterilir ve
// arama motorlarına kapatılır (noindex, sitemap dışı).
//
// Gerçek bir iş eklemek için:
//  1. Fotoğrafları public/images/portfolyo/<slug>/ altına koyun.
//  2. Aşağıya yeni bir kayıt ekleyin; `kind` alanını 'musteri' (müşteri işi,
//     yayın izni alınmış), 'akademik' (kendi akademik çalışmanız) veya
//     'kisisel' (kişisel çalışma) yapın.
//  3. Müşteri adını yalnızca yazılı izin varsa `client` alanına yazın.
//  4. Örnek kayıtları silin.

export const portfolioCategories = [
  { id: 'mimari-maket', label: 'Mimari Maket' },
  { id: '3d-baski', label: '3D Baskı' },
  { id: 'gorsellestirme', label: 'Görselleştirme' },
  { id: 'modelleme', label: 'Modelleme' },
  { id: 'akademik', label: 'Akademik / Kişisel' },
];

export const projectKinds = {
  musteri: 'Müşteri işi',
  akademik: 'Akademik çalışma',
  kisisel: 'Kişisel çalışma',
  konsept: 'Konsept çalışma',
  ornek: 'Örnek içerik',
};

export const projects = [
  {
    slug: 'beyaz-konut-maketi',
    title: 'Konut Sunum Maketi',
    kind: 'ornek',
    categories: ['mimari-maket', '3d-baski'],
    service: 'mimari-maket',
    image: '/images/hero.png',
    imageAlt: 'Koyu zemin üzerinde, kademeli kütleli beyaz bir konut maketi',
    summary: 'Bir konut projesinin kütle ve cephe kurgusunu anlatan beyaz sunum maketi için örnek vaka sayfası.',
    brief: 'Bu sayfa, bir sunum maketi vaka çalışmasının nasıl görüneceğini göstermek için hazırlanmış örnek içeriktir.',
    goal: 'Kütle kademelenmesini ve cephe boşluklarını tek renkli bir maketle okunur hale getirmek.',
    contribution: 'Gerçek bir işte bu alana Studio 4.17’nin üstlendiği iş (ör. model hazırlığı, baskı, montaj) yazılır.',
    process: [
      'Dosya kontrolü ve ölçeğe göre model hazırlığı',
      'Parçaların üretimi ve yüzey işlemleri',
      'Montaj ve teslim öncesi kontrol',
    ],
    materials: 'Gerçek işte kullanılan malzemeler buraya yazılır.',
    result: 'Gerçek işte teslim edilen ürün ve kullanımı buraya yazılır.',
    gallery: [{ src: '/images/hero.png', caption: 'Temsili görsel' }],
    featured: true,
  },
  {
    slug: 'peyzajli-yapi-maketi',
    title: 'Peyzajlı Yapı Maketi',
    kind: 'ornek',
    categories: ['mimari-maket'],
    service: 'mimari-maket',
    image: '/images/project-model.png',
    imageAlt: 'Ağaçlar, insan figürleri ve ahşap yol detayıyla çok katlı bir yapı maketi',
    summary: 'Yapı, peyzaj ve çevre ilişkisini birlikte anlatan maket için örnek vaka sayfası.',
    brief: 'Bu sayfa örnek içeriktir; gerçek bir proje eklendiğinde değiştirilecektir.',
    goal: 'Yapının zeminle ve çevresindeki açık alanlarla ilişkisini göstermek.',
    contribution: 'Gerçek bir işte Studio 4.17’nin katkısı buraya yazılır.',
    process: ['Ölçek ve kapsam belirleme', 'Taban ve topoğrafya', 'Yapı kütlesi ve peyzaj elemanları'],
    materials: 'Gerçek işte kullanılan malzemeler buraya yazılır.',
    result: 'Gerçek işte teslim edilen ürün buraya yazılır.',
    gallery: [{ src: '/images/project-model.png', caption: 'Temsili görsel' }],
    featured: true,
  },
  {
    slug: 'ic-mekan-gorseli',
    title: 'İç Mekân Görselleştirme',
    kind: 'ornek',
    categories: ['gorsellestirme'],
    service: 'mimari-gorsellestirme',
    image: '/images/project-interior.png',
    imageAlt: 'Brüt beton tavanlı, ahşap mobilyalı aydınlık bir yaşam alanı görseli',
    summary: 'Malzeme ve ışık kurgusunu anlatan iç mekân render çalışması için örnek vaka sayfası.',
    brief: 'Bu sayfa örnek içeriktir; gerçek bir proje eklendiğinde değiştirilecektir.',
    goal: 'Mekânın malzeme dilini ve gün ışığıyla ilişkisini göstermek.',
    contribution: 'Gerçek bir işte Studio 4.17’nin katkısı (modelleme, malzeme, ışık, render) buraya yazılır.',
    process: ['Model kontrolü', 'Kamera açılarının onayı', 'Malzeme ve ışık', 'Final görseller'],
    materials: 'Kullanılan yazılımlar buraya yazılır.',
    result: 'Teslim edilen görsel sayısı ve kullanım amacı buraya yazılır.',
    gallery: [{ src: '/images/project-interior.png', caption: 'Temsili görsel' }],
    featured: false,
  },
  {
    slug: 'yamac-konutu-modeli',
    title: 'Yamaç Konutu Modeli',
    kind: 'ornek',
    categories: ['modelleme', 'gorsellestirme'],
    service: '3d-modelleme',
    image: '/images/project-residential.png',
    imageAlt: 'Zeytin ağaçları arasında, havuzlu beyaz bir yamaç konutu görseli',
    summary: 'Çizimden 3D modele ve sunum görseline uzanan bir çalışma için örnek vaka sayfası.',
    brief: 'Bu sayfa örnek içeriktir; gerçek bir proje eklendiğinde değiştirilecektir.',
    goal: 'Yapının topoğrafyayla ilişkisini model üzerinden kurmak.',
    contribution: 'Gerçek bir işte Studio 4.17’nin katkısı buraya yazılır.',
    process: ['Çizimlerin incelenmesi', 'Topoğrafya ve kütle modeli', 'Detaylandırma'],
    materials: 'Kullanılan yazılımlar buraya yazılır.',
    result: 'Teslim edilen dosyalar buraya yazılır.',
    gallery: [{ src: '/images/project-residential.png', caption: 'Temsili görsel' }],
    featured: false,
  },
  {
    slug: 'kultur-yapisi-calismasi',
    title: 'Kültür Yapısı Çalışması',
    kind: 'ornek',
    categories: ['akademik', 'gorsellestirme'],
    service: 'teknik-destek',
    image: '/images/project-cultural.png',
    imageAlt: 'Köşeli cepheli bir kültür yapısı ve önündeki kamusal meydan görseli',
    summary: 'Akademik bir stüdyo projesinin sunum aşaması için örnek vaka sayfası.',
    brief: 'Bu sayfa örnek içeriktir; gerçek bir akademik çalışma eklendiğinde değiştirilecektir.',
    goal: 'Yapının kamusal meydanla ilişkisini sunum paftasında öne çıkarmak.',
    contribution: 'Akademik çalışmalarda tasarım öğrenciye aittir; burada yalnızca verilen teknik destek yazılır.',
    process: ['Pafta kurgusu', 'Görsel üretimi', 'Teslim hazırlığı'],
    materials: 'Kullanılan yazılımlar buraya yazılır.',
    result: 'Teslim edilen çıktı buraya yazılır.',
    gallery: [{ src: '/images/project-cultural.png', caption: 'Temsili görsel' }],
    featured: false,
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export const isSample = (p) => p.kind === 'ornek';
