'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './MicroservicesDemo.module.css';

const services = [
  {
    id: 'auth',
    name: { en: 'Auth Service', es: 'Servicio de Auth' },
    port: '8081',
    color: '#ff6b6b',
    icon: '🔐'
  },
  {
    id: 'user',
    name: { en: 'User Service', es: 'Servicio de Usuario' },
    port: '8082',
    color: '#4ecdc4',
    icon: '👤'
  },
  {
    id: 'payment',
    name: { en: 'Payment Service', es: 'Servicio de Pago' },
    port: '8083',
    color: '#45b7d1',
    icon: '💳'
  },
  {
    id: 'notification',
    name: { en: 'Notification Service', es: 'Servicio de Notificación' },
    port: '8084',
    color: '#f9ca24',
    icon: '📧'
  }
];

export default function MicroservicesDemo() {
  const [language, setLanguage] = useState('en');
  const [activeConnection, setActiveConnection] = useState<string | null>(null);

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

  const handleServiceClick = (serviceId: string) => {
    setActiveConnection(activeConnection === serviceId ? null : serviceId);
  };

  return (
    <div className={styles.microservicesDemo}>
      <div className={styles.header}>
        <h3>
          {translate(
            'Microservices Architecture',
            'Arquitectura de Microservicios'
          )}
        </h3>
        <p>
          {translate(
            'Click on services to see communication patterns',
            'Haz clic en los servicios para ver los patrones de comunicación'
          )}
        </p>
      </div>

      <div className={styles.architectureContainer}>
        {/* API Gateway */}
        <motion.div 
          className={styles.apiGateway}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.gatewayIcon}>🚪</div>
          <div className={styles.gatewayLabel}>
            {translate('API Gateway', 'Gateway API')}
          </div>
          <div className={styles.gatewayPort}>:8080</div>
        </motion.div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`${styles.service} ${activeConnection === service.id ? styles.active : ''}`}
              style={{ '--service-color': service.color } as React.CSSProperties}
              onClick={() => handleServiceClick(service.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={styles.serviceIcon}>{service.icon}</div>
              <div className={styles.serviceName}>
                {service.name[language as 'en' | 'es']}
              </div>
              <div className={styles.servicePort}>:{service.port}</div>
              
              {/* Connection lines */}
              {activeConnection === service.id && (
                <motion.div
                  className={styles.connectionLine}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Database Layer */}
        <motion.div 
          className={styles.databaseLayer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.database}>
            <div className={styles.dbIcon}>🗄️</div>
            <div className={styles.dbLabel}>
              {translate('PostgreSQL', 'PostgreSQL')}
            </div>
          </div>
          <div className={styles.database}>
            <div className={styles.dbIcon}>🍃</div>
            <div className={styles.dbLabel}>
              {translate('MongoDB', 'MongoDB')}
            </div>
          </div>
          <div className={styles.database}>
            <div className={styles.dbIcon}>⚡</div>
            <div className={styles.dbLabel}>
              {translate('Redis Cache', 'Cache Redis')}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Technology Stack */}
      <motion.div 
        className={styles.techStack}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h4>{translate('Technology Stack', 'Stack Tecnológico')}</h4>
        <div className={styles.techGrid}>
          <div className={styles.techItem}>
            <span>🌱</span> Spring Boot
          </div>
          <div className={styles.techItem}>
            <span>🐳</span> Docker
          </div>
          <div className={styles.techItem}>
            <span>☸️</span> Kubernetes
          </div>
          <div className={styles.techItem}>
            <span>📊</span> Eureka
          </div>
          <div className={styles.techItem}>
            <span>🔧</span> Config Server
          </div>
          <div className={styles.techItem}>
            <span>📈</span> Zipkin
          </div>
        </div>
      </motion.div>
    </div>
  );
}