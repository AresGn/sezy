/**
 * features/admin/services/dashboard.service.ts
 *
 * RESPONSABILITÉ :
 * - Logique métier pour les statistiques du dashboard admin
 * - Accès direct à @/lib/db pour les requêtes stats
 * -依据 DOC 04 section 9 : upcoming flights, parcels in transit, unread messages
 */

import { FlightStatus, ParcelStatus } from '@prisma/client'

import { db } from '@/lib/db'

import { AdminDashboardStats } from './types'

/**
 * Récupère les statistiques du dashboard admin
 * - Vols à venir : vols avec status SCHEDULED et date départ >= maintenant
 * - Colis en transit : status RECEIVED_PARIS ou IN_FLIGHT
 * - Produits total : tous les produits actifs (isActive = true)
 * - Messages non lus : isRead = false
 */
export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  const now = new Date()

  // Vols à venir (SCHEDULED et date départ >= maintenant)
  const upcomingFlights = await db.flight.count({
    where: {
      status: FlightStatus.SCHEDULED,
      departureDate: { gte: now },
      deletedAt: null,
    },
  })

  // Colis en transit (RECEIVED_PARIS ou IN_FLIGHT)
  const parcelsInTransit = await db.parcel.count({
    where: {
      status: {
        in: [ParcelStatus.RECEIVED_PARIS, ParcelStatus.IN_FLIGHT],
      },
    },
  })

  // Produits actifs
  const totalProducts = await db.product.count({
    where: {
      isActive: true,
    },
  })

  // Messages non lus
  const unreadMessages = await db.contactMessage.count({
    where: {
      isRead: false,
    },
  })

  return {
    upcomingFlights,
    parcelsInTransit,
    totalProducts,
    unreadMessages,
  }
}
