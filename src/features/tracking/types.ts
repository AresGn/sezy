import { z } from 'zod'
import { ParcelStatus, FlightDirection, FlightStatus } from '@prisma/client'

/**
 * Types et schémas pour le suivi de colis (parcel-tracking)
 *
 * RESPONSABILITÉ :
 * - Définir la structure des données Tracking retournées par le service
 * - Sécuriser les données en masquant les téléphones de l'expéditeur et du destinataire
 */

// Regex stricte exigée: SEZY-YYYY-NNNN
export const trackingSearchRegex = /^SEZY-\d{4}-\d{4}$/

export const TrackingSearchSchema = z.object({
  trackingCode: z
    .string()
    .trim()
    .toUpperCase()
    .regex(trackingSearchRegex, 'Le code doit être au format SEZY-YYYY-NNNN'),
})

export type TrackingSearchInput = z.infer<typeof TrackingSearchSchema>

/**
 * Sous-entité: Vol associé au colis
 */
export interface TrackingFlightInfo {
  id: string
  direction: FlightDirection
  departureDate: Date
  arrivalDate: Date
  status: FlightStatus
}

/**
 * Entité principale de suivi renvoyée en lecture
 * IMPORTANT: Omet senderPhone et recipientPhone
 */
export interface TrackingResult {
  id: string
  trackingCode: string
  senderName: string
  recipientName: string
  weightKg: number
  status: ParcelStatus
  currentNote: string | null
  receivedAt: Date
  flight: TrackingFlightInfo | null
}
