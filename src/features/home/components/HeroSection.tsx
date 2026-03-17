// src/features/home/components/HeroSection.tsx
/**
 * Hero Section SEZY - Section d'accueil principale
 * Server Component avec animations CSS globales (pas de Framer Motion)
 *
 * RESPONSABILITÉ :
 * - Première impression en 3 secondes
 * - Afficher le H1 SEO avec "Paris" + "Cotonou"
 * - CTA principal "Suivre mon colis" + CTA WhatsApp "Calculer mon tarif"
 * - Badges de confiance (RCCM, +2000 colis, Paris-Cotonou)
 */

import Link from 'next/link'
import { MessageCircle, Package, Plane, Shield } from 'lucide-react'

import { cn } from '@/lib/utils'

interface HeroSectionProps {
  className?: string
}

export default function HeroSection({ className }: HeroSectionProps) {
  // Badges de confiance
  const trustBadges = [
    { icon: Shield, label: 'RCCM RB/PNO/23B4553' },
    { icon: Package, label: '+2000 colis livrés' },
    { icon: Plane, label: 'Paris ↔ Cotonou' },
  ] as const

  return (
    <section
      className={cn(
        'relative w-full min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden',
        'bg-gradient-to-br from-sezy-navy via-[#1e4d8c] to-sezy-navy',
        className,
      )}
    >
      {/* Motif subtil en arrière-plan */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo badge */}
          <div className="opacity-0 animate-fade-in-up inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-logistics animate-pulse" />
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
              Tout en 1 — Disponible 24h/24
            </span>
          </div>

          <h1 className="opacity-0 animate-fade-in-up animate-delay-100 font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Votre Passerelle <span className="text-logistics">Privilégiée</span> entre l'Europe et
            l'Afrique
          </h1>

          <p className="opacity-0 animate-fade-in-up animate-delay-200 text-lg sm:text-xl md:text-2xl text-white/80 font-sans max-w-2xl mx-auto mb-10 leading-relaxed">
            Colis, Shopping, Études — De <span className="text-white font-semibold">Paris</span> à{' '}
            <span className="text-white font-semibold">Cotonou</span>, on gère tout.
          </p>

          <div className="opacity-0 animate-fade-in-up animate-delay-300 flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Link
              href="/suivi"
              className="w-full sm:w-auto bg-logistics hover:bg-logistics-dark text-white font-semibold px-8 py-4 rounded-btn transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-logistics/25"
            >
              <Package className="w-5 h-5" />
              Suivre mon colis
            </Link>

            <Link
              href="/logistique"
              className="w-full sm:w-auto bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold px-8 py-4 rounded-btn transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg shadow-whatsapp/25"
            >
              <MessageCircle className="w-5 h-5" />
              Calculer mon tarif
            </Link>
          </div>

          <div className="opacity-0 animate-fade-in-up animate-delay-400 flex flex-wrap justify-center gap-4 md:gap-6">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon className="w-4 h-4 text-logistics" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
