'use client';

import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [language, setLanguage] = useState('en');

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

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="#home" className={styles.logo}>
            MARCOS.DEV
          </a>
          <ul className={styles.navLinks}>
            <li><a href="#home">{translate('HOME', 'INICIO')}</a></li>
            <li><a href="#about">{translate('ABOUT', 'ACERCA')}</a></li>
            <li><a href="#experience">{translate('EXPERIENCE', 'EXPERIENCIA')}</a></li>
            <li><a href="#projects">{translate('PROJECTS', 'PROYECTOS')}</a></li>
            <li><a href="#contact">{translate('CONTACT', 'CONTACTO')}</a></li>
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
