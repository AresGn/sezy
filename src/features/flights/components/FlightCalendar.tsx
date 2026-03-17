/**
 * features/flights/components/FlightCalendar.tsx
 *
 * RESPONSABILITÉ :
 * - Afficher la liste des vols programmés sous forme de tableau/liste élégante
 * - Server Component strict : reçoit les données du service
 *
 * DESIGN SYSTEM :
 * - bg-logistics pour les accents
 * - font-mono pour les prix
 * - rounded-card + shadow-card
 */

import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Plane, Calendar, MapPin } from 'lucide-react'

import { FlightDisplay } from '../types'

interface FlightCalendarProps {
  flights: FlightDisplay[]
}

export default function FlightCalendar({ flights }: FlightCalendarProps) {
  if (flights.length === 0) {
    return (
      <div className="bg-white rounded-card shadow-card p-12 text-center border border-gray-100">
        <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4 opacity-50" />
        <p className="text-gray-500 font-sans">Aucun vol programmé pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-logistics/10 flex items-center justify-center text-logistics">
          <Calendar className="w-5 h-5" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-sezy-navy">
          Calendrier des vols à venir
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flights.map(flight => (
          <div
            key={flight.id}
            className="group bg-white rounded-card shadow-card border border-gray-100 hover:border-logistics/30 transition-all duration-300 overflow-hidden"
          >
            {/* Header avec la direction */}
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                Direction
              </span>
              <div className="flex items-center gap-2 text-logistics font-bold text-sm">
                <MapPin className="w-3 h-3" />
                {flight.direction === 'PARIS_TO_COTONOU' ? 'Paris → Cotonou' : 'Cotonou → Paris'}
              </div>
            </div>

            <div className="p-6">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Départ</p>
                  <p className="font-sans text-sm font-semibold text-sezy-navy">
                    {format(flight.departureDate, 'd MMMM yyyy', { locale: fr })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">
                    Arrivée (est.)
                  </p>
                  <p className="font-sans text-sm font-semibold text-gray-600">
                    {format(flight.arrivalDate, 'd MMMM yyyy', { locale: fr })}
                  </p>
                </div>
              </div>

              {/* Tarifs */}
              <div className="flex items-center justify-between pt-4 border-t border-dashed border-gray-100">
                <div className="flex flex-col">
                  <p className="text-[10px] uppercase text-gray-400 font-bold">Tarif au kg</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xl font-bold text-logistics">
                      {(flight.priceEur / 100).toFixed(0)}€
                    </span>
                    <span className="text-xs text-gray-400">/</span>
                    <span className="font-mono text-sm font-medium text-gray-500">
                      {flight.priceFcfa.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-logistics flex items-center justify-center text-white shadow-lg shadow-logistics/20 group-hover:scale-110 transition-transform">
                  <Plane className="w-5 h-5" />
                </div>
              </div>

              {/* Notes éventuelles */}
              {flight.notes && (
                <p className="mt-4 text-[11px] text-gray-400 italic leading-relaxed line-clamp-2">
                  * {flight.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
