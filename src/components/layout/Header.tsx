// src/components/layout/Header.tsx
/**
 * Header principal du site SEZY
 * Server Component - SEO maximal, pas de 'use client'
 *
 * RESPONSABILITÉ :
 * - Navigation principale desktop avec animations scroll (template 21)
 * - Logo SEZY agrandi (next/image)
 * - Bouton CTA WhatsApp
 * - Intégration du menu mobile (Client Component)
 *
 * DESIGN :
 * - Animations scroll : backdrop-blur, border, shadow au scroll
 * - Logo plus grand : w-32 h-10 (au lieu de w-24 h-8)
 * - Fond : bg-sezy-navy avec transparence et backdrop-blur
 *
 * REGLES (DOC 02 & DOC 06) :
 * - Server Component = pas de useState, pas d'interactions directes
 * - Mobile menu = extraire en Client Component séparé (MobileMenu.tsx)
 */

import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'

import { getWhatsAppUrl } from '@/lib/whatsapp'

import { HeaderWrapper } from './HeaderWrapper'
import { MobileMenu } from './MobileMenu'

// Configuration des liens de navigation
const navLinks = [
  { label: 'Logistique', href: '/logistique' },
  { label: 'Shopping', href: '/shopping' },
  { label: 'Études', href: '/etudes' },
  { label: 'Suivi colis', href: '/suivi' },
  { label: 'Blog', href: '/blog' },
] as const

export default function Header() {
  const whatsappUrl = getWhatsAppUrl('home')
  return (
    <HeaderWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo SEZY - Version image agrandie */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
          >
            <div className="relative w-32 h-10">
              <Image
                src="/logo.jpg"
                alt="SEZY - Passerelle Europe-Afrique"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA WhatsApp - TOUJOURS bg-whatsapp (#25D366) - DOC 09 VIS-001 */}
          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              className="hidden sm:flex bg-whatsapp hover:bg-whatsapp-dark text-white text-sm font-semibold px-5 py-2.5 rounded-btn items-center gap-2 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Nous contacter</span>
            </a>

            {/* Menu Mobile - Client Component */}
            <MobileMenu whatsappUrl={whatsappUrl} />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  )
}
