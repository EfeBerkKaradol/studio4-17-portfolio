// Hizmet sayfalarının içeriği. Her hizmet /hizmetler/[slug] adresinde yayınlanır.
// Yalnızca gerçekten verilebilen hizmetler burada kalmalı; bir hizmet geçici
// olarak verilemiyorsa `active: false` yapın — sayfası ve menü linki kaybolur.

export const services = [
  {
    slug: 'mimari-maket',
    active: true,
    title: 'Mimari Maket Üretimi',
    short: 'Jüri, sunum ve satış ofisleri için ölçekli mimari maketler.',
    metaTitle: 'Mimari Maket Üretimi İstanbul | Studio 4.17',
    metaDescription:
      "İstanbul'da öğrenci jürileri ve mimarlık ofisleri için ölçekli mimari maket üretimi. Çizim veya 3D modelinizi gönderin, ölçek ve malzemeye göre teklif alın.",
    h1: "İstanbul'da ölçekli mimari maket üretimi",
    lead:
      'Vaziyet planından detay maketine kadar, projenizin ölçeğine ve sunum amacına uygun maketi çizim ya da 3D modelinizden üretiyoruz.',
    image: '/images/project-model.png',
    imageAlt: 'Ağaçlar ve insan figürleriyle beyaz bir mimari maket (temsili görsel)',
    portfolioCategory: 'mimari-maket',
    intro: [
      'Maket, bir projenin jüride ya da müşteri toplantısında en hızlı okunan anlatım aracıdır. Bu nedenle üretime başlamadan önce maketin neyi anlatması gerektiğini konuşuruz: kütle mi, cephe mi, topoğrafya mı, yoksa iç mekân mı?',
      'Üretimde el işçiliğini ve 3D baskıyı birlikte kullanırız. Hangi parçanın hangi yöntemle üretileceği, ölçeğe ve teslim süresine göre teklifte netleşir.',
    ],
    provide: [
      'Plan, kesit ve görünüşler (PDF veya DWG) ya da 3D model (Rhino, SketchUp, Revit dışa aktarımı, STL/OBJ)',
      'İstenen ölçek ve maket taban ölçüsü',
      'Maketin amacı: konsept/kütle, sunum, detay veya vaziyet',
      'Malzeme ve renk tercihi (beyaz maket, ahşap tonları, karışık)',
      'Teslim tarihi ve teslim şekli',
    ],
    deliverables: [
      'Onaylanan ölçek ve kapsamda bitmiş maket',
      'Taban (altlık) ve gerekirse topoğrafya katmanları',
      'Teklifte yer alıyorsa ağaç, insan figürü ve peyzaj elemanları',
      'Teslim öncesi fotoğraflı kontrol',
    ],
    exclusions: [
      'Projenin tasarımı veya eksik çizimlerin sizin yerinize tasarlanması',
      'Teklifte yer almayan aydınlatma, hareketli parça veya cam fanus',
      'Onaydan sonra gelen ölçü/tasarım değişiklikleri (ayrıca fiyatlandırılır)',
    ],
    specs: [
      { label: 'Yaygın ölçekler', value: '1/1000 – 1/500 (vaziyet), 1/200 – 1/100 (yapı), 1/50 ve üzeri (detay)' },
      { label: 'Malzemeler', value: 'Maket kartonu, foreks, balsa/ahşap, pleksi ve 3D baskı parçalar — projeye göre' },
      { label: 'Kabul edilen dosyalar', value: 'PDF, DWG/DXF, 3DM, SKP, STL, OBJ, 3MF' },
    ],
    priceFactors: [
      'Maket taban ölçüsü ve ölçek',
      'Cephe ve detay yoğunluğu',
      'Topoğrafya ve peyzaj gereksinimi',
      'Malzeme ve yüzey kalitesi',
      'Adet ve tekrar eden parça sayısı',
      'Teslim süresi (acil işler ek planlama gerektirir)',
    ],
    process: [
      'Çizim veya modelinizi ve teslim tarihinizi gönderirsiniz.',
      'Dosyaları inceler, ölçek ve kapsamı netleştirir, yazılı teklif hazırlarız.',
      'Kapsam, fiyat ve teslim tarihi onaylandıktan sonra üretim planlanır.',
      'Üretim sırasında gerekirse ara fotoğraf paylaşılır; teslim öncesi kontrol yapılır.',
      'Maket elden teslim edilir veya uygun ambalajla gönderilir.',
    ],
    faqs: [
      {
        q: 'Elimde sadece 2D çizim var, maket yapılabilir mi?',
        a: 'Evet. Plan, kesit ve görünüşler yeterince netse maket 2D çizimlerden üretilebilir. Eksik ölçüler varsa teklif öncesi size sorarız.',
      },
      {
        q: 'Jüriye yetişmesi gereken bir maket için ne kadar önceden yazmalıyım?',
        a: 'Mümkün olduğunca erken. Süre; ölçek, detay ve o haftaki üretim yoğunluğuna bağlıdır. Dosyalarınızı gönderdiğinizde teslim tarihine yetişip yetişemeyeceğimizi açıkça söyleriz.',
      },
      {
        q: 'Maketi ben tasarlamadan sizden tasarım isteyebilir miyim?',
        a: 'Hayır. Akademik projelerde tasarım öğrenciye aittir; biz sizin tasarımınızı fiziksel olarak üretiriz.',
      },
      {
        q: 'Maket kargo ile gönderilebilir mi?',
        a: 'Ölçüye ve kırılganlığa göre değişir. Hassas maketlerde elden teslim öneririz; gönderim seçeneği teklifte belirtilir.',
      },
    ],
    related: ['3d-baski', '3d-modelleme', 'ofislere-ozel-uretim'],
    waMessage: 'Merhaba, mimari maket üretimi için teklif almak istiyorum.',
  },
  {
    slug: '3d-baski',
    active: true,
    title: '3D Baskı ve Prototipleme',
    short: 'Maket parçaları, ürün prototipleri ve tekrar eden parçalar için 3D baskı.',
    metaTitle: '3D Baskı ve Prototipleme İstanbul | Studio 4.17',
    metaDescription:
      "İstanbul'da maket parçası, ürün prototipi ve küçük seri 3D baskı. STL, OBJ veya 3MF dosyanızı yükleyip otomatik ön tahmin alın, kesin fiyatı teklifle netleştirin.",
    h1: '3D baskı ve prototipleme',
    lead:
      'Mimari maket parçalarından ürün prototiplerine kadar, dosyanızı baskıya uygunluk açısından kontrol edip üretiyoruz.',
    image: '/images/hero.png',
    imageAlt: 'Koyu zemin üzerinde beyaz katmanlı bir konut maketi (temsili görsel)',
    portfolioCategory: '3d-baski',
    intro: [
      'STL, OBJ veya 3MF dosyanızı fiyat hesaplama aracına yükleyerek hacme dayalı otomatik bir ön tahmin görebilirsiniz. Bu tahmin, kesin fiyat değildir: destek yapıları, baskı yönü ve yüzey işlemi dosya incelendikten sonra netleşir.',
      'Mimari maketlerde ince duvarlar, küçük detaylar ve ölçek küçültmesi baskı sorunlarına yol açabilir. Dosyanızı üretime uygun hale getirmek gerekiyorsa bunu teklifte ayrıca belirtiriz.',
    ],
    provide: [
      'STL, OBJ veya 3MF dosyası (mm biriminde)',
      'İstenen ölçek veya gerçek ölçü',
      'Malzeme ve renk tercihi',
      'Adet',
      'Yüzey beklentisi (ham baskı, zımpara, boya)',
    ],
    deliverables: [
      'Onaylanan dosyadan basılmış parça(lar)',
      'Destek yapılarının temizlenmesi',
      'Teklifte yer alıyorsa zımpara, astar veya boya',
    ],
    exclusions: [
      'Hatalı veya kapalı olmayan (non-manifold) modellerin ücretsiz onarımı',
      'Mekanik dayanım, gıda teması veya sertifika gerektiren parçalar için garanti',
      'Telif hakkı size ait olmayan modellerin basılması',
    ],
    specs: [
      { label: 'Otomatik tahmin', value: 'STL, OBJ, 3MF' },
      { label: 'Manuel teklif', value: 'STEP/STP ve diğer formatlar' },
      { label: 'Büyük parçalar', value: 'Tabla ölçüsünü aşan parçalar bölünerek basılabilir; teklifte teyit edilir' },
    ],
    priceFactors: [
      'Parça hacmi ve malzeme miktarı',
      'Baskı süresi ve katman yüksekliği',
      'Destek yapısı ihtiyacı',
      'Malzeme türü',
      'Adet',
      'Zımpara, boya ve montaj gibi son işlemler',
    ],
    process: [
      'Dosyanızı yüklersiniz; otomatik ön tahmin görürsünüz.',
      'Dosya baskıya uygunluk açısından incelenir.',
      'Kesin fiyat ve teslim tarihi yazılı olarak iletilir.',
      'Onay sonrası baskı ve son işlemler yapılır.',
      'Parçalar elden teslim edilir veya gönderilir.',
    ],
    faqs: [
      {
        q: 'Hesaplama aracındaki fiyat kesin mi?',
        a: 'Hayır. Araç, model hacmine dayalı otomatik bir ön tahmin verir. Kesin fiyat, dosya incelendikten sonra yazılı teklifle belirlenir.',
      },
      {
        q: 'STEP dosyası gönderebilir miyim?',
        a: 'Evet, ancak STEP dosyaları tarayıcıda analiz edilemediği için otomatik tahmin gösterilmez. Dosyayı teklif formuyla gönderin, manuel olarak değerlendirelim.',
      },
      {
        q: 'Modelim baskıya uygun değilse ne olur?',
        a: 'Sorunları (ince duvar, açık yüzey, çok küçük detay) size bildiririz. Düzeltmeyi siz yapabilirsiniz ya da dosya hazırlığını ayrı bir hizmet olarak fiyatlandırabiliriz.',
      },
    ],
    related: ['mimari-maket', '3d-modelleme', 'ofislere-ozel-uretim'],
    waMessage: 'Merhaba, 3D baskı için teklif almak istiyorum.',
  },
  {
    slug: 'mimari-gorsellestirme',
    active: true,
    title: 'Mimari Görselleştirme',
    short: 'Sunum, jüri ve pazarlama için iç ve dış mekân render çalışmaları.',
    metaTitle: 'Mimari Görselleştirme ve Render İstanbul | Studio 4.17',
    metaDescription:
      'Mimari projeleriniz için iç ve dış mekân render ve sunum görselleri. Modelinizi ve referanslarınızı gönderin, görsel sayısı ve çözünürlüğe göre teklif alın.',
    h1: 'Mimari görselleştirme ve render',
    lead:
      'Hazır 3D modelinizden ya da çizimlerinizden, projenin fikrini net anlatan sunum görselleri hazırlıyoruz.',
    image: '/images/project-interior.png',
    imageAlt: 'Ahşap mobilyalı, geniş camlı brüt beton bir iç mekân render görseli (temsili görsel)',
    portfolioCategory: 'gorsellestirme',
    intro: [
      'İyi bir mimari görsel projeyi süslemez, okutur. Kamera açılarını, ışığı ve malzemeleri projenin ana fikrini öne çıkaracak şekilde birlikte belirleriz.',
      'Teklif; görsel sayısı, çözünürlük, modelin hazır olup olmadığı ve revizyon hakkına göre hazırlanır.',
    ],
    provide: [
      '3D model (SKP, 3DM, FBX, OBJ, RVT dışa aktarımı) veya plan/kesit/görünüşler',
      'Kamera açıları için eskiz veya referans görseller',
      'Malzeme ve atmosfer referansları',
      'Görsel sayısı, çözünürlük ve kullanım amacı (pafta, sunum, sosyal medya)',
    ],
    deliverables: [
      'Onaylanan sayıda ve çözünürlükte görsel (JPG/PNG)',
      'Teklifte belirtilen sayıda revizyon turu',
    ],
    exclusions: [
      'Tasarım kararlarının sizin yerinize verilmesi',
      'Animasyon ve video (ayrıca konuşulur)',
      'Teklifte belirtilenden fazla revizyon',
    ],
    specs: [
      { label: 'Teslim formatı', value: 'JPG / PNG, istenen çözünürlükte' },
      { label: 'Revizyon', value: 'Revizyon sayısı teklifte yazılı olarak belirtilir' },
    ],
    priceFactors: [
      'Görsel sayısı ve çözünürlük',
      '3D modelin hazır olup olmadığı',
      'Sahne karmaşıklığı (peyzaj, insan, mobilya yoğunluğu)',
      'Revizyon sayısı',
      'Teslim süresi',
    ],
    process: [
      'Model veya çizimleri ve referansları gönderirsiniz.',
      'Kapsam, görsel sayısı ve revizyon hakkı netleşir; teklif iletilir.',
      'Kamera açıları için önizleme paylaşılır ve onayınız alınır.',
      'Final görseller üretilir, varsa revizyonlar yapılır.',
      'Görseller dijital olarak teslim edilir.',
    ],
    faqs: [
      {
        q: '3D modelim yok, yine de render alabilir miyim?',
        a: 'Evet. Çizimlerinizden modelleme yapılabilir; bu durumda modelleme ayrıca fiyatlandırılır.',
      },
      {
        q: 'Kaç revizyon hakkım var?',
        a: 'Revizyon sayısı teklifte yazılı olarak belirtilir. Kamera açısını önizleme aşamasında onaylamanız sonraki revizyon ihtiyacını azaltır.',
      },
    ],
    related: ['3d-modelleme', 'teknik-destek', 'mimari-maket'],
    waMessage: 'Merhaba, mimari görselleştirme (render) için teklif almak istiyorum.',
  },
  {
    slug: '3d-modelleme',
    active: true,
    title: '3D Modelleme ve Üretim Dosyaları',
    short: 'Çizimlerden 3D model; baskıya ve maket üretimine hazır dosyalar.',
    metaTitle: '3D Modelleme ve Üretim Dosyası Hazırlama | Studio 4.17',
    metaDescription:
      '2D çizimlerden 3D modelleme, mevcut modellerin 3D baskıya ve maket üretimine hazırlanması. Dosyalarınızı gönderin, kapsama göre teklif alın.',
    h1: '3D modelleme ve dijital üretim dosyaları',
    lead:
      'Çizimlerinizi 3D modele dönüştürüyor, mevcut modellerinizi baskıya ve maket üretimine uygun hale getiriyoruz.',
    image: '/images/project-residential.png',
    imageAlt: 'Yamaçta, havuzlu beyaz bir konut render görseli (temsili görsel)',
    portfolioCategory: 'modelleme',
    intro: [
      'Tasarım modelleri genellikle üretim için hazırlanmaz: açık yüzeyler, sıfır kalınlıklı duvarlar ve ölçek küçültüldüğünde kaybolan detaylar sık görülür.',
      'Modelinizi ölçeğe göre kalınlaştırır, parçalara ayırır ve baskıya ya da kesime uygun dosyalar hazırlarız. Tasarım kararlarına dokunmayız; gerekirse sorarız.',
    ],
    provide: [
      'Plan, kesit, görünüş (DWG/PDF) veya mevcut 3D model',
      'Hedef ölçek ve kullanım amacı (baskı, maket, render)',
      'Varsa kullanılacak yazılım/format tercihi',
    ],
    deliverables: [
      'İstenen formatta 3D model (3DM, SKP, OBJ, STL vb.)',
      'Baskıya hazırlanan parçalar ve parça listesi (kapsamdaysa)',
    ],
    exclusions: [
      'Tasarımın sizin yerinize geliştirilmesi',
      'Statik, mekanik veya mühendislik hesabı',
    ],
    specs: [
      { label: 'Girdi', value: 'DWG, DXF, PDF, 3DM, SKP, OBJ, STL' },
      { label: 'Çıktı', value: '3DM, SKP, OBJ, STL, 3MF — talebe göre' },
    ],
    priceFactors: [
      'Model alanı ve detay seviyesi',
      'Çizimlerin netliği ve eksik bilgi',
      'Hedef ölçek ve üretim yöntemi',
      'Teslim süresi',
    ],
    process: [
      'Çizim veya modelinizi ve hedefinizi paylaşırsınız.',
      'Dosyaları inceler, eksikleri ve kapsamı netleştiririz.',
      'Teklif onaylandıktan sonra modelleme yapılır.',
      'Ara kontrol için ekran görüntüleri paylaşılır.',
      'Dosyalar istenen formatta teslim edilir.',
    ],
    faqs: [
      {
        q: 'Rhino veya SketchUp modelimi 3D baskıya hazırlar mısınız?',
        a: 'Evet. Model ölçeğe göre kontrol edilir; ince duvarlar, açık yüzeyler ve parça bölümleri düzeltilerek baskıya hazır dosya hazırlanır.',
      },
      {
        q: 'Dosyalarım gizli kalır mı?',
        a: 'Dosyalarınız yalnızca teklif ve üretim amacıyla kullanılır, izniniz olmadan paylaşılmaz veya portfolyoda yayınlanmaz.',
      },
    ],
    related: ['3d-baski', 'mimari-maket', 'mimari-gorsellestirme'],
    waMessage: 'Merhaba, 3D modelleme / üretim dosyası hazırlığı için teklif almak istiyorum.',
  },
  {
    slug: 'teknik-destek',
    active: true,
    title: 'Proje Geliştirme ve Teknik Destek',
    short: 'Pafta düzeni, teknik çizim ve sunum hazırlığında teknik destek.',
    metaTitle: 'Mimari Proje Teknik Destek ve Pafta Hazırlığı | Studio 4.17',
    metaDescription:
      'Teknik çizim düzenleme, pafta düzeni, dosya hazırlığı ve sunum teknikleri konusunda mimarlık öğrencileri ve ofisler için teknik destek.',
    h1: 'Mimari proje geliştirme ve teknik destek',
    lead:
      'Tasarımınız size ait kalır. Biz çizim düzeni, pafta yerleşimi, dosya hazırlığı ve sunum teknikleri gibi teknik konularda destek veririz.',
    image: '/images/project-cultural.png',
    imageAlt: 'Kamusal meydanı olan köşeli bir kültür yapısı render görseli (temsili görsel)',
    portfolioCategory: 'akademik',
    intro: [
      'Akademik çalışmalarda dürüstlük önemlidir: tasarım fikri ve kararları öğrenciye aittir. Bu nedenle sizin yerinize proje tasarlamıyor, ödev teslim etmiyoruz.',
      'Destek verdiğimiz konular teknik ve üretim odaklıdır: çizimlerin standartlara uygun düzenlenmesi, katman ve çizgi kalınlığı düzeni, pafta yerleşimi, modelin sunuma ve üretime hazırlanması ve yazılım kullanımı.',
      'Mimarlık ofisleri için ise teslim yoğunluğu dönemlerinde çizim düzenleme ve sunum hazırlığı desteği sunarız.',
    ],
    provide: [
      'Mevcut çizimleriniz veya modeliniz',
      'Desteğin konusu (pafta düzeni, çizim standardı, dosya hazırlığı vb.)',
      'Varsa ders/ofis şablonları ve teslim kuralları',
      'Teslim tarihi',
    ],
    deliverables: [
      'Düzenlenmiş çizim/pafta dosyaları veya birebir çalışma oturumu — kapsama göre',
      'Yapılan değişikliklerin kısa açıklaması',
    ],
    exclusions: [
      'Tasarım fikrinin veya projenin sizin yerinize üretilmesi',
      'Ödev, sınav veya jüri teslimlerinin sizin adınıza yapılması',
      'Ruhsat projesi veya imza gerektiren resmi işler',
    ],
    specs: [
      { label: 'Yazılımlar', value: 'AutoCAD, Rhino, SketchUp ve sunum araçları — talebe göre teyit edilir' },
      { label: 'Çalışma şekli', value: 'Dosya üzerinden veya birebir çalışma oturumu' },
    ],
    priceFactors: [
      'Pafta veya çizim sayısı',
      'Mevcut dosyaların düzeni',
      'Oturum süresi',
      'Teslim süresi',
    ],
    process: [
      'Mevcut durumunuzu ve ihtiyacınızı anlatırsınız.',
      'Desteğin kapsamı ve sınırları netleştirilir; teklif iletilir.',
      'Dosya üzerinden ya da birlikte çalışılır.',
      'Düzenlenmiş dosyalar ve notlar teslim edilir.',
    ],
    faqs: [
      {
        q: 'Projemi sizin çizmenizi isteyebilir miyim?',
        a: 'Akademik projelerde hayır. Tasarım ve teslim öğrenciye aittir. Teknik düzenleme, üretim ve sunum hazırlığında destek veririz.',
      },
      {
        q: 'Ofisler için çizim desteği veriyor musunuz?',
        a: 'Evet, teknik çizim düzenleme ve sunum hazırlığı gibi konularda kapsamı belirlenmiş işler alıyoruz. Ruhsat ve imza gerektiren işler kapsam dışıdır.',
      },
    ],
    related: ['3d-modelleme', 'mimari-gorsellestirme', 'mimari-maket'],
    waMessage: 'Merhaba, mimari proje teknik destek konusunda bilgi almak istiyorum.',
  },
  {
    slug: 'ofislere-ozel-uretim',
    active: true,
    title: 'Mimarlık Ofislerine Özel Üretim',
    short: 'Sunum maketleri, prototipler ve tekrar eden üretim işleri için sürekli destek.',
    metaTitle: 'Mimarlık Ofisleri için Maket ve Üretim Desteği | Studio 4.17',
    metaDescription:
      "İstanbul'daki mimarlık, iç mimarlık ve tasarım ofisleri için sunum maketi, prototip ve tekrar eden üretim desteği. Proje bazlı veya düzenli çalışma için teklif alın.",
    h1: 'Mimarlık ve tasarım ofislerine özel üretim',
    lead:
      'Yarışma ve müşteri sunumları, satış ofisi maketleri ve ürün prototipleri için proje bazlı ya da düzenli üretim desteği.',
    image: '/images/project-model.png',
    imageAlt: 'Peyzajlı bir çok katlı yapı maketi (temsili görsel)',
    portfolioCategory: 'mimari-maket',
    intro: [
      'Ofislerin ihtiyacı genellikle nettir: doğru ölçekte, zamanında ve tutarlı kalitede üretim. Bu yüzden işe dosya akışını ve onay sürecini netleştirerek başlarız.',
      'Düzenli çalışmak isteyen ofislerle dosya formatı, iletişim kişisi ve teslim takvimi için ortak bir çalışma düzeni kurarız. Fatura, ödeme ve gizlilik koşulları teklif aşamasında yazılı olarak belirlenir.',
    ],
    provide: [
      'Proje dosyaları ve hedef ölçek',
      'Sunum tarihi ve teslim yeri',
      'Varsa kurumsal renk/malzeme standartları',
      'Gizlilik gereksinimleri',
    ],
    deliverables: [
      'Onaylanan kapsamda maket, prototip veya parçalar',
      'Üretim sırasında ara fotoğraf ve teslim öncesi kontrol',
    ],
    exclusions: [
      'Onaylanmamış kapsam değişiklikleri',
      'Teklifte yer almayan nakliye ve kurulum',
    ],
    specs: [
      { label: 'Çalışma modeli', value: 'Proje bazlı veya düzenli iş birliği' },
      { label: 'Gizlilik', value: 'Dosyalar izniniz olmadan paylaşılmaz; gerekirse gizlilik sözleşmesi konuşulur' },
    ],
    priceFactors: [
      'Kapsam ve ölçek',
      'Adet ve tekrar',
      'Teslim takvimi',
      'Nakliye ve kurulum ihtiyacı',
    ],
    process: [
      'Proje dosyalarını ve sunum tarihini paylaşırsınız.',
      'Fizibilite değerlendirmesi ve yazılı teklif hazırlanır.',
      'Kapsam, fiyat ve teslim koşulları onaylanır.',
      'Üretim ve kalite kontrol yapılır.',
      'Teslim veya kurulum gerçekleştirilir.',
    ],
    faqs: [
      {
        q: 'Gizlilik sözleşmesi imzalıyor musunuz?',
        a: 'Gerekli durumlarda gizlilik koşullarını teklif aşamasında konuşuyoruz. Dosyalarınız izniniz olmadan hiçbir yerde paylaşılmaz.',
      },
      {
        q: 'Düzenli çalışma için ne gerekiyor?',
        a: 'Bir iletişim kişisi, ortak dosya formatı ve teslim takvimi. İlk işte bu düzeni birlikte kurarız.',
      },
    ],
    related: ['mimari-maket', '3d-baski', 'mimari-gorsellestirme'],
    waMessage: 'Merhaba, ofisimiz için maket/üretim desteği hakkında görüşmek istiyoruz.',
  },
];

export const activeServices = services.filter((s) => s.active);

export function getService(slug) {
  return activeServices.find((s) => s.slug === slug) || null;
}

// Teklif formundaki hizmet seçenekleri (hizmet sayfalarıyla aynı kimlikler)
export const quoteServiceOptions = [
  ...activeServices.map((s) => ({ value: s.slug, label: s.title })),
  { value: 'diger', label: 'Diğer / emin değilim' },
];
