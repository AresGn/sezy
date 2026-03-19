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

// Schema pour la création/modification d'un colis (Admin)
export const ParcelSchema = z.object({
  trackingCode: z.string().min(1, 'Code de suivi requis'),
  senderName: z.string().min(2, 'Nom expéditeur requis'),
  senderPhone: z.string().min(8, 'Téléphone expéditeur invalide'),
  recipientName: z.string().min(2, 'Nom destinataire requis'),
  recipientPhone: z.string().min(8, 'Téléphone destinataire invalide'),
  weightKg: z.coerce.number().min(0.1, 'Poids invalide'),
  status: z.nativeEnum(ParcelStatus).default(ParcelStatus.RECEIVED_PARIS),
  currentNote: z.string().optional().nullable(),
  flightId: z.string().optional().nullable(),
})

export type ParcelInput = z.infer<typeof ParcelSchema>

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
