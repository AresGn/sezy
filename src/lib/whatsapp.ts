// src/lib/whatsapp.ts
/**
 * WhatsApp Utilities — Génération des liens WhatsApp
 *
 * RESPONSABILITÉ :
 * - Construire les URLs WhatsApp avec messages pré-remplis par contexte
 * - Centraliser la logique de formatting des numéros
 * - Respecter le contrat DOC 04 : getWhatsAppUrl(context, options?)
 *
 * ENV REQUIS :
 * - NEXT_PUBLIC_WHATSAPP_1 : Numéro principal SEZY
 * - NEXT_PUBLIC_WHATSAPP_2 : Numéro secondaire SEZY
 *
 * CONTEXTES (DOC 04) :
 * - home       → message générique d'accueil
 * - logistics  → message logistique Paris-Cotonou
 * - shopping   → message avec productName optionnel
 * - studies    → message checklist diagnostic études
 * - tracking   → message question colis
 * - contact    → message contact générique
 */

// Contextes WhatsApp définis dans DOC 04
export type WhatsAppContext = 'home' | 'logistics' | 'shopping' | 'studies' | 'tracking' | 'contact'

export interface WhatsAppOptions {
  productName?: string
  trackingCode?: string
  flightDate?: string
}

/**
 * Retourne le message pré-rempli selon le contexte
 */
function buildMessage(context: WhatsAppContext, options: WhatsAppOptions = {}): string {
  switch (context) {
    case 'home':
      return 'Bonjour SEZY, je souhaite en savoir plus sur vos services.'

    case 'logistics':
      return options.flightDate
        ? `Bonjour SEZY, je souhaite réserver une place pour le prochain vol Paris → Cotonou du ${options.flightDate}. Pouvez-vous m'aider ?`
        : "Bonjour SEZY, je souhaite obtenir un tarif pour un envoi de colis Paris → Cotonou. Pouvez-vous m'aider ?"

    case 'shopping':
      return options.productName
        ? `Bonjour SEZY, je suis intéressé(e) par le produit "${options.productName}". Pouvez-vous me donner plus d'informations ?`
        : 'Bonjour SEZY, je souhaite découvrir votre catalogue Shopping & Bien-être.'

    case 'studies':
      return "Bonjour SEZY, je souhaitais démarrer ma checklist études (visa, logement, inscription). Pouvez-vous m'aider ?"

    case 'tracking':
      return options.trackingCode
        ? `Bonjour SEZY, j'ai une question sur mon colis ${options.trackingCode}. Pouvez-vous m'aider ?`
        : "Bonjour SEZY, j'ai une question sur mon colis. Pouvez-vous m'aider ?"

    case 'contact':
      return 'Bonjour SEZY, je souhaite vous contacter pour obtenir des informations.'
  }
}

/**
 * Génère un lien WhatsApp selon le contexte SEZY (DOC 04 — contrat API)
 * @param context - Contexte d'utilisation parmi les 6 définis dans DOC 04
 * @param options - Options optionnelles (productName, trackingCode, flightDate)
 * @returns URL WhatsApp complète avec message encodé
 */
export function getWhatsAppUrl(context: WhatsAppContext, options: WhatsAppOptions = {}): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_1?.replace(/\D/g, '')

  if (!phone) {
    console.warn('NEXT_PUBLIC_WHATSAPP_1 not configured')
    return '#'
  }

  const message = buildMessage(context, options)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}
