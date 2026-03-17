'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

interface HeaderWrapperProps {
  children: React.ReactNode
}

/**
 * HeaderWrapper - Client Component pour animations scroll
 * Inspiré du template 21 avec backdrop-blur et transitions
 *
 * ANIMATIONS :
 * - Scroll > 10px : backdrop-blur, border, shadow
 * - Transitions smooth sur toutes les propriétés
 */
export function HeaderWrapper({ children }: HeaderWrapperProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 ease-out',
        scrolled
          ? 'bg-sezy-navy/95 backdrop-blur-lg border-b border-white/10 shadow-lg'
          : 'bg-sezy-navy border-b border-transparent',
      )}
    >
      {children}
    </header>
  )
}
