"use client";

import Header from '../components/Header';
import DevZone from '../components/DevZone';

export default function DevZoneClient() {
  return (
    <main>
      <Header />
      
      {/* Back to Website Button */}
      <div style={{
        position: 'fixed',
        top: '100px',
        left: '2rem',
        zIndex: 1000,
      }}>
        <a 
          href="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1rem',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: '600',
            fontSize: '0.85rem',
            border: '1px solid var(--border)',
            transition: 'all 0.3s ease',
            fontFamily: 'Courier New, monospace',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary)';
            e.currentTarget.style.color = 'var(--bg-dark)';
            e.currentTarget.style.borderColor = 'var(--primary)';
            e.currentTarget.style.transform = 'translateX(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-card)';
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          ← Portfolio
        </a>
      </div>
      
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)',
        padding: '8rem 0 2rem 0',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            margin: '0 0 1rem 0',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '800'
          }}>
            🚀 DevZone
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: 'var(--text-secondary)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Interactive technical playground for backend development, system architecture, and engineering best practices.
          </p>
          
          {/* Breadcrumb */}
          <div style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            fontFamily: 'Courier New, monospace'
          }}>
            <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Portfolio</a>
            <span style={{ margin: '0 0.5rem', color: 'var(--border)' }}>/</span>
            <span>DevZone</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <DevZone />
      
      <footer style={{
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border)',
        padding: '3rem 2rem',
        textAlign: 'center'
      }}>
        <p style={{
          color: 'var(--text-secondary)', 
          fontFamily: 'Courier New, monospace',
          margin: '0'
        }}>
          © 2025 Marcos Echague DevZone. Explore, Learn, Build.
        </p>
      </footer>
    </main>
  );
}