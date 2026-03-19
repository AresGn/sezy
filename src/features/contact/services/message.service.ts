/**
 * src/features/contact/services/message.service.ts
 *
 * RESPONSABILITÉ :
 * - Logique métier pour la gestion des messages (admin)
 * - Accès direct à @/lib/db pour les opérations CRUD
 */

import { db } from '@/lib/db'

export interface MessageWithDetails {
  id: string
  fullName: string
  email: string
  phone: string | null
  subject: string
  message: string
  isRead: boolean
  createdAt: Date
}

/**
 * Récupère tous les messages (admin)
 */
export async function getAllMessages(): Promise<MessageWithDetails[]> {
  return await db.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

/**
 * Récupère un message par ID (admin)
 */
export async function getMessageById(id: string): Promise<MessageWithDetails | null> {
  return await db.contactMessage.findUnique({
    where: { id },
  })
}

/**
 * Marque un message comme lu
 */
export async function markMessageAsRead(id: string): Promise<void> {
  await db.contactMessage.update({
    where: { id },
    data: { isRead: true },
  })
}
