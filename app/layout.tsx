import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'Marcos Echague | Backend Java Developer',
  description: 'Backend Java Developer specialized in Banking, Healthcare & E-commerce. AI Development enthusiast.',
  keywords: ['Java', 'Spring Boot', 'Backend Developer', 'AI Development', 'React', 'Next.js'],
  authors: [{ name: 'Marcos Echague' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon-16x16.svg',
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'Marcos Echague | Backend Java Developer',
    description: 'Backend Java Developer specialized in Banking, Healthcare & E-commerce',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
