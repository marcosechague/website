'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DevZone.module.css';
import RequestFlow from './tech-demos/RequestFlow';
import SpringBootFlow from './tech-demos/SpringBootFlow'
import ApiBestPractices from './tech-demos/ApiBestPractices'
import ApiVersioning from './tech-demos/ApiVersioning'
import MicroservicesDemo from './tech-demos/MicroservicesDemo';
import DatabaseDemo from './tech-demos/DatabaseDemo';

type CategoryId = 'api-design' | 'architecture' | 'security' | 'database' | 'java';

interface TechDemo {
  id: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  component: React.ComponentType<{ language?: string }>;
}

interface Category {
  id: CategoryId;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  icon: string;
  color: string;
  demos: TechDemo[];
}

const categories: Category[] = [
  {
    id: 'api-design',
    title: {
      en: 'API Design',
      es: 'Diseño de APIs'
    },
    description: {
      en: 'REST API architecture, request flows, and best practices for scalable API development',
      es: 'Arquitectura REST API, flujos de peticiones y mejores prácticas para desarrollo escalable de APIs'
    },
    icon: '🔗',
    color: '#4CAF50',
    demos: [
      {
        id: 'request-flow',
        title: {
          en: 'API Request Flow',
          es: 'Flujo de Request API'
        },
        description: {
          en: 'Interactive visualization of how requests flow through backend layers',
          es: 'Visualización interactiva de cómo fluyen las requests a través de las capas backend'
        },
        difficulty: 'intermediate',
        component: RequestFlow
      },
      {
        id: 'spring-boot-flow',
        title: {
          en: 'Spring Boot Flow Animation',
          es: 'Animación de Flujo Spring Boot'
        },
        description: {
          en: 'Advanced GSAP animation showing request flow through Spring Boot architecture layers',
          es: 'Animación avanzada con GSAP mostrando el flujo de requests a través de las capas de arquitectura Spring Boot'
        },
        difficulty: 'advanced',
        component: SpringBootFlow
      },
      {
        id: 'api-best-practices',
        title: {
          en: 'API Best Practices',
          es: 'Mejores Prácticas de APIs'
        },
        description: {
          en: 'Comprehensive guide to RESTful API design patterns, HTTP methods, and URL conventions',
          es: 'Guía completa de patrones de diseño de APIs RESTful, métodos HTTP y convenciones de URLs'
        },
        difficulty: 'intermediate',
        component: ApiBestPractices
      },
      {
        id: 'api-versioning',
        title: {
          en: 'API Versioning Strategies',
          es: 'Estrategias de Versionado de APIs'
        },
        description: {
          en: 'Learn different API versioning approaches with pros/cons and Spring Boot implementations',
          es: 'Aprende diferentes enfoques de versionado de APIs con pros/contras e implementaciones Spring Boot'
        },
        difficulty: 'advanced',
        component: ApiVersioning
      }
    ]
  },
  {
    id: 'architecture',
    title: {
      en: 'Architecture',
      es: 'Arquitectura'
    },
    description: {
      en: 'System design patterns, microservices, and scalable architecture solutions',
      es: 'Patrones de diseño de sistemas, microservicios y soluciones de arquitectura escalable'
    },
    icon: '🏗️',
    color: '#2196F3',
    demos: [
      {
        id: 'microservices',
        title: {
          en: 'Microservices Architecture',
          es: 'Arquitectura de Microservicios'
        },
        description: {
          en: 'Explore distributed systems and service communication patterns',
          es: 'Explora sistemas distribuidos y patrones de comunicación entre servicios'
        },
        difficulty: 'advanced',
        component: MicroservicesDemo
      }
    ]
  },
  {
    id: 'security',
    title: {
      en: 'Security',
      es: 'Seguridad'
    },
    description: {
      en: 'Authentication, authorization, security best practices and enterprise security patterns',
      es: 'Autenticación, autorización, mejores prácticas de seguridad y patrones de seguridad empresarial'
    },
    icon: '🔐',
    color: '#FF9800',
    demos: [
      // Will add security demos later
    ]
  },
  {
    id: 'database',
    title: {
      en: 'Database',
      es: 'Base de Datos'
    },
    description: {
      en: 'Database operations, optimization, transactions and data modeling best practices',
      es: 'Operaciones de base de datos, optimización, transacciones y mejores prácticas de modelado de datos'
    },
    icon: '🗃️',
    color: '#9C27B0',
    demos: [
      {
        id: 'database-operations',
        title: {
          en: 'Database CRUD Operations',
          es: 'Operaciones CRUD de Base de Datos'
        },
        description: {
          en: 'Interactive demonstration of database operations and best practices',
          es: 'Demostración interactiva de operaciones de base de datos y mejores prácticas'
        },
        difficulty: 'beginner',
        component: DatabaseDemo
      }
    ]
  },
  {
    id: 'java',
    title: {
      en: 'Java & Spring',
      es: 'Java y Spring'
    },
    description: {
      en: 'Java development patterns, Spring Boot features, and enterprise Java best practices',
      es: 'Patrones de desarrollo Java, características de Spring Boot y mejores prácticas de Java empresarial'
    },
    icon: '☕',
    color: '#F44336',
    demos: [
      // Will add Java demos later
    ]
  }
];

export default function DevZone() {
  const [language, setLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null);
  const [selectedDemo, setSelectedDemo] = useState<TechDemo | null>(null);

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

  const handleCategorySelect = (categoryId: CategoryId) => {
    setSelectedCategory(categoryId);
    setSelectedDemo(null);
  };

  const handleDemoSelect = (demo: TechDemo) => {
    setSelectedDemo(demo);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedDemo(null);
  };

  const handleBackToCategory = () => {
    setSelectedDemo(null);
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className={styles.devZone}>

      {/* Categories Grid */}
      {!selectedCategory && (
        <motion.div
          className={styles.categoriesGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className={styles.categoryCard}
              style={{ '--category-color': category.color } as React.CSSProperties}
              onClick={() => handleCategorySelect(category.id)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: `0 15px 35px ${category.color}20` 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.categoryIcon}>{category.icon}</div>
              <h3>{category.title[language as keyof typeof category.title]}</h3>
              <p>{category.description[language as keyof typeof category.description]}</p>
              <div className={styles.categoryFooter}>
                <span className={styles.demoCount}>
                  {category.demos.length} {translate('demos', 'demos')}
                </span>
                <span className={styles.categoryArrow}>→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Category Details */}
      {selectedCategory && !selectedDemo && selectedCategoryData && (
        <motion.div
          className={styles.categoryDetails}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.categoryHeader}>
            <button 
              className={styles.backButton}
              onClick={handleBackToCategories}
            >
              ← {translate('Back to Categories', 'Volver a Categorías')}
            </button>
            <div 
              className={styles.categoryTitle}
              style={{ '--category-color': selectedCategoryData.color } as React.CSSProperties}
            >
              <span className={styles.categoryTitleIcon}>{selectedCategoryData.icon}</span>
              <h2>{selectedCategoryData.title[language as keyof typeof selectedCategoryData.title]}</h2>
            </div>
            <p className={styles.categoryDescription}>
              {selectedCategoryData.description[language as keyof typeof selectedCategoryData.description]}
            </p>
          </div>

          <div className={styles.demosGrid}>
            {selectedCategoryData.demos.map((demo, index) => (
              <motion.div
                key={demo.id}
                className={styles.demoCard}
                onClick={() => handleDemoSelect(demo)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.demoHeader}>
                  <h4>{demo.title[language as keyof typeof demo.title]}</h4>
                  <span className={`${styles.difficultyBadge} ${styles[demo.difficulty]}`}>
                    {translate(demo.difficulty, 
                      demo.difficulty === 'beginner' ? 'principiante' :
                      demo.difficulty === 'intermediate' ? 'intermedio' : 'avanzado'
                    )}
                  </span>
                </div>
                <p>{demo.description[language as keyof typeof demo.description]}</p>
                <div className={styles.demoFooter}>
                  <span className={styles.launchButton}>
                    {translate('Launch Demo', 'Lanzar Demo')} →
                  </span>
                </div>
              </motion.div>
            ))}
            
            {selectedCategoryData.demos.length === 0 && (
              <div className={styles.comingSoon}>
                <h4>🚧 {translate('Coming Soon!', '¡Próximamente!')}</h4>
                <p>
                  {translate(
                    'Exciting demos are being crafted for this category.',
                    'Se están creando demos emocionantes para esta categoría.'
                  )}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Demo View */}
      {selectedDemo && (
        <motion.div
          className={styles.demoView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.demoHeader}>
            <button 
              className={styles.backButton}
              onClick={handleBackToCategory}
            >
              ← {translate('Back to Category', 'Volver a Categoría')}
            </button>
            <h3>{selectedDemo.title[language as keyof typeof selectedDemo.title]}</h3>
          </div>
          <div className={styles.demoContainer}>
            <selectedDemo.component language={language} />
          </div>
        </motion.div>
      )}
    </div>
  );
}