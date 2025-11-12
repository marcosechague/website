"use client";

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import styles from './SpringBootFlow.module.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

interface FlowStep {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  position: { x: number; y: number };
  details: string[];
}

const flowSteps: FlowStep[] = [
  {
    id: 'client',
    name: 'Client Request',
    description: 'HTTP Request initiated',
    icon: '🌐',
    color: '#60A5FA',
    position: { x: 50, y: 50 },
    details: [
      'HTTP POST /api/users',
      'Content-Type: application/json',
      'Authorization: Bearer token',
      'Request body validation'
    ]
  },
  {
    id: 'controller',
    name: 'REST Controller',
    description: '@RestController handles routing',
    icon: '🎯',
    color: '#34D399',
    position: { x: 250, y: 50 },
    details: [
      '@PostMapping("/users")',
      '@Valid @RequestBody UserDto',
      '@PreAuthorize security check',
      'Input validation & sanitization'
    ]
  },
  {
    id: 'service',
    name: 'Service Layer',
    description: '@Service business logic',
    icon: '⚙️',
    color: '#F59E0B',
    position: { x: 450, y: 50 },
    details: [
      '@Transactional annotation',
      'Business rules validation',
      'Data transformation',
      'External service calls'
    ]
  },
  {
    id: 'repository',
    name: 'Repository Layer',
    description: '@Repository data access',
    icon: '🗄️',
    color: '#EF4444',
    position: { x: 650, y: 50 },
    details: [
      'JPA Entity mapping',
      'Custom query methods',
      'Database transaction',
      'Connection pool management'
    ]
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Persistent data storage',
    icon: '💾',
    color: '#8B5CF6',
    position: { x: 850, y: 50 },
    details: [
      'SQL execution plan',
      'Index optimization',
      'ACID compliance',
      'Connection pooling'
    ]
  }
];

export default function SpringBootFlow() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentCode, setCurrentCode] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const dataPacketRef = useRef<HTMLDivElement>(null);
  const responsePacketRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  const codeExamples = {
    client: `// Client Request
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
});`,
    
    controller: `// REST Controller
@RestController
@RequestMapping("/api/users")
public class UserController {
  
  @PostMapping
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<UserDto> createUser(
    @Valid @RequestBody CreateUserRequest request) {
    
    UserDto user = userService.createUser(request);
    return ResponseEntity.ok(user);
  }
}`,
    
    service: `// Service Layer
@Service
@Transactional
public class UserService {
  
  @Autowired
  private UserRepository userRepository;
  
  public UserDto createUser(CreateUserRequest request) {
    // Business logic validation
    validateUserData(request);
    
    User user = User.builder()
      .name(request.getName())
      .email(request.getEmail())
      .createdAt(Instant.now())
      .build();
      
    User savedUser = userRepository.save(user);
    return UserMapper.toDto(savedUser);
  }
}`,
    
    repository: `// Repository Layer
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  
  @Query("SELECT u FROM User u WHERE u.email = :email")
  Optional<User> findByEmail(@Param("email") String email);
  
  @Query(value = "SELECT * FROM users u WHERE u.active = true", 
         nativeQuery = true)
  List<User> findActiveUsers();
  
  @Modifying
  @Query("UPDATE User u SET u.lastLogin = :loginTime WHERE u.id = :id")
  void updateLastLogin(@Param("id") Long id, @Param("loginTime") Instant loginTime);
}`,
    
    database: `-- Database Operations
BEGIN TRANSACTION;

-- Insert new user record
INSERT INTO users (name, email, created_at, active)
VALUES ('John Doe', 'john@example.com', NOW(), true);

-- Get generated ID
SELECT LAST_INSERT_ID() as user_id;

-- Update user statistics
UPDATE user_stats SET total_users = total_users + 1;

COMMIT;`
  };

  const startAnimation = async () => {
    if (!containerRef.current || !dataPacketRef.current || !responsePacketRef.current) return;
    
    setIsPlaying(true);
    setCurrentStep(-1);
    
    const tl = gsap.timeline();
    const dataPacket = dataPacketRef.current;
    const responsePacket = responsePacketRef.current;
    
    // Reset positions
    gsap.set(dataPacket, { x: 50, y: 50, opacity: 1 });
    gsap.set(responsePacket, { x: 850, y: 50, opacity: 0 });
    
    // Forward flow animation
    for (let i = 0; i < flowSteps.length; i++) {
      const step = flowSteps[i];
      
      tl.call(() => {
        setCurrentStep(i);
        setCurrentCode(codeExamples[step.id as keyof typeof codeExamples]);
      })
      .to(dataPacket, {
        x: step.position.x,
        y: step.position.y,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: function() {
          // Add trail effect
          const progress = this.progress();
          dataPacket.style.boxShadow = `0 0 ${20 + progress * 30}px ${step.color}`;
        }
      })
      .to({}, { duration: 1.2 }); // Pause at each step
    }
    
    // Database operation
    tl.call(() => {
      setCurrentCode(codeExamples.database);
    })
    .to(dataPacket, { 
      scale: 1.3, 
      duration: 0.5, 
      yoyo: true, 
      repeat: 1,
      ease: "power2.inOut" 
    })
    .set(responsePacket, { opacity: 1, x: 850, y: 50 })
    .call(() => {
      // Switch to response packet
      gsap.set(dataPacket, { opacity: 0 });
    });
    
    // Return flow animation
    for (let i = flowSteps.length - 1; i >= 0; i--) {
      const step = flowSteps[i];
      
      tl.to(responsePacket, {
        x: step.position.x,
        y: step.position.y,
        duration: 0.6,
        ease: "power2.inOut",
        onUpdate: function() {
          const progress = this.progress();
          responsePacket.style.boxShadow = `0 0 ${15 + progress * 25}px #10B981`;
        }
      })
      .call(() => {
        setCurrentStep(i);
      })
      .to({}, { duration: 0.8 });
    }
    
    tl.call(() => {
      setIsPlaying(false);
      setCurrentStep(-1);
      setCurrentCode('');
    });
  };

  const resetAnimation = () => {
    if (!dataPacketRef.current || !responsePacketRef.current) return;
    
    gsap.killTweensOf([dataPacketRef.current, responsePacketRef.current]);
    gsap.set(dataPacketRef.current, { x: 50, y: 50, opacity: 1, scale: 1 });
    gsap.set(responsePacketRef.current, { x: 850, y: 50, opacity: 0, scale: 1 });
    
    setIsPlaying(false);
    setCurrentStep(-1);
    setCurrentCode('');
  };

  useEffect(() => {
    // Animate code display
    if (currentCode && codeRef.current) {
      gsap.fromTo(codeRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentCode]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>🚀 Spring Boot Request Flow - Advanced Animation</h3>
        <p>Watch data flow through the complete Spring Boot architecture with GSAP animations</p>
        
        <div className={styles.controls}>
          <button
            onClick={startAnimation}
            disabled={isPlaying}
            className={`${styles.button} ${styles.playButton}`}
          >
            {isPlaying ? '🔄 Running...' : '▶️ Start Flow'}
          </button>
          
          <button
            onClick={resetAnimation}
            className={`${styles.button} ${styles.resetButton}`}
          >
            🔄 Reset
          </button>
          
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`${styles.button} ${styles.detailsButton}`}
          >
            {showDetails ? '📖 Hide Details' : '📋 Show Details'}
          </button>
        </div>
      </div>

      <div className={styles.flowContainer} ref={containerRef}>
        {/* Flow Steps */}
        {flowSteps.map((step, index) => (
          <div
            key={step.id}
            className={`${styles.step} ${currentStep === index ? styles.activeStep : ''}`}
            style={{
              left: step.position.x - 75,
              top: step.position.y - 40,
              borderColor: step.color
            }}
          >
            <div className={styles.stepIcon} style={{ color: step.color }}>
              {step.icon}
            </div>
            <div className={styles.stepName}>{step.name}</div>
            <div className={styles.stepDescription}>{step.description}</div>
            
            {showDetails && currentStep === index && (
              <div className={styles.stepDetails} style={{ borderColor: step.color }}>
                {step.details.map((detail, idx) => (
                  <div key={idx} className={styles.detailItem}>
                    • {detail}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Data Packet (Request) */}
        <div
          ref={dataPacketRef}
          className={`${styles.packet} ${styles.requestPacket}`}
        >
          📦 Request
        </div>

        {/* Response Packet */}
        <div
          ref={responsePacketRef}
          className={`${styles.packet} ${styles.responsePacket}`}
        >
          ✅ Response
        </div>

        {/* Connection Lines */}
        <svg className={styles.connectionLines}>
          {flowSteps.slice(0, -1).map((step, index) => (
            <line
              key={`line-${index}`}
              x1={step.position.x + 75}
              y1={step.position.y}
              x2={flowSteps[index + 1].position.x - 75}
              y2={flowSteps[index + 1].position.y}
              stroke="var(--border)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className={styles.connectionLine}
            />
          ))}
        </svg>
      </div>

      {/* Code Display */}
      {currentCode && (
        <div className={styles.codeContainer} ref={codeRef}>
          <div className={styles.codeHeader}>
            <span>💻 Current Code Execution</span>
            <span className={styles.currentStepName}>
              {currentStep >= 0 ? flowSteps[currentStep].name : ''}
            </span>
          </div>
          <pre className={styles.codeBlock}>
            <code>{currentCode}</code>
          </pre>
        </div>
      )}

      {/* Performance Metrics */}
      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Request Time</span>
          <span className={styles.metricValue}>
            {isPlaying ? '⏱️ Processing...' : '⚡ 45ms'}
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Database Queries</span>
          <span className={styles.metricValue}>🗄️ 2 queries</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Memory Usage</span>
          <span className={styles.metricValue}>🧠 12MB</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Status</span>
          <span className={`${styles.metricValue} ${isPlaying ? styles.processing : styles.idle}`}>
            {isPlaying ? '🔄 Active' : '💤 Idle'}
          </span>
        </div>
      </div>
    </div>
  );
}