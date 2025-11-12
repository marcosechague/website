import type { Metadata } from 'next';
import DevZoneClient from './DevZoneClient';

export const metadata: Metadata = {
  title: 'DevZone - Marcos Echague | Technical Blog & Demos',
  description: 'Interactive technical demonstrations, tutorials, and insights about backend development, microservices, databases, and AI integration.',
  keywords: ['Backend Development', 'Java', 'Spring Boot', 'Microservices', 'Database', 'API', 'Technical Blog', 'DevZone'],
  authors: [{ name: 'Marcos Echague' }],
  openGraph: {
    title: 'DevZone - Technical Blog & Demos',
    description: 'Interactive technical demonstrations, tutorials, and insights about backend development, microservices, databases, and AI integration.',
    url: '/devzone',
    siteName: 'Marcos Echague Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevZone - Technical Blog & Demos',
    description: 'Interactive technical demonstrations, tutorials, and insights about backend development, microservices, databases, and AI integration.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/devzone',
  }
};

export default function DevZonePage() {
  return <DevZoneClient />;
}