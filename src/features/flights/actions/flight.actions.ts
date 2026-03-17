/**
 * features/flights/actions/flight.actions.ts
 *
 * RESPONSABILITÉ :
 * - Orchestrer les mutations sur les vols (Server Actions)
 * - Valider les entrées via Zod
 * - Gérer le retour standard ActionResult<T>
 */

'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { ActionResult } from '@/types'

import { FlightSchema } from '../types'

/**
 * Action : Créer un nouveau vol
 * Réservé à l'administration (Auth à ajouter via session ultérieurement)
 */
export async function createFlightAction(data: unknown): Promise<ActionResult<{ id: string }>> {
  // 1. Validation Zod
  const parsed = FlightSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Données du vol invalides.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  // 2. Création DB
  try {
    const flight = await db.flight.create({
      data: parsed.data,
    })

    // 3. Revalidation des pages publiques impactées
    revalidatePath('/logistique')

    return {
      success: true,
      data: { id: flight.id },
    }
  } catch (error) {
    console.error('[createFlightAction]', error)
    return {
      success: false,
      error: 'Une erreur est survenue lors de la création du vol.',
    }
  }
}
