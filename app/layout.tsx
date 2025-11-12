import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'Marcos Echague | Backend Java Developer',
  description: 'Backend Java Developer specialized in Banking, Healthcare & E-commerce. AI Development enthusiast.',
  keywords: ['Java', 'Spring Boot', 'Backend Developer', 'AI Development', 'React', 'Next.js'],
  authors: [{ name: 'Marcos Echague' }],
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
