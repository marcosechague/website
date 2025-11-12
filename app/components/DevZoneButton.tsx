"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './DevZoneButton.module.css';

interface DevZoneButtonProps {
  language?: 'en' | 'es';
}

export default function DevZoneButton({ language = 'en' }: DevZoneButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  const buttonTexts = {
    en: "🚀 Explore DevZone",
    es: "🚀 Explorar DevZone"
  };

  useEffect(() => {
    // Show button after 2 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(showTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 260, 
        damping: 20 
      }}
      className={styles.devZoneButtonContainer}
    >
      <Link href="/devzone" className={styles.devZoneButton}>
        <motion.div
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0, 255, 136, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          className={styles.buttonContent}
        >
          {/* Floating elements around button */}
          <div className={`${styles.floatingElement} ${styles.codeSymbol1}`}>
            &lt;/&gt;
          </div>
          <div className={`${styles.floatingElement} ${styles.codeSymbol2}`}>
            {'{'}
          </div>
          <div className={`${styles.floatingElement} ${styles.codeSymbol3}`}>
            💻
          </div>
          <div className={`${styles.floatingElement} ${styles.codeSymbol4}`}>
            ⚡
          </div>
          
          {/* Button text */}
          <span className={styles.buttonText}>
            {buttonTexts[language]}
          </span>
          
          {/* Animated arrow */}
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut" 
            }}
            className={styles.arrow}
          >
            →
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}