'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../DevZone.module.css';

interface ApiVersioningProps {
  language?: string;
}

export default function ApiVersioning({ language: propLanguage }: ApiVersioningProps) {
  const [activeStrategy, setActiveStrategy] = useState('url-versioning');
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    if (propLanguage) {
      setLanguage(propLanguage as 'en' | 'es');
    } else {
      const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
      setLanguage(savedLanguage as 'en' | 'es');

      const handleLanguageChange = (event: any) => {
        setLanguage(event.detail);
      };

      window.addEventListener('languageChange', handleLanguageChange);
      return () => window.removeEventListener('languageChange', handleLanguageChange);
    }
  }, [propLanguage]);

  const translate = (en: string, es: string) => language === 'en' ? en : es;

  const strategies = [
    {
      id: 'url-versioning',
      title: translate('URL Versioning', 'Versionado por URL'),
      icon: '🔗'
    },
    {
      id: 'header-versioning',
      title: translate('Header Versioning', 'Versionado por Header'),
      icon: '📋'
    },
    {
      id: 'parameter-versioning',
      title: translate('Parameter Versioning', 'Versionado por Parámetro'),
      icon: '⚙️'
    },
    {
      id: 'migration-strategy',
      title: translate('Migration Strategy', 'Estrategia de Migración'),
      icon: '🔄'
    }
  ];

  const getContent = () => {
    if (activeStrategy === 'url-versioning') {
      return {
        title: translate('URL Path Versioning', 'Versionado por Ruta URL'),
        description: translate(
          'Most common and intuitive approach - version in the URL path',
          'Enfoque más común e intuitivo - versión en la ruta de la URL'
        ),
        pros: translate(
          'Easy to understand and implement, Visible in browser URL, Simple routing configuration, Cacheable by HTTP proxies',
          'Fácil de entender e implementar, Visible en la URL del navegador, Configuración de routing simple, Cacheable por proxies HTTP'
        ).split(', '),
        cons: translate(
          'URL pollution with multiple versions, More URL endpoints to maintain, Requires careful documentation',
          'Contaminación de URL con múltiples versiones, Más endpoints URL para mantener, Requiere documentación cuidadosa'
        ).split(', '),
        code: `@RestController
@RequestMapping("/api/v1/users")
public class UserControllerV1 {
    
    @GetMapping
    public ResponseEntity<List<UserV1Dto>> getAllUsers() {
        List<User> users = userService.findAll();
        List<UserV1Dto> userDtos = users.stream()
            .map(userMapperV1::toDto)
            .collect(Collectors.toList());
        return ResponseEntity.ok(userDtos);
    }
}

@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {
    
    @GetMapping
    public ResponseEntity<Page<UserV2Dto>> getAllUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userService.findAll(pageable);
        Page<UserV2Dto> userDtos = users.map(userMapperV2::toDto);
        return ResponseEntity.ok(userDtos);
    }
}`
      };
    } else if (activeStrategy === 'header-versioning') {
      return {
        title: translate('Header-Based Versioning', 'Versionado por Headers'),
        description: translate(
          'Version specified through custom HTTP headers - cleaner URLs',
          'Versión especificada a través de headers HTTP personalizados - URLs más limpias'
        ),
        pros: translate(
          'Clean URLs without version pollution, Flexible version management, Can support multiple versioning schemes, Better for API evolution',
          'URLs limpias sin contaminación de versión, Gestión flexible de versiones, Puede soportar múltiples esquemas de versionado, Mejor para evolución de API'
        ).split(', '),
        cons: translate(
          'Less visible to developers, Requires header management, More complex caching, Testing tools need header support',
          'Menos visible para desarrolladores, Requiere gestión de headers, Caching más complejo, Herramientas de testing necesitan soporte de headers'
        ).split(', '),
        code: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public ResponseEntity<?> getAllUsers(
        @RequestHeader(value = "API-Version", defaultValue = "1.0") String version) {
        
        switch (version) {
            case "1.0":
                return getAllUsersV1();
            case "2.0":
                return getAllUsersV2();
            default:
                return ResponseEntity.badRequest()
                    .body("Unsupported version: " + version);
        }
    }
}

// Version interceptor
@Component
public class ApiVersionInterceptor implements HandlerInterceptor {
    
    @Override
    public boolean preHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler) throws Exception {
        
        String apiVersion = request.getHeader("API-Version");
        if (apiVersion == null) {
            apiVersion = "1.0"; // Default version
        }
        
        // Validate version
        if (!isValidVersion(apiVersion)) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return false;
        }
        
        request.setAttribute("api.version", apiVersion);
        return true;
    }
}`
      };
    } else if (activeStrategy === 'parameter-versioning') {
      return {
        title: translate('Query Parameter Versioning', 'Versionado por Parámetro de Consulta'),
        description: translate(
          'Version specified as a query parameter - simple and flexible',
          'Versión especificada como parámetro de consulta - simple y flexible'
        ),
        pros: translate(
          'Easy to implement, Visible in URLs, Default version support, Simple for quick prototyping',
          'Fácil de implementar, Visible en URLs, Soporte de versión por defecto, Simple para prototipado rápido'
        ).split(', '),
        cons: translate(
          'Can be ignored by clients, URL parameters pollution, Caching complications, Not RESTful purist approach',
          'Puede ser ignorado por clientes, Contaminación de parámetros URL, Complicaciones de caching, No es enfoque RESTful purista'
        ).split(', '),
        code: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @GetMapping
    public ResponseEntity<?> getAllUsers(
        @RequestParam(value = "version", defaultValue = "1.0") String version,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
        
        switch (version) {
            case "1.0":
                return getAllUsersV1();
            case "2.0":
                return getAllUsersV2(page, size);
            default:
                return ResponseEntity.badRequest()
                    .body("Unsupported version: " + version);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(
        @PathVariable Long id,
        @RequestParam(value = "version", defaultValue = "1.0") String version) {
        
        User user = userService.findById(id);
        
        switch (version) {
            case "1.0":
                return ResponseEntity.ok(userMapperV1.toDto(user));
            case "2.0":
                return ResponseEntity.ok(userMapperV2.toDto(user));
            default:
                return ResponseEntity.badRequest()
                    .body("Unsupported version: " + version);
        }
    }
}`
      };
    } else {
      return {
        title: translate('API Migration Strategy', 'Estrategia de Migración de API'),
        description: translate(
          'Best practices for smooth API version transitions and deprecation',
          'Mejores prácticas para transiciones suaves de versiones API y deprecación'
        ),
        pros: [],
        cons: [],
        code: `// Deprecation Strategy
@RestController
@RequestMapping("/api")
public class UserController {
    
    // Mark old version as deprecated
    @GetMapping("/v1/users")
    @Deprecated
    public ResponseEntity<List<UserV1Dto>> getUsersV1(HttpServletResponse response) {
        // Add deprecation headers
        response.setHeader("Deprecation", "true");
        response.setHeader("Sunset", "2024-12-31");
        response.setHeader("Link", "</api/v2/users>; rel=successor-version");
        
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users.stream()
            .map(userMapperV1::toDto)
            .collect(Collectors.toList()));
    }
    
    @GetMapping("/v2/users")
    public ResponseEntity<Page<UserV2Dto>> getUsersV2(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<User> users = userService.findAll(pageable);
        return ResponseEntity.ok(users.map(userMapperV2::toDto));
    }
}

// Backward Compatibility Service
@Service
public class UserCompatibilityService {
    
    private final UserService userService;
    private final UserMapperV1 mapperV1;
    private final UserMapperV2 mapperV2;
    
    public List<UserV1Dto> findAllUsersV1Compatible() {
        // Use V2 service but return V1 format
        List<User> users = userService.findAll();
        return users.stream()
            .map(mapperV1::toDto)
            .collect(Collectors.toList());
    }
}`
      };
    }
  };

  const content = getContent();

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <h3>{translate('API Versioning Strategies', 'Estrategias de Versionado de APIs')}</h3>
      </div>

      <div className={styles.tabContainer}>
        {strategies.map(strategy => (
          <button
            key={strategy.id}
            onClick={() => setActiveStrategy(strategy.id)}
            className={`${styles.tab} ${activeStrategy === strategy.id ? styles.activeTab : ''}`}
          >
            <span className={styles.tabIcon}>{strategy.icon}</span>
            {strategy.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStrategy}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={styles.tabContent}
        >
          <div>
            <h4>{content.title}</h4>
            <p className={styles.strategyDescription}>
              {content.description}
            </p>
            
            {activeStrategy !== 'migration-strategy' && (
              <div className={styles.prosConsContainer}>
                <div className={styles.prosContainer}>
                  <h5>✅ {translate('Pros', 'Ventajas')}</h5>
                  <ul>
                    {content.pros.map((pro: string, index: number) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.consContainer}>
                  <h5>❌ {translate('Cons', 'Desventajas')}</h5>
                  <ul>
                    {content.cons.map((con: string, index: number) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div className={styles.springBootContainer}>
              <h5>☕ {translate('Spring Boot Implementation', 'Implementación Spring Boot')}</h5>
              <pre className={styles.codeBlock}>
                <code>{content.code}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}