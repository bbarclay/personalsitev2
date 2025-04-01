'use client'

import dynamic from 'next/dynamic'

// Use dynamic import to avoid hydration issues
const PortfolioMain = dynamic(() => import('./components/PortfolioMain'), {
  ssr: false
})

export default function PortfolioPage() {
  return <PortfolioMain />
}