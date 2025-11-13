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
      en: 'Ñande IA - Paraguay Citizens AI Assistant',
      es: 'Ñande IA - Asistente IA para Ciudadanos Paraguayos'
    },
    description: {
      en: 'Personal hobby project designed to help Paraguayan citizens by providing an AI-powered platform for government document queries. Citizens can upload documents (PDFs, text) which are processed into embeddings via async cloud processing. Uses RAG (Retrieval-Augmented Generation) with OpenAI to provide instant answers about government procedures, women\'s rights, education, and other civic categories. Built to democratize access to government information.',
      es: 'Proyecto personal de hobby diseñado para ayudar a ciudadanos paraguayos mediante una plataforma IA para consultas sobre documentos gubernamentales. Los ciudadanos pueden subir documentos (PDFs, texto) que son procesados a embeddings mediante procesamiento asíncrono en la nube. Usa RAG (Generación Aumentada por Recuperación) con OpenAI para brindar respuestas instantáneas sobre trámites gubernamentales, derechos de la mujer, educación y otras categorías cívicas. Construido para democratizar el acceso a información gubernamental.'
    },
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'OpenAI API', 'Embeddings', 'RAG', 'Google Cloud', 'Vercel', 'Pub/Sub'],
    category: 'AI',
    featured: true,
    architecture: {
      en: 'Frontend (Next.js) → Backend API → PostgreSQL Vector DB → Google Cloud Pub/Sub → Async Embeddings Processing → Query Flow: DB Retrieval → OpenAI RAG → Response Generation → Frontend Display',
      es: 'Frontend (Next.js) → API Backend → PostgreSQL Vector DB → Google Cloud Pub/Sub → Procesamiento Async Embeddings → Flujo Consulta: Recuperación BD → OpenAI RAG → Generación Respuesta → Display Frontend'
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
  };

  // ArchitectureFlow (React Flow) will be rendered from an external component `ArchitectureFlow`.

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
              </div>
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
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Componente de Arquitectura Visual para Ñande IA
function NandeIAArchitecture({ language }: { language: string }) {
  const translate = (en: string, es: string) => language === 'en' ? en : es;

  return (
    <div className={styles.visualArchitecture}>
      {/* Frontend Layer */}
      <div className={styles.architectureLayer}>
        <h5 className={styles.layerTitle}>
          🌐 {translate('Frontend Layer', 'Capa Frontend')}
        </h5>
        <div className={styles.layerComponents}>
          <div className={styles.component}>
            📄 {translate('Document Upload', 'Subida Documentos')}
          </div>
          <div className={styles.component}>
            🔍 {translate('Search Interface', 'Interfaz Búsqueda')}
          </div>
          <div className={styles.component}>
            💬 {translate('AI Chat Interface', 'Interfaz Chat IA')}
          </div>
        </div>
        <div className={styles.techBadge}>Next.js + TypeScript</div>
      </div>

      <div className={styles.flowArrowDown}>↓</div>

      {/* Backend Layer */}
      <div className={styles.architectureLayer}>
        <h5 className={styles.layerTitle}>
          ⚙️ {translate('Backend Layer', 'Capa Backend')}
        </h5>
        <div className={styles.layerComponents}>
          <div className={styles.component}>
            🔗 {translate('API Endpoints', 'Endpoints API')}
          </div>
          <div className={styles.component}>
            📝 {translate('Document Processing', 'Procesamiento Docs')}
          </div>
          <div className={styles.component}>
            🤖 {translate('RAG Engine', 'Motor RAG')}
          </div>
        </div>
        <div className={styles.techBadge}>Node.js + API Routes</div>
      </div>

      <div className={styles.flowConnections}>
        <div className={styles.connectionLine}>
          <span className={styles.flowArrowRight}>→</span>
          <span className={styles.connectionLabel}>
            {translate('Async Processing', 'Procesamiento Async')}
          </span>
        </div>
        <div className={styles.connectionLine}>
          <span className={styles.flowArrowLeft}>←</span>
          <span className={styles.connectionLabel}>
            {translate('Query Retrieval', 'Recuperación Consulta')}
          </span>
        </div>
      </div>

      {/* Database & Cloud Services */}
      <div className={styles.servicesRow}>
        <div className={styles.serviceBox}>
          <h5 className={styles.serviceTitle}>
            🗄️ {translate('Database', 'Base de Datos')}
          </h5>
          <div className={styles.serviceComponents}>
            <div className={styles.serviceItem}>
              📊 {translate('Vector Embeddings', 'Embeddings Vectoriales')}
            </div>
            <div className={styles.serviceItem}>
              📋 {translate('Document Metadata', 'Metadata Documentos')}
            </div>
            <div className={styles.serviceItem}>
              👥 {translate('User Sessions', 'Sesiones Usuario')}
            </div>
          </div>
          <div className={styles.techBadge}>PostgreSQL + Vector Extensions</div>
        </div>

        <div className={styles.serviceBox}>
          <h5 className={styles.serviceTitle}>
            ☁️ {translate('Cloud Services', 'Servicios Cloud')}
          </h5>
          <div className={styles.serviceComponents}>
            <div className={styles.serviceItem}>
              📤 {translate('Pub/Sub Queue', 'Cola Pub/Sub')}
            </div>
            <div className={styles.serviceItem}>
              🧠 {translate('Embeddings Generation', 'Generación Embeddings')}
            </div>
            <div className={styles.serviceItem}>
              🔄 {translate('Async Workers', 'Workers Async')}
            </div>
          </div>
          <div className={styles.techBadge}>Google Cloud Platform</div>
        </div>
      </div>

      <div className={styles.flowArrowDown}>↓</div>

      {/* External AI Services */}
      <div className={styles.architectureLayer}>
        <h5 className={styles.layerTitle}>
          🤖 {translate('AI Services', 'Servicios IA')}
        </h5>
        <div className={styles.layerComponents}>
          <div className={styles.component}>
            💭 {translate('RAG Processing', 'Procesamiento RAG')}
          </div>
          <div className={styles.component}>
            🎯 {translate('Context Retrieval', 'Recuperación Contexto')}
          </div>
          <div className={styles.component}>
            ✨ {translate('Response Generation', 'Generación Respuestas')}
          </div>
        </div>
        <div className={styles.techBadge}>OpenAI GPT-4</div>
      </div>

      {/* Data Flow Indicators */}
      <div className={styles.dataFlows}>
        <div className={styles.flowIndicator}>
          <span className={styles.flowLabel}>
            📤 {translate('Upload Flow', 'Flujo Subida')}: 
          </span>
          <span className={styles.flowPath}>
            {translate('Frontend → Backend → Cloud Queue → Embeddings → Database', 
                      'Frontend → Backend → Cola Cloud → Embeddings → Base Datos')}
          </span>
        </div>
        <div className={styles.flowIndicator}>
          <span className={styles.flowLabel}>
            🔍 {translate('Query Flow', 'Flujo Consulta')}: 
          </span>
          <span className={styles.flowPath}>
            {translate('Search → Database Retrieval → OpenAI RAG → Response → Frontend',
                      'Búsqueda → Recuperación BD → OpenAI RAG → Respuesta → Frontend')}
          </span>
        </div>
      </div>
    </div>
  );
}