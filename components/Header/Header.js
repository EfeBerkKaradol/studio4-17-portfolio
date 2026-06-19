'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { projects } from '@/data/projects';
import styles from './Header.module.css';

const navItems = [
  { label: 'Ana Sayfa', href: '/' },
  {
    label: 'Portfolyo',
    href: '/portfolyo',
    children: projects.map(p => ({ label: p.title, href: `/projeler/${p.id}` }))
  },
  { label: 'Süreç', href: '/surec' },
  { label: 'Fiyat Hesapla', href: '/fiyat-hesaplama' },
  { label: 'Hakkımda', href: '/hakkimda' },
  { label: 'İletişim', href: '/iletisim' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className="font-serif">STUDIO</span>4.17
        </Link>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`} ref={dropdownRef}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                {item.children ? (
                  <>
                    <button
                      className={`${styles.navLink} ${pathname.startsWith(item.href) || pathname.startsWith('/projeler') ? styles.active : ''}`}
                      onClick={() => setOpenDropdown(openDropdown === item.href ? null : item.href)}
                    >
                      {item.label}
                      <svg className={`${styles.chevron} ${openDropdown === item.href ? styles.chevronOpen : ''}`} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                    <div className={`${styles.dropdown} ${openDropdown === item.href ? styles.dropdownOpen : ''}`}>
                      <Link href={item.href} className={styles.dropdownLink}>
                        Tüm Projeler
                      </Link>
                      <div className={styles.dropdownDivider}></div>
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} className={styles.dropdownLink}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menüyü aç/kapat"
        >
          <span className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}></span>
        </button>
      </div>
    </header>
  );
}
