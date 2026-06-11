export const projects = [
  {
    id: "vadi-konaklari",
    title: "Vadi Konakları",
    category: "Konut Mimarisi",
    description: "Doğa ile iç içe, modern ve sürdürülebilir yaşam alanı tasarımı. Doğal ışık maksimizasyonu ve pasif iklimlendirme sistemleri ön planda tutuldu.",
    image: "/images/project-residential.png",
    featured: true
  },
  {
    id: "modern-sanat-muzesi",
    title: "Modern Sanat Müzesi",
    category: "Kültürel Yapı",
    description: "Şehrin merkezinde dinamik formuyla dikkat çeken, sergi alanları ve kamusal açık alanlarıyla yeni bir çekim merkezi.",
    image: "/images/project-cultural.png",
    featured: false
  },
  {
    id: "minimalist-loft",
    title: "Minimalist Loft İç Mekan",
    category: "İç Mimari",
    description: "Eski bir fabrika binasının modern bir yaşam alanına dönüştürülmesi projesi. Brüt beton ve doğal ahşap harmonisi.",
    image: "/images/project-interior.png",
    featured: false
  },
  {
    id: "yesil-mahalle-masterplan",
    title: "Yeşil Mahalle Masterplan",
    category: "Kentsel Tasarım",
    description: "Sıfır karbon hedefiyle tasarlanmış, yaya odaklı ve kendi enerjisini üreten yeni nesil mahalle konsepti.",
    image: "/images/project-urban.png",
    featured: true
  }
];

export const categories = [
  {
    id: "mimari-projeler",
    number: "01",
    title: "Mimari Projeler",
    description: "Öğrencilik hayatım boyunca tasarladığım konut, kamu ve karma kullanımlı yapı projeleri. Her projede bağlam, sürdürülebilirlik ve insan ölçeği ön planda tutuldu.",
    linkUrl: "/projeler?kategori=mimari",
    images: [
      { src: "/images/hero.png", label: "Sahil Rezidans Maketi" },
      { src: "/images/project-residential.png", label: "Vadi Konakları" },
      { src: "/images/project-cultural.png", label: "Kültür Merkezi" }
    ]
  },
  {
    id: "maket-ve-cizimler",
    number: "02",
    title: "Maketler & Teknik Çizimler",
    description: "Tasarımların 3 boyutlu algısını güçlendiren çalışma maketleri ve projenin dilini anlatan kavramsal eskizler, teknik detay çözümleri.",
    linkUrl: "/projeler?kategori=maket",
    images: [
      { src: "/images/project-model.png", label: "Konsept Çalışma Maketi" },
      { src: "/images/project-interior.png", label: "İç Mekan Detayı" },
      { src: "/images/project-urban.png", label: "Vaziyet Planı" }
    ]
  }
];
