/**
 * features/flights/components/NextFlightBanner.tsx
 *
 * RESPONSABILITÉ :
 * - Afficher une petite bannière accrocheuse pour le prochain vol imminent
 * - Inciter à la réservation immédiate
 */

import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Plane, ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { FlightDisplay } from '../types'

interface NextFlightBannerProps {
  flight: FlightDisplay | null
}

export default function NextFlightBanner({ flight }: NextFlightBannerProps) {
  if (!flight) return null

  return (
    <div className="bg-logistics text-white px-4 py-3 sm:py-4 rounded-xl shadow-lg shadow-logistics/20 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex w-10 h-10 bg-white/20 rounded-full items-center justify-center">
          <Plane className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] uppercase font-bold text-white/70 tracking-widest leading-none mb-1">
            ⚠️ Prochaine Expédition SEZY
          </p>
          <p className="font-sans text-sm font-semibold">
            Départ le {format(flight.departureDate, 'd MMMM', { locale: fr })} —{' '}
            {flight.direction === 'PARIS_TO_COTONOU' ? 'Paris vers Cotonou' : 'Cotonou vers Paris'}
          </p>
        </div>
      </div>

      <div className="flex-1 hidden sm:block border-l border-white/20 ml-4 pl-4">
        <p className="text-xs text-white/80 line-clamp-1">
          {flight.notes || "Réservez votre place dès aujourd'hui pour cet envoi sécurisé."}
        </p>
      </div>

      <Link
        href="#calculator"
        className="bg-white text-logistics hover:bg-gray-50 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
      >
        Réserver <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  )
}
