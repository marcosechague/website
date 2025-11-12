'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DatabaseDemo.module.css';

type CrudOperation = 'create' | 'read' | 'update' | 'delete';

const operations = [
  {
    id: 'create' as CrudOperation,
    name: { en: 'CREATE', es: 'CREAR' },
    color: '#4CAF50',
    icon: '➕',
    sql: 'INSERT INTO users (name, email) VALUES (?, ?)',
    description: {
      en: 'Insert new records into database',
      es: 'Insertar nuevos registros en la base de datos'
    }
  },
  {
    id: 'read' as CrudOperation,
    name: { en: 'READ', es: 'LEER' },
    color: '#2196F3',
    icon: '👁️',
    sql: 'SELECT * FROM users WHERE id = ?',
    description: {
      en: 'Query and retrieve data from database',
      es: 'Consultar y recuperar datos de la base de datos'
    }
  },
  {
    id: 'update' as CrudOperation,
    name: { en: 'UPDATE', es: 'ACTUALIZAR' },
    color: '#FF9800',
    icon: '✏️',
    sql: 'UPDATE users SET email = ? WHERE id = ?',
    description: {
      en: 'Modify existing records in database',
      es: 'Modificar registros existentes en la base de datos'
    }
  },
  {
    id: 'delete' as CrudOperation,
    name: { en: 'DELETE', es: 'ELIMINAR' },
    color: '#F44336',
    icon: '🗑️',
    sql: 'DELETE FROM users WHERE id = ?',
    description: {
      en: 'Remove records from database',
      es: 'Eliminar registros de la base de datos'
    }
  }
];

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'inactive' }
];

export default function DatabaseDemo() {
  const [language, setLanguage] = useState('en');
  const [selectedOperation, setSelectedOperation] = useState<CrudOperation>('read');
  const [isExecuting, setIsExecuting] = useState(false);
  const [data, setData] = useState(sampleData);

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

  const executeOperation = async () => {
    setIsExecuting(true);
    
    // Simulate database operation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    switch (selectedOperation) {
      case 'create':
        const newUser = { 
          id: data.length + 1, 
          name: 'New User', 
          email: 'newuser@example.com', 
          status: 'active' 
        };
        setData(prev => [...prev, newUser]);
        break;
      case 'update':
        setData(prev => prev.map(user => 
          user.id === 1 ? { ...user, email: 'updated@example.com' } : user
        ));
        break;
      case 'delete':
        setData(prev => prev.filter(user => user.id !== data.length));
        break;
    }
    
    setIsExecuting(false);
  };

  const resetData = () => {
    setData(sampleData);
  };

  return (
    <div className={styles.databaseDemo}>
      <div className={styles.header}>
        <h3>
          {translate('Database CRUD Operations', 'Operaciones CRUD de Base de Datos')}
        </h3>
        <p>
          {translate(
            'Interactive demonstration of database operations',
            'Demostración interactiva de operaciones de base de datos'
          )}
        </p>
      </div>

      {/* CRUD Operations */}
      <div className={styles.operationsContainer}>
        {operations.map((operation) => (
          <motion.button
            key={operation.id}
            className={`${styles.operationButton} ${selectedOperation === operation.id ? styles.active : ''}`}
            style={{ '--operation-color': operation.color } as React.CSSProperties}
            onClick={() => setSelectedOperation(operation.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className={styles.operationIcon}>{operation.icon}</span>
            <span className={styles.operationName}>
              {operation.name[language as 'en' | 'es']}
            </span>
          </motion.button>
        ))}
      </div>

      {/* SQL Query Display */}
      <motion.div
        className={styles.sqlContainer}
        key={selectedOperation}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.sqlHeader}>
          <span>📝 SQL Query</span>
        </div>
        <div className={styles.sqlQuery}>
          {operations.find(op => op.id === selectedOperation)?.sql}
        </div>
        <div className={styles.sqlDescription}>
          {operations.find(op => op.id === selectedOperation)?.description[language as 'en' | 'es']}
        </div>
      </motion.div>

      {/* Execute Button */}
      <div className={styles.executeContainer}>
        <motion.button
          className={styles.executeButton}
          onClick={executeOperation}
          disabled={isExecuting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isExecuting ? (
            <>
              <div className={styles.spinner}></div>
              {translate('Executing...', 'Ejecutando...')}
            </>
          ) : (
            <>
              ⚡ {translate('Execute Query', 'Ejecutar Consulta')}
            </>
          )}
        </motion.button>
        
        <button className={styles.resetButton} onClick={resetData}>
          🔄 {translate('Reset Data', 'Resetear Datos')}
        </button>
      </div>

      {/* Data Table */}
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h4>📊 {translate('Users Table', 'Tabla de Usuarios')}</h4>
        </div>
        <div className={styles.table}>
          <div className={styles.tableRow + ' ' + styles.headerRow}>
            <div className={styles.tableCell}>ID</div>
            <div className={styles.tableCell}>
              {translate('Name', 'Nombre')}
            </div>
            <div className={styles.tableCell}>Email</div>
            <div className={styles.tableCell}>
              {translate('Status', 'Estado')}
            </div>
          </div>
          <AnimatePresence>
            {data.map((user) => (
              <motion.div
                key={user.id}
                className={styles.tableRow}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.tableCell}>{user.id}</div>
                <div className={styles.tableCell}>{user.name}</div>
                <div className={styles.tableCell}>{user.email}</div>
                <div className={styles.tableCell}>
                  <span className={`${styles.status} ${styles[user.status]}`}>
                    {translate(user.status, user.status === 'active' ? 'activo' : 'inactivo')}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}