import Link from 'next/link';
import JsonLd from './JsonLd';
import { absoluteUrl } from '@/lib/site';
import styles from './Breadcrumbs.module.css';

// items: [{ label, href }] — son öğe mevcut sayfadır
export default function Breadcrumbs({ items }) {
  const all = [{ label: 'Ana Sayfa', href: '/' }, ...items];
  return (
    <>
      <nav aria-label="Konum" className={styles.nav}>
        <ol>
          {all.map((item, i) => (
            <li key={item.href}>
              {i < all.length - 1 ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.label,
            item: absoluteUrl(item.href),
          })),
        }}
      />
    </>
  );
}
