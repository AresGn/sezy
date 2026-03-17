'use server'

import { ActionResult } from '@/types'

import { TrackingSearchInput, TrackingSearchSchema, TrackingResult } from '../types'
import { searchByCode } from '../services/tracking.service'

/**
 * Server Action: Recherche de colis (Tracking)
 *
 * RESPONSABILITÉS :
 * - Gérer les requêtes Client et valider les payload via Zod
 * - Assurer qu'on retourne toujours un ActionResult<T>
 * - Renvoyer les erreurs fonctionnelles propres
 */
export async function searchParcelByCodeAction(
  input: TrackingSearchInput,
): Promise<ActionResult<TrackingResult>> {
  try {
    // 1. Validation stricte côté serveur avec le schéma Zod (regex SEZY-YYYY-NNNN)
    const result = TrackingSearchSchema.safeParse(input)
    if (!result.success) {
      return {
        success: false,
        error: 'Code de suivi invalide ou mal formaté.',
        fieldErrors: result.error.flatten().fieldErrors,
      }
    }

    // 2. Appel au service métier
    const parcel = await searchByCode(result.data.trackingCode)

    if (!parcel) {
      // 3a. Renvoi d'erreur "Non trouvé" sans exposer d'informations système
      return {
        success: false,
        error: 'Aucun colis trouvé pour ce code de suivi.',
      }
    }

    // 3b. Succès avec les données sécurisées (via formatParcel)
    return {
      success: true,
      data: parcel,
    }
  } catch (error) {
    console.error('[searchParcelByCodeAction] Erreur inattendue:', error)
    return {
      success: false,
      error: 'Une erreur est survenue lors de la recherche du colis.',
    }
  }
}
