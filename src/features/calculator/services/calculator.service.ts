/**
 * features/calculator/services/calculator.service.ts
 *
 * RESPONSABILITÉ :
 * - Calculer le prix du fret en fonction du poids et de la direction
 * - RÈGLE DM-003 : Arrondir au kg supérieur (4.2kg -> 5kg)
 * - Générer l'URL WhatsApp contextuelle
 */

import { getWhatsAppUrl } from '@/lib/whatsapp'

import { CalculationInput, CalculationResult } from '../types'

// Tarifs SEZY fixes (en centimes EUR et FCFA)
const RATE_PARIS_EUR = 2000 // 20€ / kg
const RATE_PARIS_FCFA = 13119 // ~20€ en FCFA (basé sur 655.957)

const RATE_COTONOU_EUR = 1524 // ~10 000 FCFA en EUR
const RATE_COTONOU_FCFA = 10000 // 10 000 FCFA / kg

export function calculateShippingPrice(input: CalculationInput): CalculationResult {
  const { weightKg, direction } = input

  // 1. Arrondir au kg supérieur ( minimum 1kg )
  const weightCharged = Math.max(1, Math.ceil(weightKg))

  // 2. Calculer les prix selon la direction
  let priceEur = 0
  let priceFcfa = 0

  if (direction === 'PARIS_TO_COTONOU') {
    priceEur = weightCharged * RATE_PARIS_EUR
    priceFcfa = weightCharged * RATE_PARIS_FCFA
  } else {
    // COTONOU_TO_PARIS
    priceEur = weightCharged * RATE_COTONOU_EUR
    priceFcfa = weightCharged * RATE_COTONOU_FCFA
  }

  // 3. Préparer le lien WhatsApp contextuel
  // Note: On laisse getWhatsAppUrl construire le message selon le contexte 'logistics'
  // Mais si on veut un message personnalisé, on doit modifier lib/whatsapp.ts ou passer des options reconnues.
  // Ici on utilise le contexte standard 'logistics'.
  const whatsappUrl = getWhatsAppUrl('logistics')

  return {
    weightCharged,
    priceEur,
    priceFcfa,
    whatsappUrl,
  }
}
