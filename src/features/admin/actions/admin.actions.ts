/**
 * features/admin/actions/admin.actions.ts
 *
 * RESPONSABILITÉ :
 * - Actions serveur pour la gestion admin
 * - markMessageAsRead : marquer un message comme lu
 * - revalidatePath sur toutes les pages admin
 */

'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

/**
 * Marque un message de contact comme lu
 * @param messageId - ID du message à marquer comme lu
 * @returns Success ou erreur
 */
export async function markMessageAsRead(messageId: string) {
  // Vérification auth via DOC 07
  const session = await auth()

  if (!session?.user) {
    return { success: false, error: 'UNAUTHORIZED' }
  }

  if (session.user.email !== process.env.ADMIN_EMAIL) {
    return { success: false, error: 'UNAUTHORIZED' }
  }

  try {
    // Vérifier que le message existe
    const message = await db.contactMessage.findUnique({
      where: { id: messageId },
    })

    if (!message) {
      return { success: false, error: 'Message non trouvé' }
    }

    // Marquer comme lu
    await db.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    })

    // Revalidate les pages admin après modification
    revalidatePath('/admin')
    revalidatePath('/admin/messages')

    return { success: true }
  } catch (error) {
    console.error('Erreur markMessageAsRead:', error)
    return { success: false, error: 'Erreur serveur' }
  }
}
