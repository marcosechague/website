'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event: any) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translate = (english: string, spanish: string) => language === 'en' ? english : spanish;

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.codeBg}>
        {`// Backend Java Developer
public class Developer {
  private String name = "Marcos";
  private String[] skills = {"Java", "Spring Boot", "AI"};
}`}
      </div>
      <div className={styles.heroContent}>
        <p className={styles.heroTag}>
          {translate('< Hello World />', '< Hola Mundo />')}
        </p>
        <h1>MARCOS ECHAGUE</h1>
        <p className={styles.heroSubtitle}>
          {translate('Backend Java Developer | AI Enthusiast', 'Desarrollador Backend Java | Entusiasta de IA')}
        </p>
        <p className={styles.heroDescription}>
          {translate(
            'Building robust, scalable enterprise applications for Banking, Healthcare & E-commerce. Integrating AI-powered solutions with OpenAI, Tavus, and 11Labs to create innovative products.',
            'Construyendo aplicaciones empresariales robustas y escalables para Banca, Salud y E-commerce. Integrando soluciones impulsadas por IA con OpenAI, Tavus y 11Labs para crear productos innovadores.'
          )}
        </p>
        <div className={styles.ctaButtons}>
          <a href="#projects" className={styles.btn}>
            {translate('View Projects', 'Ver Proyectos')}
          </a>
          <a 
            href={language === 'en' ? '/resumes/Marcos_Echague_Resume_EN.pdf' : '/resumes/Marcos_Echague_Resume_ES.pdf'}
            download
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
            {translate('Download CV', 'Descargar CV')} 📄
          </a>
          <a href="#contact" className={`${styles.btn} ${styles.btnSecondary}`}>
            {translate('Get In Touch', 'Contáctame')}
          </a>
        </div>
      </div>
    </section>
  );
}
