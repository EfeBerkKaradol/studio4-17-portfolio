import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import MobileActionBar from '@/components/Contact/MobileActionBar';
import Tracking from '@/components/Tracking/Tracking';
import JsonLd from '@/components/Seo/JsonLd';
import { site, socialLinks } from '@/lib/site';
import './globals.css';

// latin-ext: ğ, ş, ı, İ gibi Türkçe karakterler için gerekli
const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['500'],
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Studio 4.17 | İstanbul Mimari Maket, 3D Baskı ve Görselleştirme',
    template: '%s',
  },
  description:
    "İstanbul'da mimarlık öğrencileri ve tasarım ofisleri için mimari maket üretimi, 3D baskı, görselleştirme ve teknik destek. Projenizi gönderin, yazılı teklif alın.",
  applicationName: site.name,
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Studio 4.17 — mimari maket ve 3D baskı' }],
  },
  twitter: { card: 'summary_large_image' },
  formatDetection: { telephone: false },
};

export const viewport = {
  themeColor: '#f6f3ee',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <a href="#icerik" className="skip-link">
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik">{children}</main>
        <Footer />
        <MobileActionBar />
        <Tracking />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: site.name,
            url: site.url,
            description: site.tagline,
            areaServed: { '@type': 'City', name: 'İstanbul' },
            ...(site.email ? { email: site.email } : {}),
            ...(site.phone ? { telephone: site.phone } : {}),
            ...(socialLinks.length ? { sameAs: socialLinks.map((s) => s.href) } : {}),
          }}
        />
      </body>
    </html>
  );
}
