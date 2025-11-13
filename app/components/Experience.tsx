'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Experience.module.css';

interface ExperienceItem {
  id: string;
  company: string;
  position: {
    en: string;
    es: string;
  };
  period: string;
  location: string;
  type: string;
  description: {
    en: string;
    es: string;
  };
  technologies: string[];
  projects?: {
    en: string[];
    es: string[];
  };
}

export default function Experience() {
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

  const experiences: ExperienceItem[] = [
    {
      id: 'ingenious',
      company: 'Ingenious Agency',
      position: {
        en: 'Software Engineer',
        es: 'Ingeniero de Software'
      },
      period: 'Jun 2022 - Present · 3 yrs 6 mos',
      location: 'Montevideo, Uruguay · Remote',
      type: 'Full-time',
      description: {
        en: 'Leading development of cutting-edge healthcare and AI applications. Healthcare real-time data capture and prediction system using Java Spring Boot with JOOQ. Recent work on Next.js serverless application with SST, PostgreSQL with vector embeddings, and AI integrations.',
        es: 'Liderando el desarrollo de aplicaciones de salud e IA de vanguardia. Sistema de captura y predicción de datos en tiempo real para healthcare usando Java Spring Boot con JOOQ. Trabajo reciente en aplicación serverless Next.js con SST, PostgreSQL con embeddings vectoriales, e integraciones de IA.'
      },
      technologies: ['Java', 'Spring Boot', 'JOOQ', 'Next.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis', 'OpenAI API', '11Labs', 'Tavus', 'AI'],
      projects: {
        en: [
          'Healthcare real-time data capture and prediction system',
          'AI-powered conversational platform with OpenAI, 11Labs, and Tavus',
          'Serverless Next.js application with vector embeddings',
          'Advanced prompt engineering and RAG implementation'
        ],
        es: [
          'Sistema de captura y predicción de datos en tiempo real para healthcare',
          'Plataforma conversacional impulsada por IA con OpenAI, 11Labs y Tavus',
          'Aplicación serverless Next.js con embeddings vectoriales',
          'Ingeniería de prompts avanzada e implementación RAG'
        ]
      }
    },
    {
      id: 'asepy',
      company: 'Asociación de Emprendedores de Paraguay (ASEPY)',
      position: {
        en: 'Back End Developer',
        es: 'Desarrollador Back End'
      },
      period: 'Feb 2021 - Jun 2022 · 1 yr 5 mos',
      location: 'Paraguay',
      type: 'Freelance',
      description: {
        en: 'Developed serverless backend solutions using AWS services for member management system of the entrepreneurship organization.',
        es: 'Desarrollo de backend serverless con servicios AWS para la administración de miembros de la organización emprendedora.'
      },
      technologies: ['Python', 'Java', 'Spring Boot', 'JPA', 'MySQL', 'AWS API Gateway', 'AWS Lambda', 'AWS SAM'],
    },
    {
      id: 'fintech-works',
      company: 'Fintech.works (Sodep S.A.)',
      position: {
        en: 'Senior Software Developer',
        es: 'Desarrollador Senior de Software'
      },
      period: 'Nov 2020 - Jun 2022 · 1 yr 8 mos',
      location: 'Paraguay',
      type: 'Full-time',
      description: {
        en: 'Backend development in microservices architecture and Android development for electronic wallet application.',
        es: 'Desarrollo backend en microservicios y Android para billetera electrónica.'
      },
      technologies: ['Java', 'Spring Framework', 'PostgreSQL', 'JPA', 'Kotlin', 'Microservices'],
    },
    {
      id: 'sodep',
      company: 'Sodep S.A.',
      position: {
        en: 'Senior Java Developer',
        es: 'Desarrollador Senior Java'
      },
      period: 'Jun 2019 - Jun 2022 · 3 yrs 1 mo',
      location: 'Paraguay',
      type: 'Full-time',
      description: {
        en: 'Developer and maintainer of ERP backend for a major national company dedicated to importing and distributing goods. Special attention to clean and efficient code development. E-commerce application development from open source fork.',
        es: 'Desarrollador y mantainer del backend de un ERP para una importante empresa nacional dedicada a la importación y distribución de mercancías. Atención especial al desarrollo con código limpio y eficiente. Desarrollador de aplicación ecommerce fork Open Source.'
      },
      technologies: ['Java', 'Spring Framework', 'Spring Boot', 'Spring Data', 'Spring AOP', 'Maven', 'Tomcat', 'Liquibase', 'PostgreSQL', 'Swagger', 'Elasticsearch', 'Docker', 'Jenkins', 'SonarQube'],
    },
    {
      id: 'bbva',
      company: 'BBVA',
      position: {
        en: 'Software Developer',
        es: 'Desarrollador de Software'
      },
      period: 'Oct 2018 - Jun 2019 · 9 mos',
      location: 'Paraguay',
      type: 'Full-time',
      description: {
        en: 'Development of new functionalities for Web Banking and other financial applications of the institution.',
        es: 'Desarrollo de nuevas funcionalidades para la Banca Web y otras aplicaciones financieras de la institución.'
      },
      technologies: ['Java', 'Spring Framework', 'Maven', 'Git', 'Oracle', 'HTML', 'CSS', 'JavaScript', 'Linux'],
    },
    {
      id: 'roshka',
      company: 'ROSHKA S.A.',
      position: {
        en: 'Java Software Developer',
        es: 'Desarrollador Java'
      },
      period: 'Oct 2015 - Oct 2018 · 3 yrs 1 mo',
      location: 'Paraguay',
      type: 'Full-time',
      description: {
        en: 'Development of APIs for transactional web applications in Java programming language. RESTful Web Services development, documentation, and testing. Management of Linux and Windows servers.',
        es: 'Desarrollo de APIs para aplicaciones web transaccionales en lenguaje Java. Desarrollo, documentación y testing de RESTful Web Services. Manejo de servidores Linux y Windows.'
      },
      technologies: ['Java', 'RESTful APIs', 'Web Services', 'Linux', 'Windows Server'],
    }
  ];

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.subtitle}>
            {translate('// Career Path', '// Trayectoria Profesional')}
          </p>
          <h2 className={styles.title}>
            <span className={styles.bracket}>{'{ '}</span>
            {translate('Experience', 'Experiencia')}
            <span className={styles.bracket}>{' }'}</span>
          </h2>
        </motion.div>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className={styles.timelineItem}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.timelineMarker}>
                <div className={styles.marker}></div>
                <div className={styles.line}></div>
              </div>
              
              <div className={styles.content}>
                <div className={styles.header}>
                  <div>
                    <h3 className={styles.position}>
                      {exp.position[language as keyof typeof exp.position]}
                    </h3>
                    <h4 className={styles.company}>{exp.company}</h4>
                    <div className={styles.meta}>
                      <span className={styles.period}>{exp.period}</span>
                      <span className={styles.type}>{exp.type}</span>
                      <span className={styles.location}>{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                <p className={styles.description}>
                  {exp.description[language as keyof typeof exp.description]}
                </p>

                {exp.projects && (
                  <div className={styles.projects}>
                    <h5>{translate('Key Projects:', 'Proyectos Principales:')}</h5>
                    <ul>
                      {exp.projects[language as keyof typeof exp.projects].map((project, idx) => (
                        <li key={idx}>{project}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className={styles.technologies}>
                  {exp.technologies.map((tech) => (
                    <span key={tech} className={styles.tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}