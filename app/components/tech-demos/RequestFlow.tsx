'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RequestFlow.module.css';

const steps = [
  {
    id: 'client',
    en: 'Client',
    es: 'Cliente',
    icon: '🌐',
    description: {
      en: 'Frontend sends HTTP request',
      es: 'Frontend envía petición HTTP'
    },
    detailedExplanation: {
      en: 'The client (web browser, mobile app, or API consumer) initiates an HTTP request to our backend service. This is where the user interaction begins.',
      es: 'El cliente (navegador web, aplicación móvil o consumidor de API) inicia una petición HTTP a nuestro servicio backend. Aquí es donde comienza la interacción del usuario.'
    },
    bestPractices: {
      en: [
        'Always validate input on client-side for better UX',
        'Use HTTPS for secure communication',
        'Implement proper error handling and loading states',
        'Add request timeouts to prevent hanging requests'
      ],
      es: [
        'Siempre validar entrada en el cliente para mejor UX',
        'Usar HTTPS para comunicación segura',
        'Implementar manejo de errores y estados de carga',
        'Agregar timeouts para evitar requests colgadas'
      ]
    },
    audioText: {
      en: 'Step 1: The client sends an HTTP request. This could be a web browser, mobile app, or another service making an API call.',
      es: 'Paso 1: El cliente envía una petición HTTP. Puede ser un navegador web, aplicación móvil u otro servicio haciendo una llamada API.'
    },
    codeExample: {
      title: 'Frontend Request',
      code: `// React Frontend Example
const fetchUser = async (id) => {
  try {
    const response = await fetch('/api/users/' + id, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
  }
};`
    }
  },
  {
    id: 'controller',
    en: 'API Controller',
    es: 'Controlador API',
    icon: '🎛️',
    description: {
      en: 'Routes request and validates input',
      es: 'Enruta petición y valida entrada'
    },
    detailedExplanation: {
      en: 'The Controller layer receives the HTTP request, validates the input parameters, handles authentication/authorization, and routes the request to the appropriate service method.',
      es: 'La capa Controller recibe la petición HTTP, valida los parámetros de entrada, maneja autenticación/autorización y enruta la petición al método de servicio apropiado.'
    },
    bestPractices: {
      en: [
        'Keep controllers thin - delegate business logic to services',
        'Validate all input parameters using annotations',
        'Use DTOs (Data Transfer Objects) for request/response',
        'Implement proper HTTP status codes',
        'Add request/response logging for debugging'
      ],
      es: [
        'Mantener controladores delgados - delegar lógica a servicios',
        'Validar todos los parámetros usando anotaciones',
        'Usar DTOs para request/response',
        'Implementar códigos de estado HTTP apropiados',
        'Agregar logging de request/response para debug'
      ]
    },
    audioText: {
      en: 'Step 2: The API Controller receives and validates the request. It acts as the entry point, handling routing and input validation.',
      es: 'Paso 2: El Controlador API recibe y valida la petición. Actúa como punto de entrada, manejando enrutamiento y validación.'
    },
    codeExample: {
      title: 'Spring Boot Controller',
      code: `@RestController
@RequestMapping("/api/users")
@Validated
@Slf4j
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(
        @PathVariable @Min(1) Long id) {
        
        log.info("Received request for user ID: {}", id);
        
        try {
            UserDTO user = userService.findById(id);
            return ResponseEntity.ok(user);
        } catch (UserNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}`
    }
  },
  {
    id: 'service',
    en: 'Service',
    es: 'Servicio',
    icon: '⚙️',
    description: {
      en: 'Business logic processing',
      es: 'Procesamiento de lógica de negocio'
    },
    detailedExplanation: {
      en: 'The Service layer contains the core business logic. It orchestrates operations, applies business rules, handles transactions, and coordinates between different parts of the application.',
      es: 'La capa Service contiene la lógica de negocio principal. Orquesta operaciones, aplica reglas de negocio, maneja transacciones y coordina entre diferentes partes de la aplicación.'
    },
    bestPractices: {
      en: [
        'Implement single responsibility principle',
        'Use @Transactional for data consistency',
        'Apply proper exception handling and logging',
        'Keep services stateless for scalability',
        'Use dependency injection for loose coupling'
      ],
      es: [
        'Implementar principio de responsabilidad única',
        'Usar @Transactional para consistencia de datos',
        'Aplicar manejo de excepciones y logging apropiado',
        'Mantener servicios sin estado para escalabilidad',
        'Usar inyección de dependencias para bajo acoplamiento'
      ]
    },
    audioText: {
      en: 'Step 3: The Service layer processes business logic. This is where the core application logic and business rules are implemented.',
      es: 'Paso 3: La capa Service procesa la lógica de negocio. Aquí es donde se implementa la lógica principal y las reglas de negocio.'
    },
    codeExample: {
      title: 'Business Service',
      code: `@Service
@Transactional
@Slf4j
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private UserMapper userMapper;
    
    public UserDTO findById(Long id) {
        log.debug("Finding user with ID: {}", id);
        
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(
                "User not found with ID: " + id));
        
        // Apply business logic if needed
        if (!user.isActive()) {
            throw new UserInactiveException("User is inactive");
        }
        
        return userMapper.toDTO(user);
    }
}`
    }
  },
  {
    id: 'repository',
    en: 'Repository',
    es: 'Repositorio',
    icon: '📦',
    description: {
      en: 'Data access layer',
      es: 'Capa de acceso a datos'
    },
    detailedExplanation: {
      en: 'The Repository layer provides an abstraction over data storage. It handles all database operations, implements queries, and isolates the business logic from database-specific details.',
      es: 'La capa Repository proporciona una abstracción sobre el almacenamiento de datos. Maneja todas las operaciones de base de datos, implementa consultas y aísla la lógica de negocio de los detalles específicos de la base de datos.'
    },
    bestPractices: {
      en: [
        'Use JPA/Hibernate for ORM mapping',
        'Implement custom queries efficiently',
        'Use pagination for large datasets',
        'Apply database indexing strategically',
        'Handle connection pooling properly'
      ],
      es: [
        'Usar JPA/Hibernate para mapeo ORM',
        'Implementar consultas personalizadas eficientemente',
        'Usar paginación para datasets grandes',
        'Aplicar indexación de base de datos estratégicamente',
        'Manejar pool de conexiones apropiadamente'
      ]
    },
    audioText: {
      en: 'Step 4: The Repository handles data access. It abstracts database operations and provides a clean interface for data retrieval.',
      es: 'Paso 4: El Repository maneja el acceso a datos. Abstrae operaciones de base de datos y proporciona una interfaz limpia para recuperación de datos.'
    },
    codeExample: {
      title: 'JPA Repository',
      code: `@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    @Query("SELECT u FROM User u WHERE u.email = :email AND u.active = true")
    Optional<User> findActiveUserByEmail(@Param("email") String email);
    
    @Query("SELECT u FROM User u WHERE u.department = :dept ORDER BY u.createdDate DESC")
    Page<User> findByDepartment(@Param("dept") String department, Pageable pageable);
    
    @Modifying
    @Query("UPDATE User u SET u.lastLoginDate = :date WHERE u.id = :id")
    void updateLastLoginDate(@Param("id") Long id, @Param("date") LocalDateTime date);
}`
    }
  },
  {
    id: 'database',
    en: 'Database',
    es: 'Base de Datos',
    icon: '🗄️',
    description: {
      en: 'Data persistence and retrieval',
      es: 'Persistencia y recuperación de datos'
    },
    detailedExplanation: {
      en: 'The Database layer is where data is actually stored and retrieved. It handles ACID transactions, ensures data consistency, and provides persistence for the application state.',
      es: 'La capa Database es donde los datos se almacenan y recuperan realmente. Maneja transacciones ACID, asegura consistencia de datos y proporciona persistencia para el estado de la aplicación.'
    },
    bestPractices: {
      en: [
        'Design normalized database schema',
        'Use appropriate data types and constraints',
        'Implement proper indexing strategy',
        'Set up regular backups and monitoring',
        'Use connection pooling for performance'
      ],
      es: [
        'Diseñar esquema de base de datos normalizado',
        'Usar tipos de datos y restricciones apropiadas',
        'Implementar estrategia de indexación apropiada',
        'Configurar backups y monitoreo regular',
        'Usar pool de conexiones para rendimiento'
      ]
    },
    audioText: {
      en: 'Step 5: The Database stores and retrieves data. It ensures ACID compliance and data persistence for our application.',
      es: 'Paso 5: La Base de Datos almacena y recupera datos. Asegura cumplimiento ACID y persistencia de datos para nuestra aplicación.'
    },
    codeExample: {
      title: 'Database Schema',
      code: `-- PostgreSQL Example
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    active BOOLEAN DEFAULT true,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_date TIMESTAMP,
    
    CONSTRAINT email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_department ON users(department) WHERE active = true;`
    }
  }
];

export default function RequestFlow() {
  const [language, setLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDetailedInfo, setShowDetailedInfo] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(3000); // 3 seconds per step

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event: any) => {
      setLanguage(event.detail);
    };

    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const nextStep = prev + 1;
        if (nextStep >= steps.length) {
          setIsPlaying(false);
          return -1; // Reset to start
        }
        
        // Speak the current step if audio is enabled
        if (audioEnabled && speechSynthesis && nextStep < steps.length) {
          const text = steps[nextStep].audioText[language as 'en' | 'es'];
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = language === 'en' ? 'en-US' : 'es-ES';
          utterance.rate = 0.8; // Slightly slower speech
          speechSynthesis.speak(utterance);
        }
        
        return nextStep;
      });
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, animationSpeed, audioEnabled, speechSynthesis, language]);

  const translate = (english: string, spanish: string) => language === 'en' ? english : spanish;

  const handlePlay = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel(); // Stop any current speech
    }
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentStep(-1);
    }
  };

  const handleStepClick = (index: number) => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
    setCurrentStep(index);
    setIsPlaying(false);
    
    if (audioEnabled && speechSynthesis) {
      const text = steps[index].audioText[language as 'en' | 'es'];
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 'es-ES';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (speechSynthesis && audioEnabled) {
      speechSynthesis.cancel();
    }
  };

  const currentStepData = currentStep >= 0 && currentStep < steps.length ? steps[currentStep] : null;

  return (
    <div className={styles.requestFlow}>
      <div className={styles.header}>
        <h3>
          {translate(
            'Enhanced API Request Flow',
            'Flujo Avanzado de Request API'
          )}
        </h3>
        
        {/* Controls */}
        <div className={styles.controls}>
          <button 
            className={`${styles.playButton} ${isPlaying ? styles.playing : ''}`}
            onClick={handlePlay}
          >
            {isPlaying ? '⏸️' : '▶️'} {translate('Play Animation', 'Reproducir Animación')}
          </button>
          
          <button 
            className={`${styles.audioButton} ${audioEnabled ? styles.enabled : ''}`}
            onClick={toggleAudio}
            title={translate('Toggle Audio Narration', 'Activar Narración de Audio')}
          >
            {audioEnabled ? '🔊' : '🔇'} {translate('Audio', 'Audio')}
          </button>
          
          <button 
            className={`${styles.detailButton} ${showDetailedInfo ? styles.active : ''}`}
            onClick={() => setShowDetailedInfo(!showDetailedInfo)}
          >
            📋 {translate('Details', 'Detalles')}
          </button>
          
          {/* Speed Control */}
          <div className={styles.speedControl}>
            <label>{translate('Speed:', 'Velocidad:')}</label>
            <select 
              value={animationSpeed} 
              onChange={(e) => setAnimationSpeed(Number(e.target.value))}
              className={styles.speedSelect}
            >
              <option value={5000}>{translate('Slow', 'Lento')}</option>
              <option value={3000}>{translate('Normal', 'Normal')}</option>
              <option value={1500}>{translate('Fast', 'Rápido')}</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.flowContainer}>
        {steps.map((step, index) => (
          <div key={step.id} className={styles.stepContainer}>
            {/* Step */}
            <motion.div
              className={`${styles.step} ${currentStep === index ? styles.active : ''} ${currentStep > index ? styles.completed : ''}`}
              onClick={() => handleStepClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: currentStep === index ? 'var(--primary)' : 
                                currentStep > index ? 'var(--secondary)' : 'var(--bg-card)',
                borderColor: currentStep === index ? 'var(--primary)' : 
                            currentStep > index ? 'var(--secondary)' : 'var(--border)',
              }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className={styles.stepIcon}
                animate={{
                  scale: currentStep === index ? 1.2 : 1,
                  rotate: currentStep === index ? 360 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {step.icon}
              </motion.div>
              <div className={styles.stepLabel}>
                {step[language as keyof typeof step] as string}
              </div>
              
              {/* Progress indicator */}
              {currentStep > index && (
                <motion.div
                  className={styles.completedIndicator}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>

            {/* Animated Arrow */}
            {index < steps.length - 1 && (
              <motion.div
                className={styles.arrow}
                animate={{
                  opacity: currentStep >= index ? 1 : 0.3,
                  color: currentStep > index ? 'var(--secondary)' : 
                         currentStep === index ? 'var(--primary)' : 'var(--text-secondary)',
                  x: currentStep === index ? [0, 10, 0] : 0,
                }}
                transition={{ 
                  duration: 0.3, 
                  delay: currentStep === index ? 0.2 : 0,
                  x: { duration: 1, repeat: currentStep === index ? Infinity : 0, ease: "easeInOut" }
                }}
              >
                →
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Current Step Information */}
      <AnimatePresence mode="wait">
        {currentStepData && (
          <motion.div
            key={currentStep}
            className={styles.stepInfo}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.stepHeader}>
              <h4>
                <span className={styles.stepNumber}>Step {currentStep + 1}:</span>
                {currentStepData[language as keyof typeof currentStepData] as string}
              </h4>
            </div>
            
            <div className={styles.stepContent}>
              <p className={styles.mainDescription}>
                {currentStepData.detailedExplanation[language as 'en' | 'es']}
              </p>

              {showDetailedInfo && (
                <motion.div
                  className={styles.detailedInfo}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Best Practices */}
                  <div className={styles.bestPractices}>
                    <h5>🎯 {translate('Best Practices', 'Mejores Prácticas')}</h5>
                    <ul>
                      {currentStepData.bestPractices[language as 'en' | 'es'].map((practice, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          {practice}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Example */}
                  <div className={styles.codeExample}>
                    <div className={styles.codeHeader}>
                      <span>💻 {currentStepData.codeExample.title}</span>
                    </div>
                    <pre className={styles.code}>
                      <code>{currentStepData.codeExample.code}</code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressLabel}>
          {translate('Progress:', 'Progreso:')} {currentStep + 1}/{steps.length}
        </div>
        <div className={styles.progressTrack}>
          <motion.div
            className={styles.progressFill}
            animate={{
              width: `${((currentStep + 1) / steps.length) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Audio Status */}
      {audioEnabled && (
        <div className={styles.audioStatus}>
          🎵 {translate('Audio narration enabled', 'Narración de audio activada')}
        </div>
      )}
    </div>
  );
}