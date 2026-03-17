// src/features/flights/services/flight.service.ts
/**
 * Flight Service — Logique métier pour les vols SEZY
 *
 * RESPONSABILITÉ :
 * - Encapsuler toute la logique d'accès aux données Prisma
 * - Fournir des fonctions typées et réutilisables
 * - Respecter l'architecture DOC 02 : jamais d'import Prisma dans les composants
 *
 * RÈGLES (DOC 02 & DOC 03) :
 * - Service = seul fichier qui importe { db }
 * - Fonctions async avec types de retour explicites
 * - Gestion des cas null/undefined
 */

import type { Flight } from '@prisma/client'

import { db } from '@/lib/db'

/**
 * Récupère le prochain vol programmé Paris → Cotonou
 * @returns Le prochain vol SCHEDULED ou null si aucun vol
 */
export async function getNextFlight(): Promise<Flight | null> {
  const now = new Date()

  const flight = await db.flight.findFirst({
    where: {
      direction: 'PARIS_TO_COTONOU',
      status: 'SCHEDULED',
      departureDate: {
        gt: now,
      },
    },
    orderBy: {
      departureDate: 'asc',
    },
  })

  return flight
}
