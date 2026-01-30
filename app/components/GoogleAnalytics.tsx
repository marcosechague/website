'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Wait for gtag to be available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      // Send pageview to Google Analytics
      ;(window as any).gtag('config', 'G-QLVFZ4RQMR', {
        page_path: pathname,
      })
    }
  }, [pathname])

  return null
}
