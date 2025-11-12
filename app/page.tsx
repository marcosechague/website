"use client";

import Header from './components/Header'
import Hero from './components/Hero'
import DevZoneButton from './components/DevZoneButton'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      
      {/* Terminal Social Links */}
      <div style={{
        position: 'fixed',
        left: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        zIndex: 100,
        background: 'var(--bg-card)',
        padding: '1rem 0.5rem',
        borderRadius: '8px',
        border: '1px solid var(--border)'
      }}>
        <a href="https://github.com/marcosechague" target="_blank" title="GitHub" style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          transition: 'all 0.3s',
          borderRadius: '6px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: '20px', height: '20px'}}>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/marcosechague/" target="_blank" title="LinkedIn" style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          transition: 'all 0.3s',
          borderRadius: '6px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style={{width: '20px', height: '20px'}}>
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
      </div>

      {/* Placeholder for other sections - you can create components for these */}
      <section id="about" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '6rem 2rem',
        minHeight: '100vh'
      }}>
        <div style={{marginBottom: '4rem'}}>
          <p style={{color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'Courier New, monospace'}}>
            // About Me
          </p>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
            <span style={{color: 'var(--primary)'}}>{'{ '}</span>
            Overview
            <span style={{color: 'var(--primary)'}}>{' }'}</span>
          </h2>
        </div>
        <p style={{color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '800px'}}>
          I'm a Backend Java Developer with expertise in building enterprise applications for Banking, Healthcare, and E-commerce. 
          Specialized in Spring Boot, PostgreSQL, Docker, and AWS. Currently integrating AI solutions with OpenAI, Tavus, and 11Labs.
        </p>
      </section>

      <section id="experience" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '6rem 2rem',
        minHeight: '100vh',
        background: 'rgba(20, 27, 61, 0.3)'
      }}>
        <div style={{marginBottom: '4rem'}}>
          <p style={{color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'Courier New, monospace'}}>
            // Career Path
          </p>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
            <span style={{color: 'var(--primary)'}}>{'{ '}</span>
            Experience
            <span style={{color: 'var(--primary)'}}>{' }'}</span>
          </h2>
        </div>
        <p style={{color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '800px'}}>
          Banking, Healthcare, E-commerce, and AI Integration projects...
        </p>
      </section>

      <section id="projects" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '6rem 2rem',
        minHeight: '100vh'
      }}>
        <div style={{marginBottom: '4rem'}}>
          <p style={{color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'Courier New, monospace'}}>
            // My Work
          </p>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
            <span style={{color: 'var(--primary)'}}>{'{ '}</span>
            Projects
            <span style={{color: 'var(--primary)'}}>{' }'}</span>
          </h2>
        </div>
        <p style={{color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '800px'}}>
          Featured projects coming soon...
        </p>
      </section>

      <section id="contact" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '6rem 2rem',
        minHeight: '100vh',
        background: 'rgba(20, 27, 61, 0.3)'
      }}>
        <div style={{marginBottom: '4rem'}}>
          <p style={{color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.5rem', fontFamily: 'Courier New, monospace'}}>
            // Get In Touch
          </p>
          <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
            <span style={{color: 'var(--primary)'}}>{'{ '}</span>
            Contact
            <span style={{color: 'var(--primary)'}}>{' }'}</span>
          </h2>
        </div>
        <p style={{color: 'var(--text-secondary)', lineHeight: '1.8', maxWidth: '800px'}}>
          Contact form coming soon...
        </p>
      </section>

      <footer style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <p style={{color: 'var(--text-secondary)', fontFamily: 'Courier New, monospace'}}>
          © 2025 Marcos Echague. Built with Next.js & passion for clean code.
        </p>
      </footer>
      
      {/* DevZone Button */}
      <DevZoneButton />
    </main>
  )
}
