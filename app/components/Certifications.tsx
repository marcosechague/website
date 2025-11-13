'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Certifications.module.css';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credentialId?: string;
  url: string;
  logo: string;
  skills?: string[];
}

export default function Certifications() {
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

  const certifications: Certification[] = [
    {
      id: '1',
      title: 'Generative AI for Software Development',
      issuer: 'DeepLearning.AI',
      issued: 'August 2025',
      credentialId: 'IBAN0YK52O44',
      url: 'https://www.coursera.org/account/accomplishments/specialization/IBAN0YK52O44',
      logo: '/certifications/deeplearning.jpg',
      skills: ['Generative AI', 'Software Development', 'Machine Learning']
    },
    {
      id: '2',
      title: 'Google AI Essentials',
      issuer: 'Google',
      issued: 'February 2025',
      url: 'https://www.credly.com/badges/5b1b4f1d-7ad9-4603-8979-e1d67baa1205/linked_in_profile',
      logo: '/certifications/google-ai.png',
      skills: ['Artificial Intelligence', 'Google AI', 'AI Fundamentals']
    },
    {
      id: '3',
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services (AWS)',
      issued: 'January 2021',
      credentialId: 'D0M8H5TLJB11QBG5',
      url: 'https://www.credly.com/badges/c6da955d-b14e-4c0a-8236-814923c71a81?source=linked_in_profile',
      logo: '/certifications/aws-ccp.png',
      skills: ['Cloud Computing', 'AWS', 'Cloud Architecture']
    },
    {
      id: '4',
      title: 'Oracle Certified Professional - Java Programmer SE 8',
      issuer: 'Oracle',
      issued: 'October 2018',
      url: 'https://www.credly.com/badges/fc6939c9-984f-4470-a46d-5fd2b1ddbc55',
      logo: '/certifications/ocp.png',
      skills: ['Java', 'Object-Oriented Programming', 'Advanced Java']
    },
    {
      id: '5',
      title: 'Oracle Certified Associate, Java SE 8 Programmer',
      issuer: 'Oracle',
      issued: 'July 2016',
      url: 'https://www.credly.com/badges/fc6939c9-984f-4470-a46d-5fd2b1ddbc55',
      logo: '/certifications/oca.png',
      skills: ['Java Fundamentals', 'Java SE 8', 'Programming']
    }
  ];

  return (
    <section id="certifications" className={styles.certifications}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.subtitle}>
            {translate('// Professional Development', '// Desarrollo Profesional')}
          </p>
          <h2 className={styles.title}>
            <span className={styles.bracket}>{'{ '}</span>
            {translate('Courses & Certifications', 'Cursos y Certificaciones')}
            <span className={styles.bracket}>{' }'}</span>
          </h2>
          <p className={styles.description}>
            {translate(
              'Continuous learning and professional development through industry-recognized certifications',
              'Aprendizaje continuo y desarrollo profesional a través de certificaciones reconocidas en la industria'
            )}
          </p>
        </motion.div>

        <div className={styles.certificationsGrid}>
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className={styles.certCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.credentialButton}
                title={translate('View credential', 'Ver credencial')}
              >
                {translate('View', 'Ver')} ↗
              </a>
              
              <div className={styles.certHeader}>
                <div className={styles.logoContainer}>
                  <Image
                    src={cert.logo}
                    alt={`${cert.issuer} logo`}
                    width={60}
                    height={60}
                    className={styles.logo}
                  />
                </div>
                <div className={styles.certInfo}>
                  <h3 className={styles.certTitle}>{cert.title}</h3>
                  <p className={styles.issuer}>{cert.issuer}</p>
                  <p className={styles.issued}>
                    {translate('Issued', 'Emitido')} {cert.issued}
                  </p>
                </div>
              </div>

              {cert.credentialId && (
                <p className={styles.credentialId}>
                  {translate('Credential ID:', 'ID de Credencial:')} {cert.credentialId}
                </p>
              )}

              {cert.skills && (
                <div className={styles.skills}>
                  <p className={styles.skillsLabel}>
                    {translate('Skills:', 'Habilidades:')}
                  </p>
                  <div className={styles.skillTags}>
                    {cert.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}