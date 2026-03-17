/**
 * features/calculator/types.ts
 *
 * RESPONSABILITÉ :
 * - Définir les types pour le calcul de fret
 */

import { FlightDirection } from '@prisma/client'

export interface CalculationInput {
  weightKg: number
  direction: FlightDirection
}

export interface CalculationResult {
  weightCharged: number // Poids arrondi au kg supérieur
  priceEur: number // En centimes (ex: 2000 = 20€)
  priceFcfa: number // En FCFA (ex: 13119)
  whatsappUrl: string // Lien pré-rempli pour réservation immédiate
}
