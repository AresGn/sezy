// src/features/home/components/TestimonialsSection.tsx
/**
 * Testimonials Section SEZY — Ce que disent nos clients
 * Server Component — Preuve sociale critique pour le marché africain
 *
 * RESPONSABILITÉ :
 * - Établir la confiance via des témoignages réels de clients
 * - Répondre à "Est-ce qu'ils sont sérieux ?"
 * - Augmenter la conversion via la preuve sociale
 *
 * DESIGN (DOC 09) :
 * - Fond : bg-gray-50 (#F8FAFC)
 * - Cards : bg-white shadow-card rounded-card border border-gray-100
 * - Étoiles : text-studies (#F59E0B) — couleur or/ambre
 * - Avatars : initiales CSS avec couleur du pôle correspondant
 *
 * RÈGLES (DOC 02 & DOC 06) :
 * - Server Component = pas de 'use client'
 * - Données hardcodées dans const TESTIMONIALS[]
 * - Avatars CSS uniquement — PAS de next/image
 * - TypeScript strict
 */

import { Star, Quote } from 'lucide-react'

// Type pour un témoignage
type AvatarColor = 'logistics' | 'shopping' | 'studies'

interface Testimonial {
  id: string
  initials: string
  name: string
  role: string
  rating: number
  text: string
  color: AvatarColor
}

// Les 3 témoignages SEZY (preuve sociale africaine)
const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    initials: 'AK',
    name: 'Aminata Koffi',
    role: 'Étudiante en Master, Paris',
    rating: 5,
    text: "Grâce à SEZY, j'ai reçu mes produits Maca et Collagène directement à Paris. Livraison rapide, emballage impeccable. Je recommande vivement !",
    color: 'shopping', // Shopping & Bien-être
  },
  {
    id: '2',
    initials: 'JS',
    name: 'Jean-Baptiste Sossou',
    role: "Chef d'entreprise, Cotonou",
    rating: 5,
    text: "Mes colis de Paris arrivent toujours à temps. Le suivi en ligne est parfait. SEZY m'a sauvé plusieurs fois pour des livraisons urgentes.",
    color: 'logistics', // Logistique & Transport
  },
  {
    id: '3',
    initials: 'MD',
    name: 'Marie-Claire Dossou',
    role: 'Étudiante, Bordeaux → Cotonou',
    rating: 5,
    text: "L'accompagnement études de SEZY est exceptionnel. Visa obtenu, logement trouvé, installation réussie. Merci à toute l'équipe !",
    color: 'studies', // Études & Carrière
  },
] as const

// Mapping des couleurs selon le pôle
const avatarStyles = {
  logistics: 'bg-logistics text-white',
  shopping: 'bg-shopping text-white',
  studies: 'bg-studies text-white',
} as const

/**
 * Composant pour afficher les étoiles de notation
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-studies fill-studies' : 'text-gray-200'}`}
        />
      ))}
    </div>
  )
}

/**
 * Composant pour un avatar avec initiales
 */
function InitialsAvatar({ initials, color }: { initials: string; color: AvatarColor }) {
  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-sm ${avatarStyles[color]}`}
    >
      {initials}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="w-full py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de section */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ils nous ont fait confiance pour leurs projets Europe-Afrique
          </p>
        </div>

        {/* Grille des témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map(({ id, initials, name, role, rating, text, color }) => (
            <div
              key={id}
              className="relative bg-white rounded-card shadow-card border border-gray-100 p-6 lg:p-8 flex flex-col"
            >
              {/* Guillemets décoratifs */}
              <div className="absolute top-4 right-4 text-sezy-navy/10">
                <Quote className="w-8 h-8" />
              </div>

              {/* Étoiles */}
              <div className="mb-4">
                <StarRating rating={rating} />
              </div>

              {/* Texte du témoignage */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 flex-grow">
                "{text}"
              </blockquote>

              {/* Auteur */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <InitialsAvatar initials={initials} color={color} />
                <div>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
