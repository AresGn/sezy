// src/features/home/components/StatsSection.tsx
/**
 * Stats Section SEZY — Section de confiance post-Hero
 * Server Component — SEO maximal, aucune animation
 *
 * RESPONSABILITÉ :
 * - Afficher 4 chiffres clés SEZY pour la crédibilité
 * - Construire la confiance en 5 secondes de scroll
 * - Contraster avec le Hero navy (fond clair)
 *
 * DESIGN (DOC 09) :
 * - Fond : bg-gray-50 (#F8FAFC)
 * - Cards : shadow-card, rounded-card (12px), border border-gray-100
 * - Chiffres : font-mono font-bold (JetBrains Mono — aspect technique/precis)
 * - Labels : font-sans text-gray-500
 * - Accent : text-sezy-navy pour les grands chiffres
 * - Icônes : lucide-react (Package, Plane, Star, Target)
 *
 * STATS EXACTES :
 * 1. +2000 Colis livrés
 * 2. Vols réguliers Paris ↔ Cotonou
 * 3. 4.9 / 5 Satisfaction
 * 4. 3 pôles de services
 *
 * RÈGLES (DOC 02 & DOC 06) :
 * - Server Component = pas de 'use client', pas de useState
 * - Données hardcodées (pas de DB dans ce composant)
 * - TypeScript strict
 */

import { Package, Plane, Star, Target } from 'lucide-react'

// Configuration des statistiques SEZY
const stats = [
  {
    icon: Package,
    value: '+2000',
    label: 'Colis livrés',
    subtext: 'Depuis 2023',
  },
  {
    icon: Plane,
    value: 'Paris ↔ Cotonou',
    label: 'Vols réguliers',
    subtext: 'Toutes les semaines',
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Satisfaction',
    subtext: '+150 avis clients',
  },
  {
    icon: Target,
    value: '3',
    label: 'Pôles de services',
    subtext: 'Logistique, Shopping, Études',
  },
] as const

export default function StatsSection() {
  return (
    <section className="w-full py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre introductif */}
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-sezy-navy mb-4">
            SEZY EN CHIFFRES
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Plus qu'une simple agence, un écosystème complet qui connecte l'Europe et l'Afrique. Nos
            chiffres parlent de notre engagement et de votre confiance.
          </p>
        </div>

        {/* Grille responsive : 2 colonnes mobile, 4 colonnes desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map(({ icon: Icon, value, label, subtext }, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 p-5 lg:p-6 bg-white border border-gray-100 rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              {/* Icône en haut */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sezy-navy/10 mb-2">
                <Icon className="w-5 h-5 text-sezy-navy" />
              </div>

              {/* Valeur / Chiffre — font-mono pour aspect technique */}
              <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-sezy-navy tracking-tight">
                {value}
              </div>

              {/* Label */}
              <div className="text-sm sm:text-base font-semibold text-gray-900">{label}</div>

              {/* Sous-texte descriptif */}
              <div className="text-xs sm:text-sm text-gray-500 leading-relaxed">{subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
