'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNav } from '@/lib/site';
import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sayfa değişince menüyü kapat
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={`${styles.header} ${scrolled || open ? styles.solid : ''}`}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="Studio 4.17 ana sayfa">
          <span className="font-serif">STUDIO</span>
          <span className={styles.logoNum}>4.17</span>
        </Link>

        <nav aria-label="Ana menü" className={styles.desktopNav}>
          <ul>
            {mainNav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${isActive(item.href) ? styles.active : ''}`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/teklif-al" className={`btn btn-accent ${styles.cta}`}>
            Teklif Al
          </Link>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">{open ? 'Menüyü kapat' : 'Menüyü aç'}</span>
            <span className={`${styles.burger} ${open ? styles.burgerOpen : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.mobileMenu} hidden={!open}>
        <nav aria-label="Mobil menü" className="container">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.mobileLink} ${isActive(item.href) ? styles.active : ''}`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/fiyat-hesaplama" className={styles.mobileLink}>
                3D Baskı Fiyat Tahmini
              </Link>
            </li>
          </ul>
          <Link href="/teklif-al" className="btn btn-accent btn-block">
            Teklif Al
          </Link>
        </nav>
      </div>
    </header>
  );
}
