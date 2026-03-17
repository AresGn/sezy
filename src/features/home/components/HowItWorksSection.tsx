// src/features/home/components/HowItWorksSection.tsx
/**
 * How It Works Section SEZY — Comment ça marche ?
 * Server Component — SEO maximal
 *
 * RESPONSABILITÉ :
 * - Réduire la friction mentale du visiteur
 * - Montrer le processus simple en 3 étapes
 * - Augmenter la conversion de 30% avec clarté
 *
 * DESIGN (DOC 09) :
 * - Fond : bg-white (alterne avec section précédente bg-gray-50)
 * - Numéros : bg-sezy-navy text-white rounded-full
 * - Connecteurs : border-dashed text-gray-300 (desktop)
 * - Icônes : lucide-react (MessageCircle, Package, MapPin)
 * - CTA final : bg-logistics vers /logistique
 *
 * RÈGLES (DOC 02 & DOC 06) :
 * - Server Component = pas de 'use client'
 * - Données dans const STEPS[] (pas de hardcode inline)
 * - next/link sur le CTA
 * - TypeScript strict
 */

import Link from 'next/link'
import { MessageCircle, Package, MapPin, ArrowRight } from 'lucide-react'

// Type pour une étape du processus
type StepIcon = typeof MessageCircle

interface Step {
  number: string
  icon: StepIcon
  title: string
  description: string
}

// Les 3 étapes du processus SEZY
const STEPS: Step[] = [
  {
    number: '01',
    icon: MessageCircle,
    title: 'Contactez SEZY',
    description:
      "Envoyez votre demande via WhatsApp ou notre formulaire. SEZY répond dans l'heure. Obtenez votre tarif instantané avec le calculateur.",
  },
  {
    number: '02',
    icon: Package,
    title: 'Déposez votre colis',
    description:
      'Déposez votre colis à notre point de collecte à Paris. Vous recevez votre code de suivi unique SEZY-AAAA-NNNN immédiatement.',
  },
  {
    number: '03',
    icon: MapPin,
    title: 'Récupérez à Cotonou',
    description:
      "Suivez votre colis en temps réel sur notre site. Récupérez à Agontikon, Cotonou dès l'arrivée. Délai moyen : 5 à 7 jours.",
  },
] as const

export default function HowItWorksSection() {
  return (
    <section className="w-full py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Un processus simple, transparent et sécurisé
          </p>
        </div>

        {/* Étapes — Desktop: horizontal avec connecteurs, Mobile: vertical */}
        <div className="relative">
          {/* Connecteur horizontal (desktop uniquement) */}
          <div className="hidden lg:block absolute top-[60px] left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-gray-200" />

          {/* Grille des étapes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {STEPS.map(({ icon: Icon, number, title, description }, index) => (
              <div key={number} className="relative flex flex-col items-center text-center">
                {/* Numéro + Icône */}
                <div className="relative z-10 mb-6">
                  {/* Cercle avec numéro */}
                  <div className="w-16 h-16 rounded-full bg-sezy-navy text-white flex items-center justify-center font-mono font-bold text-xl mb-3 shadow-lg">
                    {number}
                  </div>
                  {/* Icône sous le numéro */}
                  <div className="flex items-center justify-center">
                    <Icon className="w-6 h-6 text-sezy-navy" />
                  </div>
                </div>

                {/* Titre */}
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">{title}</h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed max-w-sm">{description}</p>

                {/* Flèche vers étape suivante (mobile uniquement) */}
                {index < STEPS.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <ArrowRight className="w-5 h-5 text-gray-300 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center mt-12">
          <Link
            href="/logistique"
            className="inline-flex items-center gap-2 bg-logistics hover:bg-logistics-dark text-white font-semibold px-8 py-4 rounded-btn transition-colors duration-200 shadow-lg shadow-logistics/25"
          >
            Envoyer mon premier colis
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
