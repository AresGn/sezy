/**
 * features/flights/types.ts
 *
 * RESPONSABILITÉ :
 * - Définir les types TypeScript pour la gestion des vols
 * - Schémas de validation Zod pour la création/modification
 */

import { z } from 'zod'
import { FlightDirection, FlightStatus } from '@prisma/client'

// Schema pour la création/modification d'un vol
export const FlightSchema = z.object({
  direction: z.nativeEnum(FlightDirection),
  origin: z.string().min(1, "L'origine est obligatoire."),
  destination: z.string().min(1, 'La destination est obligatoire.'),
  availableSpots: z.number().int().min(0),
  departureDate: z.coerce.date(),
  arrivalDate: z.coerce.date(),
  priceEur: z.number().min(0, 'Prix EUR invalide (en centimes).'),
  priceFcfa: z.number().min(0, 'Prix FCFA invalide.'),
  status: z.nativeEnum(FlightStatus).default(FlightStatus.SCHEDULED),
  notes: z.string().optional().nullable(),
})

export type FlightInput = z.infer<typeof FlightSchema>

// Interface pour l'affichage public
export interface FlightDisplay {
  id: string
  direction: FlightDirection
  origin: string
  destination: string
  availableSpots: number
  departureDate: Date
  arrivalDate: Date
  priceEur: number
  priceFcfa: number
  status: FlightStatus
  notes?: string | null
}
