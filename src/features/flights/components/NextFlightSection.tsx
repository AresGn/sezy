// src/features/flights/components/NextFlightSection.tsx
/**
 * Next Flight Section SEZY — Prochain vol Paris → Cotonou
 * Async Server Component — Lit Prisma via le service
 *
 * RESPONSABILITÉ :
 * - Créer l'urgence et montrer que SEZY est actif
 * - Afficher le prochain vol programmé avec disponibilité
 * - Convertir les visiteurs avec CTA WhatsApp
 *
 * DESIGN (DOC 09) :
 * - Fond : bg-sezy-navy (#1B3A6B) — section sombre, impact fort
 * - Texte : blanc pur
 * - Accent : text-logistics (#3B82F6) pour les chiffres clés
 * - Badge "Prochain vol" : bg-logistics text-white
 * - CTA : bg-whatsapp (#25D366) "Réserver ma place"
 * - Icône avion : Plane (lucide-react) en blanc
 *
 * RÈGLES (DOC 02 & DOC 06) :
 * - Async Server Component = pas de 'use client'
 * - Appel au service : await getNextFlight()
 * - JAMAIS d'import Prisma directement — uniquement via le service
 * - Gestion du cas null (aucun vol programmé)
 * - TypeScript strict
 */

import { Plane, Calendar, MapPin, Users, MessageCircle } from 'lucide-react'

import { getNextFlight } from '@/features/flights/services/flight.service'
import { getWhatsAppUrl } from '@/lib/whatsapp'

/**
 * Formate une date en français (ex: "15 Avril 2026")
 */
function formatFlightDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

/**
 * Formate l'heure (ex: "10h00")
 */
function formatFlightTime(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  })
    .format(date)
    .replace(':', 'h')
}

/**
 * Calcule le pourcentage de places disponibles pour la barre visuelle
 */
function calculateAvailabilityPercentage(available: number, total: number = 50): number {
  return Math.min(Math.round((available / total) * 100), 100)
}

export default async function NextFlightSection() {
  const flight = await getNextFlight()

  // CAS AUCUN VOL PROGRAMMÉ
  if (!flight) {
    const whatsappLink = getWhatsAppUrl('contact')

    return (
      <section className="w-full py-12 lg:py-16 bg-sezy-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Icône avion */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Plane className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Titre */}
          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4">
            Prochain vol en cours de programmation
          </h2>

          {/* Message */}
          <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
            Contactez-nous sur WhatsApp pour être notifié dès que le prochain vol Paris → Cotonou
            est ouvert.
          </p>

          {/* CTA WhatsApp */}
          <a
            href={whatsappLink}
            className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold px-8 py-4 rounded-btn transition-colors duration-200 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Être notifié sur WhatsApp
          </a>
        </div>
      </section>
    )
  }

  // CAS VOL DISPONIBLE
  const departureDate = new Date(flight.departureDate)
  const formattedDate = formatFlightDate(departureDate)
  const formattedTime = formatFlightTime(departureDate)
  const priceEur = (flight.priceEur / 100).toFixed(0)
  const priceFcfa = flight.priceFcfa.toLocaleString('fr-FR')
  const availabilityPercent = calculateAvailabilityPercentage(flight.availableSpots)

  const whatsappLink = getWhatsAppUrl('logistics', { flightDate: formattedDate })

  return (
    <section className="w-full py-12 lg:py-16 bg-sezy-navy">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-card border border-white/10 p-6 lg:p-8">
          {/* Badge Prochain vol */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-logistics text-white text-xs font-semibold px-3 py-1 rounded-full">
              <Plane className="w-3 h-3" />
              PROCHAIN VOL
            </span>
          </div>

          {/* Route */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-logistics" />
              <div>
                <p className="text-white/60 text-sm">Départ</p>
                <p className="text-white font-semibold">{flight.origin}</p>
              </div>
            </div>

            <div className="hidden sm:block flex-1 border-t border-dashed border-white/20 mx-4" />
            <div className="sm:hidden flex justify-center">
              <Plane className="w-5 h-5 text-white/40 rotate-90" />
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-whatsapp" />
              <div>
                <p className="text-white/60 text-sm">Arrivée</p>
                <p className="text-white font-semibold">{flight.destination}</p>
              </div>
            </div>
          </div>

          {/* Date et heure */}
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-5 h-5 text-logistics" />
            <p className="text-white text-lg">
              <span className="font-semibold">{formattedDate}</span>
              <span className="text-white/60 mx-2">—</span>
              <span className="font-mono">{formattedTime}</span>
            </p>
          </div>

          {/* Barre de disponibilité */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-white/60" />
                <span className="text-white/80 text-sm">Places disponibles</span>
              </div>
              <span className="font-mono font-bold text-logistics">
                {flight.availableSpots} places
              </span>
            </div>
            {/* Barre avec blocs visuels */}
            <div className="flex gap-1">
              {Array.from({ length: 10 }, (_, i) => {
                const isFilled = i < Math.floor(availabilityPercent / 10)
                const isPartialFilled =
                  i === Math.floor(availabilityPercent / 10) && availabilityPercent % 10 > 0

                return (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-sm transition-all duration-500 ${
                      isFilled
                        ? 'bg-logistics'
                        : isPartialFilled
                          ? 'bg-gradient-to-r from-logistics to-logistics/30'
                          : 'bg-white/10'
                    }`}
                  />
                )
              })}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-white/40">0</span>
              <span className="text-xs text-white/40">50 places</span>
            </div>
          </div>

          {/* Tarif */}
          <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white/5 rounded-lg">
            <span className="text-white/60 text-sm">Tarif :</span>
            <span className="font-mono font-bold text-white text-lg">{priceEur} €/kg</span>
            <span className="text-white/40">|</span>
            <span className="font-mono font-bold text-white text-lg">{priceFcfa} FCFA/kg</span>
          </div>

          {/* CTA WhatsApp */}
          <a
            href={whatsappLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold px-8 py-4 rounded-btn transition-colors duration-200 shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            Réserver ma place via WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
