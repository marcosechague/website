'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Projects.module.css';

interface Project {
  id: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  technologies: string[];
  category: string;
  featured: boolean;
  architecture?: {
    en: string;
    es: string;
  };
}

const projects: Project[] = [
  {
    id: 'nande-ia',
    title: {
      en: 'Ñande IA - Paraguay Government AI Assistant',
      es: 'Ñande IA - Asistente IA del Gobierno Paraguayo'
    },
    description: {
      en: 'AI-powered platform that allows Paraguayan citizens to upload government documents (PDFs, text) which are processed into embeddings and stored in PostgreSQL. Uses RAG (Retrieval-Augmented Generation) with OpenAI to provide instant answers about government procedures, women\'s rights, education, and other civic categories. Features asynchronous document processing and intelligent prompting for accurate citizen assistance.',
      es: 'Plataforma impulsada por IA que permite a ciudadanos paraguayos subir documentos gubernamentales (PDFs, texto) que son procesados en embeddings y almacenados en PostgreSQL. Usa RAG (Generación Aumentada por Recuperación) con OpenAI para brindar respuestas instantáneas sobre trámites gubernamentales, derechos de la mujer, educación y otras categorías cívicas. Incluye procesamiento asíncrono de documentos y prompting inteligente para asistencia ciudadana precisa.'
    },
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'OpenAI API', 'Embeddings', 'RAG', 'Google Cloud', 'Vercel'],
    category: 'AI/Machine Learning',
    featured: true,
    architecture: {
      en: 'Document Upload → PDF Processing → Text Extraction → Embeddings Generation → PostgreSQL Vector Storage → RAG Query Processing → OpenAI Response → User Interface',
      es: 'Subida de Documentos → Procesamiento PDF → Extracción de Texto → Generación de Embeddings → Almacenamiento Vectorial PostgreSQL → Procesamiento RAG → Respuesta OpenAI → Interfaz de Usuario'
    }
  },
  {
    id: 'realtime-tracking',
    title: {
      en: 'Real-Time Vehicle Tracking System',
      es: 'Sistema de Rastreo Vehicular en Tiempo Real'
    },
    description: {
      en: 'Real-time vehicle tracking system built with Strapi CMS providing RESTful APIs to capture and store vehicle coordinates during trips. Features live map visualization using Leaflet with real-time position updates. Ideal for fleet management, delivery tracking, and logistics optimization with PostgreSQL for reliable data storage.',
      es: 'Sistema de rastreo vehicular en tiempo real construido con Strapi CMS que provee APIs RESTful para capturar y almacenar coordenadas de vehículos durante viajes. Incluye visualización en mapa en vivo usando Leaflet con actualizaciones de posición en tiempo real. Ideal para gestión de flotas, seguimiento de entregas y optimización logística con PostgreSQL para almacenamiento confiable de datos.'
    },
    technologies: ['React', 'TypeScript', 'Strapi', 'PostgreSQL', 'Leaflet', 'REST API', 'Real-time WebSockets'],
    category: 'Real-time Systems',
    featured: true,
    architecture: {
      en: 'Vehicle GPS → API Endpoints → Strapi CMS → PostgreSQL Database → WebSocket Connection → Leaflet Map → Real-time Visualization',
      es: 'GPS Vehicular → Endpoints API → Strapi CMS → Base de Datos PostgreSQL → Conexión WebSocket → Mapa Leaflet → Visualización en Tiempo Real'
    }
  }
];

export default function Projects() {
  const [language, setLanguage] = useState('en');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showArchitecture, setShowArchitecture] = useState<string | null>(null);

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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setShowArchitecture(null);
  };

  const toggleArchitecture = (projectId: string) => {
    setShowArchitecture(showArchitecture === projectId ? null : projectId);
  };

  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.subtitle}>
            {translate('// My Work', '// Mi Trabajo')}
          </p>
          <h2 className={styles.title}>
            <span className={styles.bracket}>{'{ '}</span>
            {translate('Projects', 'Proyectos')}
            <span className={styles.bracket}>{' }'}</span>
          </h2>
          <p className={styles.description}>
            {translate(
              'Featured projects showcasing my expertise in AI, real-time systems, and enterprise applications.',
              'Proyectos destacados que muestran mi experiencia en IA, sistemas en tiempo real y aplicaciones empresariales.'
            )}
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project)}
            >
              <div className={styles.projectHeader}>
                <h3 className={styles.projectTitle}>
                  {project.title[language as keyof typeof project.title]}
                </h3>
                <span className={styles.categoryBadge}>{project.category}</span>
              </div>
              
              <p className={styles.projectDescription}>
                {project.description[language as keyof typeof project.description].substring(0, 150)}...
              </p>

              <div className={styles.techStack}>
                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                  <span key={techIndex} className={styles.techTag}>{tech}</span>
                ))}
                {project.technologies.length > 4 && (
                  <span className={styles.techTag}>+{project.technologies.length - 4}</span>
                )}
              </div>

              <div className={styles.projectActions}>
                <button 
                  className={styles.viewMoreBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project);
                  }}
                >
                  {translate('View Details', 'Ver Detalles')} →
                </button>
                {project.architecture && (
                  <button 
                    className={styles.architectureBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleArchitecture(project.id);
                    }}
                  >
                    {translate('Architecture', 'Arquitectura')} 🏗️
                  </button>
                )}
              </div>

              <AnimatePresence>
                {showArchitecture === project.id && project.architecture && (
                  <motion.div
                    className={styles.architectureFlow}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className={styles.architectureTitle}>
                      {translate('System Architecture', 'Arquitectura del Sistema')}
                    </h4>
                    <div className={styles.flowDiagram}>
                      {project.architecture[language as keyof typeof project.architecture]
                        .split(' → ')
                        .map((step, stepIndex, array) => (
                          <div key={stepIndex} className={styles.flowStep}>
                            <span className={styles.stepBox}>{step}</span>
                            {stepIndex < array.length - 1 && (
                              <span className={styles.flowArrow}>→</span>
                            )}
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className={styles.closeBtn} onClick={closeModal}>×</button>
                
                <div className={styles.modalHeader}>
                  <h3 className={styles.modalTitle}>
                    {selectedProject.title[language as keyof typeof selectedProject.title]}
                  </h3>
                  <span className={styles.modalCategory}>{selectedProject.category}</span>
                </div>

                <div className={styles.modalBody}>
                  <p className={styles.modalDescription}>
                    {selectedProject.description[language as keyof typeof selectedProject.description]}
                  </p>

                  <div className={styles.modalTechStack}>
                    <h4>{translate('Technologies Used:', 'Tecnologías Utilizadas:')}</h4>
                    <div className={styles.modalTechGrid}>
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className={styles.modalTechTag}>{tech}</span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.architecture && (
                    <div className={styles.modalArchitecture}>
                      <h4>{translate('System Architecture Flow:', 'Flujo de Arquitectura del Sistema:')}</h4>
                      <div className={styles.modalFlowDiagram}>
                        {selectedProject.architecture[language as keyof typeof selectedProject.architecture]
                          .split(' → ')
                          .map((step, stepIndex, array) => (
                            <div key={stepIndex} className={styles.modalFlowStep}>
                              <div className={styles.modalStepBox}>{step}</div>
                              {stepIndex < array.length - 1 && (
                                <div className={styles.modalFlowArrow}>↓</div>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}