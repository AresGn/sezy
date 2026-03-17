// src/features/home/components/CtaSection.tsx
/**
 * CTA Section SEZY — Appel à l'action final
 * Server Component — Conversion des visiteurs engagés
 *
 * RESPONSABILITÉ :
 * - Convertir les visiteurs qui ont scrollé jusqu'ici
 * - Proposer deux options : calcul de tarif (explorateur) ou WhatsApp (décideur)
 * - Créer l'urgence avec réassurances visibles
 *
 * DESIGN (DOC 09) :
 * - Fond : bg-sezy-navy (#1B3A6B) — contraste fort
 * - Titre : text-white font-heading ExtraBold
 * - Sous-titre : text-white/80
 * - CTA 1 : bg-logistics (#3B82F6) — "Calculer mon tarif"
 * - CTA 2 : bg-whatsapp (#25D366) — "💬 WhatsApp SEZY"
 * - Réassurances : text-white/60 avec checkmarks
 *
 * RÈGLES (DOC 02 & DOC 06) :
 * - Server Component = pas de 'use client'
 * - next/link pour CTA interne (/logistique)
 * - <a target="_blank"> pour WhatsApp externe
 * - URL WhatsApp encodée avec message pré-rempli
 * - TypeScript strict
 */

import Link from 'next/link'
import { Calculator, MessageCircle, Plane, Check } from 'lucide-react'

import { getWhatsAppUrl } from '@/lib/whatsapp'

export default function CtaSection() {
  const whatsappLink = getWhatsAppUrl('home')

  return (
    <section className="relative w-full py-16 lg:py-24 bg-sezy-navy overflow-hidden">
      {/* Illustration décorative — avion stylisé très grand en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Plane className="w-[600px] h-[600px] text-white/5 rotate-[-15deg]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Titre principal */}
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
          Prêt à expédier votre premier colis ?
        </h2>

        {/* Sous-titre */}
        <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Rejoignez +2000 clients qui nous font confiance entre Paris et Cotonou.
        </p>

        {/* Double CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          {/* CTA 1 : Calculer mon tarif (explorateur) */}
          <Link
            href="/logistique"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-logistics hover:bg-logistics-dark text-white font-semibold px-8 py-4 rounded-btn transition-colors duration-200 shadow-lg"
          >
            <Calculator className="w-5 h-5" />
            Calculer mon tarif
          </Link>

          {/* CTA 2 : WhatsApp (décideur) */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold px-8 py-4 rounded-btn transition-colors duration-200 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Nous contacter sur WhatsApp
          </a>
        </div>

        {/* Réassurances */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/60 text-sm">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-logistics" />
            Réponse sous 1 heure
          </span>
          <span className="hidden sm:inline text-white/30">·</span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-logistics" />
            Sans engagement
          </span>
          <span className="hidden sm:inline text-white/30">·</span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-logistics" />
            RCCM vérifié
          </span>
        </div>
      </div>
    </section>
  )
}
