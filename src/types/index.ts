// src/types/index.ts
/**
 * Types globaux SEZY — Contrats d'API et types partagés
 *
 * RESPONSABILITÉ :
 * - Définir ActionResult<T> pour toutes les Server Actions
 * - Centraliser les types partagés entre features
 *
 * RÈGLES (DOC 04 & DOC 06) :
 * - Toutes les Server Actions doivent retourner Promise<ActionResult<T>>
 * - Zéro any — types stricts
 */

/**
 * Résultat standardisé pour toutes les Server Actions SEZY (DOC 04)
 * Pattern Result<T, E> pour gestion d'erreurs explicite et type-safe
 *
 * @example
 * // Server Action
 * export async function createParcel(data: ParcelInput): Promise<ActionResult<Parcel>> {
 *   try {
 *     const parcel = await db.parcel.create({ data })
 *     return { success: true, data: parcel }
 *   } catch {
 *     return { success: false, error: 'Erreur lors de la création du colis' }
 *   }
 * }
 */
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> }

/**
 * Pôles de services SEZY (DOC 09 — Design System)
 */
export type SezaPole = 'logistics' | 'shopping' | 'studies'

/**
 * Statuts possibles pour un colis SEZY
 */
export type ParcelStatus =
  | 'PENDING'
  | 'COLLECTED'
  | 'IN_TRANSIT'
  | 'ARRIVED'
  | 'DELIVERED'
  | 'ISSUE'

/**
 * Statuts possibles pour un vol SEZY
 */
export type FlightStatus =
  | 'SCHEDULED'
  | 'BOARDING'
  | 'DEPARTED'
  | 'ARRIVED'
  | 'COMPLETED'
  | 'CANCELLED'

/**
 * Direction d'un vol SEZY
 */
export type FlightDirection = 'PARIS_TO_COTONOU' | 'COTONOU_TO_PARIS'
