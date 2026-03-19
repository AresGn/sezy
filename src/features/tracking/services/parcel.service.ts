/**
 * src/features/tracking/services/parcel.service.ts
 *
 * RESPONSABILITÉ :
 * - Logique métier pour la gestion des colis (admin)
 * - Accès direct à @/lib/db pour les opérations CRUD
 */

import { ParcelStatus } from '@prisma/client'

import { db } from '@/lib/db'

export interface ParcelWithDetails {
  id: string
  trackingCode: string
  senderName: string
  senderPhone: string
  recipientName: string
  recipientPhone: string
  weightKg: number
  status: ParcelStatus
  currentNote: string | null
  flightId: string | null
  receivedAt: Date
  createdAt: Date
  updatedAt: Date
}

/**
 * Récupère tous les colis (admin)
 */
export async function getAllParcels(): Promise<ParcelWithDetails[]> {
  return await db.parcel.findMany({
    orderBy: { receivedAt: 'desc' },
    include: {
      flight: true,
    },
  })
}

/**
 * Récupère un colis par ID (admin)
 */
export async function getParcelById(id: string): Promise<ParcelWithDetails | null> {
  return await db.parcel.findUnique({
    where: { id },
    include: {
      flight: true,
      statusLogs: {
        orderBy: { loggedAt: 'desc' },
      },
    },
  })
}

/**
 * Met à jour le statut d'un colis
 */
export async function updateParcelStatus(
  parcelId: string,
  newStatus: ParcelStatus,
  note?: string,
): Promise<ParcelWithDetails> {
  const parcel = await db.parcel.update({
    where: { id: parcelId },
    data: {
      status: newStatus,
      currentNote: note || null,
    },
    include: {
      flight: true,
    },
  })

  // Créer un log de statut
  await db.parcelStatusLog.create({
    data: {
      parcelId,
      status: newStatus,
      note: note || null,
    },
  })

  return parcel
}
