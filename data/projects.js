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
//     yayın izni alınmış), 'akademik' (kendi akademik çalışmanız),
//     'kisisel' (kişisel çalışma) veya 'konsept' yapın.
//  3. Bilmediğiniz alanları null bırakın — sitede o satır gösterilmez.
//     Boşluğu doldurmak için bilgi uydurmayın.
//  4. Müşteri adını yalnızca yazılı izin varsa `client` alanına yazın.
//  5. Örnek kayıtları silin.
//
// Alanlar:
//  technique  — üretim tekniği (ör. 'FDM 3D baskı + el işçiliği')
//  material   — malzeme (ör. 'Beyaz maket kartonu, PLA')
//  scale      — ölçek veya boyut (ör. '1/200 · 40 × 60 cm')
//  contribution, result — Studio 4.17'nin gerçek katkısı ve teslim edilen çıktı

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

const SAMPLE_NOTE = 'Bu kayıt örnek içeriktir; görsel yapay zekâ ile üretilmiş temsili bir görseldir.';

export const projects = [
  {
    slug: 'beyaz-konut-maketi',
    title: 'Konut Sunum Maketi',
    kind: 'ornek',
    categories: ['mimari-maket', '3d-baski'],
    service: 'mimari-maket',
    typeLabel: 'Sunum maketi',
    image: '/images/hero.png',
    imageAlt: 'Koyu zemin üzerinde, kademeli kütleli beyaz bir konut maketi',
    summary: 'Kütle ve cephe kurgusunu tek renkte anlatan bir sunum maketi için örnek vaka sayfası.',
    brief: SAMPLE_NOTE,
    goal: 'Kütle kademelenmesini ve cephe boşluklarını tek renkli bir maketle okunur hale getirmek.',
    technique: null,
    material: null,
    scale: null,
    contribution: null,
    process: [],
    result: null,
    gallery: [{ src: '/images/hero.png', caption: 'Temsili görsel' }],
    featured: true,
  },
  {
    slug: 'peyzajli-yapi-maketi',
    title: 'Peyzajlı Yapı Maketi',
    kind: 'ornek',
    categories: ['mimari-maket'],
    service: 'mimari-maket',
    typeLabel: 'Vaziyet / yapı maketi',
    image: '/images/project-model.png',
    imageAlt: 'Ağaçlar, insan figürleri ve ahşap yol detayıyla çok katlı bir yapı maketi',
    summary: 'Yapı, peyzaj ve çevre ilişkisini birlikte anlatan bir maket için örnek vaka sayfası.',
    brief: SAMPLE_NOTE,
    goal: 'Yapının zeminle ve çevresindeki açık alanlarla ilişkisini göstermek.',
    technique: null,
    material: null,
    scale: null,
    contribution: null,
    process: [],
    result: null,
    gallery: [{ src: '/images/project-model.png', caption: 'Temsili görsel' }],
    featured: true,
  },
  {
    slug: 'ic-mekan-gorseli',
    title: 'İç Mekân Görselleştirme',
    kind: 'ornek',
    categories: ['gorsellestirme'],
    service: 'mimari-gorsellestirme',
    typeLabel: 'İç mekân render',
    image: '/images/project-interior.png',
    imageAlt: 'Brüt beton tavanlı, ahşap mobilyalı aydınlık bir yaşam alanı görseli',
    summary: 'Malzeme ve ışık kurgusunu anlatan bir iç mekân render çalışması için örnek vaka sayfası.',
    brief: SAMPLE_NOTE,
    goal: 'Mekânın malzeme dilini ve gün ışığıyla ilişkisini göstermek.',
    technique: null,
    material: null,
    scale: null,
    contribution: null,
    process: [],
    result: null,
    gallery: [{ src: '/images/project-interior.png', caption: 'Temsili görsel' }],
    featured: true,
  },
  {
    slug: 'yamac-konutu-modeli',
    title: 'Yamaç Konutu Modeli',
    kind: 'ornek',
    categories: ['modelleme', 'gorsellestirme'],
    service: '3d-modelleme',
    typeLabel: '3D model ve görsel',
    image: '/images/project-residential.png',
    imageAlt: 'Zeytin ağaçları arasında, havuzlu beyaz bir yamaç konutu görseli',
    summary: 'Çizimden 3D modele ve sunum görseline uzanan bir çalışma için örnek vaka sayfası.',
    brief: SAMPLE_NOTE,
    goal: 'Yapının topoğrafyayla ilişkisini model üzerinden kurmak.',
    technique: null,
    material: null,
    scale: null,
    contribution: null,
    process: [],
    result: null,
    gallery: [{ src: '/images/project-residential.png', caption: 'Temsili görsel' }],
    featured: false,
  },
  {
    slug: 'kultur-yapisi-calismasi',
    title: 'Kültür Yapısı Çalışması',
    kind: 'ornek',
    categories: ['akademik', 'gorsellestirme'],
    service: 'teknik-destek',
    typeLabel: 'Akademik sunum',
    image: '/images/project-cultural.png',
    imageAlt: 'Köşeli cepheli bir kültür yapısı ve önündeki kamusal meydan görseli',
    summary: 'Akademik bir stüdyo projesinin sunum aşaması için örnek vaka sayfası.',
    brief: `${SAMPLE_NOTE} Akademik çalışmalarda tasarım öğrenciye aittir; gerçek kayıtta yalnızca verilen teknik destek yazılır.`,
    goal: 'Yapının kamusal meydanla ilişkisini sunum paftasında öne çıkarmak.',
    technique: null,
    material: null,
    scale: null,
    contribution: null,
    process: [],
    result: null,
    gallery: [{ src: '/images/project-cultural.png', caption: 'Temsili görsel' }],
    featured: false,
  },
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export const isSample = (p) => p.kind === 'ornek';

// Proje meta satırları — yalnızca bilinen alanlar döner
export function projectMeta(p) {
  return [
    ['Tür', projectKinds[p.kind]],
    ['Çalışma', p.typeLabel],
    ['Teknik', p.technique],
    ['Malzeme', p.material],
    ['Ölçek / boyut', p.scale],
    ['Müşteri', p.client],
    ['Yıl', p.year],
  ].filter(([, v]) => v);
}
