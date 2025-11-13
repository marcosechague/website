'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [language, setLanguage] = useState('en');
  const pathname = usePathname();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    
    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  const translate = (english: string, spanish: string) => language === 'en' ? english : spanish;

  // Function to handle navigation clicks
  const handleNavClick = (targetId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If we're in DevZone, navigate to main page with anchor
    if (pathname === '/devzone') {
      window.location.href = `/${targetId}`;
    } else {
      // If we're on main page, smooth scroll to section
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a 
            href="#home" 
            className={styles.logo}
            onClick={handleNavClick('#home')}
          >
            MARCOS.DEV
          </a>
          <ul className={styles.navLinks}>
            <li><a href="#home" onClick={handleNavClick('#home')}>{translate('HOME', 'INICIO')}</a></li>
            <li><a href="#about" onClick={handleNavClick('#about')}>{translate('ABOUT', 'ACERCA')}</a></li>
            <li>
              <a 
                href="/devzone" 
                className={styles.navLink}
                title={language === 'en' ? 'Visit DevZone - Technical Playground' : 'Visitar DevZone - Playground Técnico'}
              >
                DevZone
              </a>
            </li>
            <li><a href="#experience" onClick={handleNavClick('#experience')}>{translate('EXPERIENCE', 'EXPERIENCIA')}</a></li>
            <li><a href="#certifications" onClick={handleNavClick('#certifications')}>{translate('CERTIFICATIONS', 'CERTIFICACIONES')}</a></li>
            <li><a href="#projects" onClick={handleNavClick('#projects')}>{translate('PROJECTS', 'PROYECTOS')}</a></li>
            <li><a href="#contact" onClick={handleNavClick('#contact')}>{translate('CONTACT', 'CONTACTO')}</a></li>
          </ul>
        </nav>
      </header>

      <div className={styles.languageSelector}>
        <button 
          className={`${styles.languageButton} ${language === 'en' ? styles.active : ''}`}
          onClick={() => changeLanguage('en')}
        >
          EN
        </button>
        <button 
          className={`${styles.languageButton} ${language === 'es' ? styles.active : ''}`}
          onClick={() => changeLanguage('es')}
        >
          ES
        </button>
      </div>
    </>
  );
}
