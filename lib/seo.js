import { site } from './site';

// Her sayfa için tutarlı başlık, açıklama, canonical ve Open Graph üretir.
export function pageMeta({ title, description, path, image, noindex = false }) {
  // Sayfa openGraph'ı kök düzeni tamamen ezdiği için varsayılan görsel burada da verilir.
  const images = [image ? { url: image, alt: title } : { url: '/og.jpg', width: 1200, height: 630, alt: site.name }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      images,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
