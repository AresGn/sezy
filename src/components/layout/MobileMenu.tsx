'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { MessageCircle, X } from 'lucide-react'

import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Logistique', href: '/logistique' },
  { label: 'Shopping', href: '/shopping' },
  { label: 'Études', href: '/etudes' },
  { label: 'Suivi colis', href: '/suivi' },
  { label: 'Blog', href: '/blog' },
]

interface MobileMenuProps {
  whatsappUrl: string
}

/**
 * Menu mobile pour le header SEZY
 * Client Component avec animations style template 21
 *
 * ANIMATIONS :
 * - Hamburger : rotation et transformation des lignes
 * - Drawer : slide-in depuis la droite
 * - Content : zoom-in/zoom-out avec animations fluides
 * - Overlay : backdrop-blur avec transition
 */
export function MobileMenu({ whatsappUrl }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="lg:hidden">
      {/* Hamburger Button - Style template 21 */}
      <button
        onClick={toggleMenu}
        className="relative w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-md transition-colors duration-200"
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={isOpen}
        type="button"
      >
        <div className="relative w-5 h-5">
          {/* Top line */}
          <span
            className={`
              absolute left-0 w-5 h-0.5 bg-current rounded-full
              transition-all duration-300 ease-out
              ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}
            `}
          />
          {/* Middle line */}
          <span
            className={`
              absolute top-1/2 left-0 w-5 h-0.5 bg-current rounded-full
              transition-all duration-300 ease-out
              ${isOpen ? 'opacity-0 translate-x-2' : 'top-1/2 -translate-y-1/2'}
            `}
          />
          {/* Bottom line */}
          <span
            className={`
              absolute left-0 w-5 h-0.5 bg-current rounded-full
              transition-all duration-300 ease-out
              ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}
            `}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay - Template 21 style */}
      <div
        className={cn(
          'fixed inset-0 bg-sezy-navy/95 backdrop-blur-sm z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={closeMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          flex flex-col shadow-xl
        `}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="font-heading text-xl font-extrabold text-sezy-navy">SEZY</span>
          <button
            onClick={closeMenu}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Fermer le menu"
            type="button"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Links avec animations */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div
            className={cn(
              'transition-all duration-300 ease-out px-2 space-y-1',
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
            )}
          >
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block px-4 py-3 text-gray-700 font-medium rounded-md hover:bg-sezy-navy hover:text-white transition-all duration-200"
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* CTA WhatsApp - Fixed at bottom */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <a
            href={whatsappUrl}
            onClick={closeMenu}
            className="bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold px-6 py-3 rounded-btn flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Nous contacter</span>
          </a>
        </div>
      </div>
    </div>
  )
}
