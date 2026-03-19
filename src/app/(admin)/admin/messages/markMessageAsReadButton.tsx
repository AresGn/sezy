/**
 * src/app/admin/messages/markMessageAsReadButton.tsx
 *
 * RESPONSABILITÉ :
 * - Server Action pour marquer un message comme lu
 * - Réutilise l'action définie dans admin.actions.ts
 */

'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { auth } from '@/lib/auth'

/**
 * Marque un message comme lu
 */
export async function markMessageAsReadAction(messageId: string) {
  const session = await auth()

  if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
    return { success: false, error: 'UNAUTHORIZED' }
  }

  try {
    await db.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    })

    revalidatePath('/admin')
    revalidatePath('/admin/messages')
  } catch (error) {
    console.error('Erreur markMessageAsRead:', error)
  }
}
