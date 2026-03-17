// src/features/home/components/ServicesSection.tsx
/**
 * Services Section SEZY — Les 3 pôles d'excellence
 * Server Component — SEO maximal
 *
 * RESPONSABILITÉ :
 * - Présenter les 3 pôles SEZY avec leur couleur distincte
 * - Permettre au visiteur de s'identifier et cliquer vers son service
 * - Section la plus importante pour la navigation
 *
 * DESIGN (DOC 09) — RÈGLE ABSOLUE DES PÔLES :
 * Chaque pôle a SA COULEUR. Icône, bouton, accent = couleur du pôle.
 * - Logistique : bg-logistics (#3B82F6) | bg-logistics-bg (#EFF6FF)
 * - Shopping   : bg-shopping  (#10B981) | bg-shopping-bg  (#ECFDF5)
 * - Études     : bg-studies   (#F59E0B) | bg-studies-bg   (#FFFBEB)
 *
 * RÈGLES (DOC 02 & DOC 06) :
 * - Server Component = pas de 'use client', pas d'interactions
 * - Chaque card = sa couleur de pôle — pas de couleur unifiée
 * - next/link sur tous les CTA
 * - TypeScript strict
 */

import Link from 'next/link'
import { Package, ShoppingBag, GraduationCap, ArrowRight } from 'lucide-react'

// Types pour les pôles SEZY
type PoleColor = 'logistics' | 'shopping' | 'studies'

interface ServiceCard {
  icon: typeof Package
  title: string
  description: string
  badge: string
  cta: string
  href: string
  color: PoleColor
}

// Configuration des 3 pôles SEZY
const services: ServiceCard[] = [
  {
    icon: Package,
    title: 'Logistique & Transport',
    description:
      'Envoi de colis Paris ↔ Cotonou. Tarifs transparents : 20€/kg depuis Paris, 10 000 FCFA/kg depuis Cotonou. Vols réguliers, suivi en temps réel.',
    badge: 'Depuis 20€/kg',
    cta: 'Calculer mon tarif',
    href: '/logistique',
    color: 'logistics',
  },
  {
    icon: ShoppingBag,
    title: 'Shopping & Bien-être',
    description:
      'Cosmétiques premium, Maca Bio, Baies de Goji, Collagène, Vitamines. Conciergerie shopping et livraison directe à Cotonou.',
    badge: 'Produits certifiés',
    cta: 'Voir le catalogue',
    href: '/shopping',
    color: 'shopping',
  },
  {
    icon: GraduationCap,
    title: 'Études & Carrière',
    description:
      "Coaching scolaire, aide à l'admission, visa, logement et installation en France ou Canada. Accompagnement personnalisé de A à Z.",
    badge: 'France & Canada',
    cta: 'Ma checklist',
    href: '/etudes',
    color: 'studies',
  },
]

// Mapping des couleurs selon le pôle (DOC 09)
const colorStyles = {
  logistics: {
    bg: 'bg-logistics-bg',
    icon: 'text-logistics',
    iconBg: 'bg-logistics/10',
    badge: 'bg-logistics/10 text-logistics',
    cta: 'bg-logistics hover:bg-logistics-dark',
    ring: 'group-hover:ring-logistics/20',
  },
  shopping: {
    bg: 'bg-shopping-bg',
    icon: 'text-shopping',
    iconBg: 'bg-shopping/10',
    badge: 'bg-shopping/10 text-shopping',
    cta: 'bg-shopping hover:bg-shopping-dark',
    ring: 'group-hover:ring-shopping/20',
  },
  studies: {
    bg: 'bg-studies-bg',
    icon: 'text-studies',
    iconBg: 'bg-studies/10',
    badge: 'bg-studies/10 text-studies',
    cta: 'bg-studies hover:bg-studies-dark',
    ring: 'group-hover:ring-studies/20',
  },
} as const

export default function ServicesSection() {
  return (
    <section className="w-full py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Pôles d'Excellence
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Un seul partenaire pour tous vos besoins Europe-Afrique
          </p>
        </div>

        {/* Grille 3 pôles : 1 colonne mobile, 3 colonnes desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map(({ icon: Icon, title, description, badge, cta, href, color }) => {
            const styles = colorStyles[color]

            return (
              <div
                key={href}
                className={`group relative bg-white rounded-card shadow-card hover:shadow-card-hover border border-gray-100 p-6 lg:p-8 transition-all duration-200 hover:-translate-y-1 ${styles.ring} ring-0 ring-offset-2`}
              >
                {/* Icône avec fond coloré du pôle */}
                <div
                  className={`w-14 h-14 rounded-xl ${styles.bg} flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-7 h-7 ${styles.icon}`} />
                </div>

                {/* Badge */}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${styles.badge} mb-4`}
                >
                  {badge}
                </span>

                {/* Titre */}
                <h3 className="font-heading text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

                {/* CTA avec couleur du pôle */}
                <Link
                  href={href}
                  className={`inline-flex items-center gap-2 ${styles.cta} text-white font-semibold px-6 py-3 rounded-btn transition-colors duration-200`}
                >
                  {cta}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
