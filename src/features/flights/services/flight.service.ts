/**
 * features/flights/services/flight.service.ts
 *
 * RESPONSABILITÉ :
 * - Logique métier pour l'affichage et la gestion des vols
 * - Accès direct à @/lib/db pour les opérations CRUD
 * - Filtrage des vols SCHEDULED pour l'affichage public
 */

import { FlightStatus } from '@prisma/client'

import { db } from '@/lib/db'

import { FlightDisplay } from '../types'

/**
 * Récupère tous les vols actifs (non supprimés)
 * Utilisé principalement pour le back-office admin
 */
export async function getAllFlights() {
  return await db.flight.findMany({
    where: { deletedAt: null },
    orderBy: { departureDate: 'asc' },
  })
}

/**
 * Récupère les prochains vols programmés pour l'affichage public
 * Seuls les vols au statut SCHEDULED et dont la date de départ n'est pas passée
 */
export async function getUpcomingFlights(): Promise<FlightDisplay[]> {
  const now = new Date()

  return await db.flight.findMany({
    where: {
      status: FlightStatus.SCHEDULED,
      departureDate: { gte: now },
      deletedAt: null,
    },
    orderBy: { departureDate: 'asc' },
    select: {
      id: true,
      direction: true,
      origin: true,
      destination: true,
      availableSpots: true,
      departureDate: true,
      arrivalDate: true,
      priceEur: true,
      priceFcfa: true,
      status: true,
      notes: true,
    },
  })
}

/**
 * Récupère le prochain vol immédiat
 * Utilisé pour la bannière "Prochain vol"
 */
export async function getNextFlight(): Promise<FlightDisplay | null> {
  const now = new Date()

  return await db.flight.findFirst({
    where: {
      status: FlightStatus.SCHEDULED,
      departureDate: { gte: now },
      deletedAt: null,
    },
    orderBy: { departureDate: 'asc' },
    select: {
      id: true,
      direction: true,
      origin: true,
      destination: true,
      availableSpots: true,
      departureDate: true,
      arrivalDate: true,
      priceEur: true,
      priceFcfa: true,
      status: true,
      notes: true,
    },
  })
}
