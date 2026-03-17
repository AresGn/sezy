// src/lib/utils.ts
/**
 * Utilitaires CSS — Fusion de classes Tailwind
 *
 * RESPONSABILITÉ :
 * - Exporter cn() pour fusionner les classes Tailwind de manière sûre
 * - Combine clsx (conditions) + tailwind-merge (déduplication)
 *
 * RÈGLES (DOC 06) :
 * - Aucune logique métier ici
 * - Import unique : clsx + tailwind-merge
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
