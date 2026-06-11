'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className="font-serif">STUDIO</span>4.17
        </Link>

        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.navOpen : ''}`}>
          <ul className={styles.navList}>
            <li><Link href="/" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Ana Sayfa</Link></li>
            <li><Link href="#hizmetler" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Uzmanlıklar</Link></li>
            <li><Link href="#projeler" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Projeler</Link></li>
            <li><Link href="#surec" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Süreç</Link></li>
            <li><Link href="#hakkimda" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>Hakkımda</Link></li>
            <li><Link href="#iletisim" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>İletişim</Link></li>
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
