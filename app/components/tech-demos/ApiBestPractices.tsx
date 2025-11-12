'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../DevZone.module.css';

interface ApiBestPracticesProps {
  language?: string;
}

export default function ApiBestPractices({ language: propLanguage }: ApiBestPracticesProps) {
  const [activeTab, setActiveTab] = useState('http-verbs');
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

  const tabs = [
    {
      id: 'http-verbs',
      title: translate('HTTP Verbs', 'Verbos HTTP'),
      icon: '🔧'
    },
    {
      id: 'url-design',
      title: translate('URL Design', 'Diseño de URLs'),
      icon: '🔗'
    },
    {
      id: 'request-body',
      title: translate('Request Body', 'Cuerpo de Petición'),
      icon: '📝'
    },
    {
      id: 'path-variables',
      title: translate('Path Variables', 'Variables de Ruta'),
      icon: '📍'
    }
  ];

  const httpVerbsContent = {
    en: {
      title: 'HTTP Verbs Best Practices',
      practices: [
        {
          verb: 'GET',
          usage: 'Retrieve data (safe & idempotent)',
          example: 'Get user information',
          code: `@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return ResponseEntity.ok(user);
}`
        },
        {
          verb: 'POST',
          usage: 'Create new resources',
          example: 'Create a new user',
          code: `@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody @Valid UserDto userDto) {
    User user = userService.create(userDto);
    URI location = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(user.getId())
        .toUri();
    return ResponseEntity.created(location).body(user);
}`
        },
        {
          verb: 'PUT',
          usage: 'Complete update/replace (idempotent)',
          example: 'Update entire user',
          code: `@PutMapping("/api/users/{id}")
public ResponseEntity<User> updateUser(
    @PathVariable Long id, 
    @RequestBody @Valid UserDto userDto) {
    User user = userService.update(id, userDto);
    return ResponseEntity.ok(user);
}`
        },
        {
          verb: 'PATCH',
          usage: 'Partial updates',
          example: 'Update user email only',
          code: `@PatchMapping("/api/users/{id}")
public ResponseEntity<User> patchUser(
    @PathVariable Long id,
    @RequestBody Map<String, Object> updates) {
    User user = userService.partialUpdate(id, updates);
    return ResponseEntity.ok(user);
}`
        },
        {
          verb: 'DELETE',
          usage: 'Remove resources (idempotent)',
          example: 'Delete user',
          code: `@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}`
        }
      ]
    },
    es: {
      title: 'Mejores Prácticas de Verbos HTTP',
      practices: [
        {
          verb: 'GET',
          usage: 'Obtener datos (seguro e idempotente)',
          example: 'Obtener información de usuario',
          code: `@GetMapping("/api/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return ResponseEntity.ok(user);
}`
        },
        {
          verb: 'POST',
          usage: 'Crear nuevos recursos',
          example: 'Crear un nuevo usuario',
          code: `@PostMapping("/api/users")
public ResponseEntity<User> createUser(@RequestBody @Valid UserDto userDto) {
    User user = userService.create(userDto);
    URI location = ServletUriComponentsBuilder
        .fromCurrentRequest()
        .path("/{id}")
        .buildAndExpand(user.getId())
        .toUri();
    return ResponseEntity.created(location).body(user);
}`
        },
        {
          verb: 'PUT',
          usage: 'Actualización completa/reemplazo (idempotente)',
          example: 'Actualizar usuario completo',
          code: `@PutMapping("/api/users/{id}")
public ResponseEntity<User> updateUser(
    @PathVariable Long id, 
    @RequestBody @Valid UserDto userDto) {
    User user = userService.update(id, userDto);
    return ResponseEntity.ok(user);
}`
        },
        {
          verb: 'PATCH',
          usage: 'Actualizaciones parciales',
          example: 'Actualizar solo email del usuario',
          code: `@PatchMapping("/api/users/{id}")
public ResponseEntity<User> patchUser(
    @PathVariable Long id,
    @RequestBody Map<String, Object> updates) {
    User user = userService.partialUpdate(id, updates);
    return ResponseEntity.ok(user);
}`
        },
        {
          verb: 'DELETE',
          usage: 'Eliminar recursos (idempotente)',
          example: 'Eliminar usuario',
          code: `@DeleteMapping("/api/users/{id}")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.delete(id);
    return ResponseEntity.noContent().build();
}`
        }
      ]
    }
  };

  const urlDesignContent = {
    en: {
      title: 'URL Design Principles',
      principles: [
        {
          rule: 'Use Nouns, Not Verbs',
          good: '/api/users',
          bad: '/api/getUsers',
          explanation: 'URLs should represent resources, not actions'
        },
        {
          rule: 'Use Plural Nouns for Collections',
          good: '/api/users',
          bad: '/api/user',
          explanation: 'Collections should use plural form'
        },
        {
          rule: 'Hierarchical Resource Structure',
          good: '/api/users/123/orders/456',
          bad: '/api/getUserOrders?userId=123&orderId=456',
          explanation: 'Express relationships through URL hierarchy'
        },
        {
          rule: 'Use Lowercase Letters',
          good: '/api/user-profiles',
          bad: '/api/UserProfiles',
          explanation: 'Lowercase with hyphens for readability'
        }
      ],
      javaExample: `@RestController
@RequestMapping("/api")
public class UserController {
    
    // ✅ Good: Collection resource
    @GetMapping("/users")
    public List<User> getAllUsers() { ... }
    
    // ✅ Good: Specific resource
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) { ... }
    
    // ✅ Good: Nested resource
    @GetMapping("/users/{userId}/orders")
    public List<Order> getUserOrders(@PathVariable Long userId) { ... }
    
    // ✅ Good: Specific nested resource
    @GetMapping("/users/{userId}/orders/{orderId}")
    public Order getUserOrder(
        @PathVariable Long userId,
        @PathVariable Long orderId) { ... }
}`
    },
    es: {
      title: 'Principios de Diseño de URLs',
      principles: [
        {
          rule: 'Usar Sustantivos, No Verbos',
          good: '/api/users',
          bad: '/api/getUsers',
          explanation: 'Las URLs deben representar recursos, no acciones'
        },
        {
          rule: 'Usar Sustantivos en Plural para Colecciones',
          good: '/api/users',
          bad: '/api/user',
          explanation: 'Las colecciones deben usar forma plural'
        },
        {
          rule: 'Estructura Jerárquica de Recursos',
          good: '/api/users/123/orders/456',
          bad: '/api/getUserOrders?userId=123&orderId=456',
          explanation: 'Expresar relaciones a través de jerarquía URL'
        },
        {
          rule: 'Usar Letras Minúsculas',
          good: '/api/user-profiles',
          bad: '/api/UserProfiles',
          explanation: 'Minúsculas con guiones para legibilidad'
        }
      ],
      javaExample: `@RestController
@RequestMapping("/api")
public class UserController {
    
    // ✅ Bueno: Recurso de colección
    @GetMapping("/users")
    public List<User> getAllUsers() { ... }
    
    // ✅ Bueno: Recurso específico
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) { ... }
    
    // ✅ Bueno: Recurso anidado
    @GetMapping("/users/{userId}/orders")
    public List<Order> getUserOrders(@PathVariable Long userId) { ... }
    
    // ✅ Bueno: Recurso anidado específico
    @GetMapping("/users/{userId}/orders/{orderId}")
    public Order getUserOrder(
        @PathVariable Long userId,
        @PathVariable Long orderId) { ... }
}`
    }
  };

  return (
    <div className={styles.demoContainer}>
      <div className={styles.demoHeader}>
        <h3>{translate('API Design Best Practices', 'Mejores Prácticas de Diseño de APIs')}</h3>
      </div>

      <div className={styles.tabContainer}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            {tab.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={styles.tabContent}
        >
          {activeTab === 'http-verbs' && (
            <div>
              <h4>{httpVerbsContent[language].title}</h4>
              <div className={styles.practicesGrid}>
                {httpVerbsContent[language].practices.map((practice, index) => (
                  <motion.div
                    key={practice.verb}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={styles.practiceCard}
                  >
                    <div className={styles.practiceHeader}>
                      <span className={`${styles.httpVerb} ${styles[practice.verb.toLowerCase()]}`}>
                        {practice.verb}
                      </span>
                      <div>
                        <div className={styles.practiceUsage}>{practice.usage}</div>
                        <div className={styles.practiceExample}>{practice.example}</div>
                      </div>
                    </div>
                    <pre className={styles.codeBlock}>
                      <code>{practice.code}</code>
                    </pre>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'url-design' && (
            <div>
              <h4>{urlDesignContent[language].title}</h4>
              <div className={styles.principlesContainer}>
                {urlDesignContent[language].principles.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={styles.principleCard}
                  >
                    <h5>{principle.rule}</h5>
                    <div className={styles.comparison}>
                      <div className={styles.goodExample}>
                        <span className={styles.label}>✅ {translate('Good', 'Bueno')}</span>
                        <code>{principle.good}</code>
                      </div>
                      <div className={styles.badExample}>
                        <span className={styles.label}>❌ {translate('Bad', 'Malo')}</span>
                        <code>{principle.bad}</code>
                      </div>
                    </div>
                    <p className={styles.explanation}>{principle.explanation}</p>
                  </motion.div>
                ))}
              </div>
              <div className={styles.javaExampleContainer}>
                <h5>{translate('Spring Boot Example', 'Ejemplo Spring Boot')}</h5>
                <pre className={styles.codeBlock}>
                  <code>{urlDesignContent[language].javaExample}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'request-body' && (
            <div>
              <h4>{translate('Request Body Guidelines', 'Guías para Request Body')}</h4>
              <div className={styles.guidelinesContainer}>
                <div className={styles.guideline}>
                  <h5>{translate('When to Use Request Body', 'Cuándo Usar Request Body')}</h5>
                  <ul>
                    <li>{translate('POST requests for creating resources', 'Peticiones POST para crear recursos')}</li>
                    <li>{translate('PUT requests for complete updates', 'Peticiones PUT para actualizaciones completas')}</li>
                    <li>{translate('PATCH requests for partial updates', 'Peticiones PATCH para actualizaciones parciales')}</li>
                    <li>{translate('Complex query parameters (search filters)', 'Parámetros de consulta complejos (filtros de búsqueda)')}</li>
                  </ul>
                </div>
                <pre className={styles.codeBlock}>
                  <code>{`// DTO for request validation
@Data
@Valid
public class CreateUserDto {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100)
    private String name;
    
    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;
    
    @Pattern(regexp = "^\\\\+?[1-9]\\\\d{1,14}$", message = "Invalid phone")
    private String phone;
    
    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;
}

@PostMapping("/api/users")
public ResponseEntity<UserResponseDto> createUser(
    @RequestBody @Valid CreateUserDto dto,
    BindingResult result) {
    
    if (result.hasErrors()) {
        return ResponseEntity.badRequest().build();
    }
    
    User user = userService.create(dto);
    UserResponseDto response = userMapper.toDto(user);
    
    return ResponseEntity
        .created(URI.create("/api/users/" + user.getId()))
        .body(response);
}`}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'path-variables' && (
            <div>
              <h4>{translate('Path Variables Best Practices', 'Mejores Prácticas para Variables de Ruta')}</h4>
              <div className={styles.pathVariablesContainer}>
                <div className={styles.guideline}>
                  <h5>{translate('When to Use Path Variables', 'Cuándo Usar Variables de Ruta')}</h5>
                  <ul>
                    <li>{translate('Resource identification (IDs)', 'Identificación de recursos (IDs)')}</li>
                    <li>{translate('Hierarchical relationships', 'Relaciones jerárquicas')}</li>
                    <li>{translate('Required parameters for resource access', 'Parámetros requeridos para acceso a recursos')}</li>
                  </ul>
                </div>
                <pre className={styles.codeBlock}>
                  <code>{`@RestController
@RequestMapping("/api")
@Validated
public class OrderController {
    
    // Single path variable
    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUser(
        @PathVariable @Positive Long userId) {
        User user = userService.findById(userId);
        return ResponseEntity.ok(user);
    }
    
    // Multiple path variables
    @GetMapping("/users/{userId}/orders/{orderId}")
    public ResponseEntity<Order> getUserOrder(
        @PathVariable @Positive Long userId,
        @PathVariable @Positive Long orderId) {
        Order order = orderService.findByUserAndId(userId, orderId);
        return ResponseEntity.ok(order);
    }
    
    // Path variable with validation
    @GetMapping("/users/{userId}/orders")
    public ResponseEntity<Page<Order>> getUserOrders(
        @PathVariable @Positive Long userId,
        @RequestParam(defaultValue = "0") @Min(0) int page,
        @RequestParam(defaultValue = "10") @Min(1) @Max(100) int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Order> orders = orderService.findByUserId(userId, pageable);
        return ResponseEntity.ok(orders);
    }
    
    // Optional path variable with regex validation
    @GetMapping({"/categories", "/categories/{categoryId}"})
    public ResponseEntity<?> getCategories(
        @PathVariable(required = false) 
        @Pattern(regexp = "^[a-zA-Z0-9-]+$") String categoryId) {
        
        if (categoryId != null) {
            Category category = categoryService.findById(categoryId);
            return ResponseEntity.ok(category);
        }
        
        List<Category> categories = categoryService.findAll();
        return ResponseEntity.ok(categories);
    }
}`}</code>
                </pre>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}