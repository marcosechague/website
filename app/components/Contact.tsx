'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

interface FormData {
  name: string;
  senderEmail: string;
  subject: string;
  message: string;
  honeypot: string; // Hidden field for bot detection
}

interface FormErrors {
  name?: string;
  senderEmail?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    senderEmail: '',
    subject: '',
    message: '',
    honeypot: '' // Hidden field for bot detection
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
  const [formStartTime, setFormStartTime] = useState<number>(0);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);

    // Set form start time for bot detection
    setFormStartTime(Date.now());

    const handleLanguageChange = (event: any) => {
      setLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const translate = (english: string, spanish: string) => language === 'en' ? english : spanish;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Honeypot check - if filled, it's likely a bot
    if (formData.honeypot.trim() !== '') {
      setSubmitStatus('error');
      return false;
    }

    // Time-based bot detection - form completed too quickly (less than 3 seconds)
    const formCompletionTime = Date.now() - formStartTime;
    if (formCompletionTime < 3000) {
      setSubmitStatus('error');
      return false;
    }

    // Rate limiting check - prevent multiple submissions within 30 seconds
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime;
    if (timeSinceLastSubmission < 30000 && lastSubmissionTime > 0) {
      newErrors.message = translate(
        'Please wait 30 seconds before sending another message', 
        'Por favor espera 30 segundos antes de enviar otro mensaje'
      );
    }

    if (!formData.name.trim()) {
      newErrors.name = translate('Name is required', 'El nombre es requerido');
    } else if (formData.name.length < 2) {
      newErrors.name = translate('Name must be at least 2 characters', 'El nombre debe tener al menos 2 caracteres');
    }

    if (!formData.senderEmail.trim()) {
      newErrors.senderEmail = translate('Email is required', 'El email es requerido');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.senderEmail)) {
      newErrors.senderEmail = translate('Please enter a valid email', 'Por favor ingresa un email válido');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = translate('Subject is required', 'El asunto es requerido');
    } else if (formData.subject.length < 3) {
      newErrors.subject = translate('Subject must be at least 3 characters', 'El asunto debe tener al menos 3 caracteres');
    }

    if (!formData.message.trim()) {
      newErrors.message = translate('Message is required', 'El mensaje es requerido');
    } else if (formData.message.length < 10) {
      newErrors.message = translate('Message must be at least 10 characters', 'El mensaje debe tener al menos 10 caracteres');
    } else if (formData.message.length > 1000) {
      newErrors.message = translate('Message must be less than 1000 characters', 'El mensaje debe tener menos de 1000 caracteres');
    }

    // Check for suspicious patterns (common spam indicators)
    const spamPatterns = [
      /https?:\/\/[^\s]+/gi, // URLs
      /\b(buy|sale|discount|offer|deal|free|win|prize|click|urgent|limited)\b/gi,
      /(.)\1{5,}/gi, // Repeated characters
    ];
    
    const fullMessage = `${formData.name} ${formData.subject} ${formData.message}`.toLowerCase();
    const urlMatches = fullMessage.match(/https?:\/\/[^\s]+/gi);
    if (urlMatches && urlMatches.length > 0) {
      newErrors.message = translate('URLs are not allowed in messages', 'No se permiten URLs en los mensajes');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Set the submission timestamp for rate limiting
      setLastSubmissionTime(Date.now());

      // EmailJS configuration from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration missing. Please check environment variables.');
      }
      
      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.senderEmail,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Marcos Echague', // Your name
        reply_to: formData.senderEmail,
      };

      // Send email using EmailJS
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', senderEmail: '', subject: '', message: '', honeypot: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.subtitle}>
            {translate('// Get In Touch', '// Ponte en Contacto')}
          </p>
          <h2 className={styles.title}>
            <span className={styles.bracket}>{'{ '}</span>
            {translate('Contact Me', 'Contáctame')}
            <span className={styles.bracket}>{' }'}</span>
          </h2>
          <p className={styles.description}>
            {translate(
              "Let's discuss your next project, collaboration opportunities, or just say hello!",
              "¡Hablemos sobre tu próximo proyecto, oportunidades de colaboración, o simplemente saludemos!"
            )}
          </p>
        </motion.div>

        <div className={styles.contactContent}>
          {/* Contact Info */}
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={styles.infoTitle}>
              {translate('Contact Information', 'Información de Contacto')}
            </h3>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📧</div>
              <div>
                <h4>{translate('Email', 'Correo')}</h4>
                <a href="mailto:marcos.echague@gmail.com" className={styles.infoLink}>
                  marcos.echague@gmail.com
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📱</div>
              <div>
                <h4>{translate('Phone', 'Teléfono')}</h4>
                <a href="tel:+595984748366" className={styles.infoLink}>
                  +595 984 748 366
                </a>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📍</div>
              <div>
                <h4>{translate('Location', 'Ubicación')}</h4>
                <span className={styles.infoText}>Asunción, Paraguay</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>�</div>
              <div>
                <h4>LinkedIn</h4>
                <a 
                  href="https://linkedin.com/in/marcosechague" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.infoLink}
                >
                  linkedin.com/in/marcosechague
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className={styles.contactForm}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className={styles.formTitle}>
              {translate('Send a Message', 'Enviar un Mensaje')}
            </h3>

            {submitStatus === 'success' && (
              <motion.div
                className={styles.successMessage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ✅ {translate('Message sent successfully!', '¡Mensaje enviado exitosamente!')}
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                className={styles.errorMessage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ❌ {translate('Error sending message. Please try again.', 'Error al enviar mensaje. Por favor intenta de nuevo.')}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  {translate('Name', 'Nombre')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  placeholder={translate('Your full name', 'Tu nombre completo')}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="senderEmail" className={styles.label}>
                  {translate('Email', 'Correo')} *
                </label>
                <input
                  type="email"
                  id="senderEmail"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.senderEmail ? styles.inputError : ''}`}
                  placeholder={translate('your@email.com', 'tu@correo.com')}
                />
                {errors.senderEmail && <span className={styles.errorText}>{errors.senderEmail}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>
                  {translate('Subject', 'Asunto')} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                  placeholder={translate('What is this about?', '¿De qué se trata?')}
                />
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  {translate('Message', 'Mensaje')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                  placeholder={translate('Tell me about your project or idea...', 'Cuéntame sobre tu proyecto o idea...')}
                  rows={6}
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              {/* Honeypot field - hidden from users, visible to bots */}
              <div style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                <input
                  type="text"
                  id="website"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleInputChange}
                  tabIndex={-1}
                  autoComplete="off"
                  placeholder=""
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    {translate('Sending...', 'Enviando...')}
                  </>
                ) : (
                  <>
                    {translate('Send Message', 'Enviar Mensaje')} ✈️
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}