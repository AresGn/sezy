// src/features/tracking/services/tracking.service.ts
import { Parcel, Flight } from '@prisma/client'

import { db } from '@/lib/db'

import { TrackingResult } from '../types'

/**
 * Service: parcel-tracking
 *
 * RESPONSABILITÉS :
 * - Logique métier et accès DB purs (pas de requêtes HTTP ni actions serveur ici)
 * - Mappage sécurisé via formatParcel (masque les données sensibles)
 */

type ParcelWithFlight = Parcel & {
  flight: Flight | null
}

/**
 * Mapper l'entité Prisma vers le DTO public de tracking
 * On retire explicitement les téléphones pour la sécurité (DOC 07)
 */
export function formatParcel(parcel: ParcelWithFlight): TrackingResult {
  return {
    id: parcel.id,
    trackingCode: parcel.trackingCode,
    senderName: parcel.senderName,
    recipientName: parcel.recipientName,
    weightKg: parcel.weightKg,
    status: parcel.status,
    currentNote: parcel.currentNote,
    receivedAt: parcel.receivedAt,
    flight: parcel.flight
      ? {
          id: parcel.flight.id,
          direction: parcel.flight.direction,
          departureDate: parcel.flight.departureDate,
          arrivalDate: parcel.flight.arrivalDate,
          status: parcel.flight.status,
        }
      : null,
  }
}

/**
 * Recherche un colis par son code SEZY-YYYY-NNNN
 * Retourne les détails du colis ou null s'il n'existe pas.
 */
export async function searchByCode(code: string): Promise<TrackingResult | null> {
  const parcel = await db.parcel.findUnique({
    where: { trackingCode: code },
    include: {
      flight: true,
    },
  })

  if (!parcel) {
    return null
  }

  return formatParcel(parcel)
}
