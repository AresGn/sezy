// src/components/ui/ScrollToTop.tsx
/**
 * ScrollToTop — Bouton de retour en haut de page
 * Client Component — Interactions utilisateur
 *
 * RESPONSABILITÉ :
 * - Afficher un bouton flottant pour remonter en haut de page
 * - Apparaître uniquement après un scroll de 300px
 * - Animation smooth et performante
 *
 * DESIGN (DOC 09) :
 * - Fond : bg-logistics (#3B82F6) — couleur primaire SEZY
 * - Icône : Plane de lucide-react en blanc
 * - Position : fixed bottom-right avec z-index élevé
 * - Animation : fade in/out + scale
 *
 * RÈGLES (DOC 02 & DOC 06) :
 * - Client Component = 'use client'
 * - useState + useEffect pour le scroll
 * - Transition CSS smooth
 * - TypeScript strict
 */

'use client'

import { useEffect, useState } from 'react'
import { Plane } from 'lucide-react'

import { cn } from '@/lib/utils'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Détecter le scroll pour afficher/masquer le bouton
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Écouter le scroll
    window.addEventListener('scroll', toggleVisibility)

    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-4 z-[60]', // Position mobile-friendly et z-index plus élevé
        'w-12 h-12 rounded-full', // Taille légèrement plus petite sur mobile
        'bg-logistics hover:bg-logistics-dark',
        'text-white shadow-xl', // Ombre plus forte
        'flex items-center justify-center',
        'transition-all duration-300 ease-out',
        'hover:scale-110 active:scale-95',
        'md:bottom-8 md:right-8 md:w-14 md:h-14', // Taille originale sur desktop
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none',
      )}
      aria-label="Retour en haut de page"
    >
      <Plane className="w-5 h-5 md:w-6 md:h-6 rotate-[-45deg]" />
    </button>
  )
}
