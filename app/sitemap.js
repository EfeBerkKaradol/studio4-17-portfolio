import { absoluteUrl } from '@/lib/site';
import { activeServices } from '@/data/services';
import { projects, isSample } from '@/data/projects';

// Örnek (noindex) portfolyo kayıtları site haritasına eklenmez.
export default function sitemap() {
  const staticPages = [
    ['/', 1],
    ['/hizmetler', 0.9],
    ['/teklif-al', 0.9],
    ['/fiyat-hesaplama', 0.8],
    ['/ogrenciler', 0.8],
    ['/ofisler', 0.8],
    ['/portfolyo', 0.7],
    ['/surec', 0.6],
    ['/hakkimizda', 0.6],
    ['/iletisim', 0.6],
    ['/gizlilik', 0.2],
    ['/cerez-politikasi', 0.2],
    ['/kullanim-sartlari', 0.2],
  ];
  return [
    ...staticPages.map(([path, priority]) => ({ url: absoluteUrl(path), priority })),
    ...activeServices.map((s) => ({ url: absoluteUrl(`/hizmetler/${s.slug}`), priority: 0.9 })),
    ...projects.filter((p) => !isSample(p)).map((p) => ({ url: absoluteUrl(`/portfolyo/${p.slug}`), priority: 0.6 })),
  ];
}
