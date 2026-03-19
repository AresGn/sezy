/**
 * src/features/tracking/actions/parcel.actions.ts
 *
 * RESPONSABILITÉ :
 * - Server Actions pour la gestion des colis (admin)
 * - updateParcelStatusAction avec revalidatePath
 */

'use server'

import { revalidatePath } from 'next/cache'
import { ParcelStatus } from '@prisma/client'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { ActionResult } from '@/types'

import { ParcelSchema } from '../types'

/**
 * Action : Mettre à jour le statut d'un colis
 */
export async function updateParcelStatusAction(
  parcelId: string,
  status: ParcelStatus,
  note?: string,
): Promise<ActionResult<{ id: string }>> {
  // Vérification auth
  const session = await auth()
  if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
    return { success: false, error: 'UNAUTHORIZED' }
  }

  try {
    const parcel = await db.parcel.update({
      where: { id: parcelId },
      data: {
        status,
        currentNote: note || null,
      },
    })

    // Créer un log de statut
    await db.parcelStatusLog.create({
      data: {
        parcelId,
        status,
        note: note || null,
      },
    })

    revalidatePath('/admin')
    revalidatePath('/admin/colis')
    revalidatePath(`/admin/colis/${parcelId}`)

    return {
      success: true,
      data: { id: parcel.id },
    }
  } catch (error) {
    console.error('[updateParcelStatusAction]', error)
    return {
      success: false,
      error: 'Une erreur est survenue lors de la mise à jour du statut.',
    }
  }
}

/**
 * Action : Créer un nouveau colis
 */
export async function createParcelAction(
  data: unknown,
): Promise<ActionResult<{ id: string; trackingCode: string }>> {
  // Vérification auth
  const session = await auth()
  if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
    return { success: false, error: 'UNAUTHORIZED' }
  }

  // Validation Zod
  const parsed = ParcelSchema.omit({ trackingCode: true, status: true }).safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: 'Données du colis invalides.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    // Générer un code de suivi
    const count = await db.parcel.count()
    const year = new Date().getFullYear()
    const trackingCode = `SEZY-${year}-${String(count + 1).padStart(4, '0')}`

    const parcel = await db.parcel.create({
      data: {
        trackingCode,
        senderName: parsed.data.senderName,
        senderPhone: parsed.data.senderPhone,
        recipientName: parsed.data.recipientName,
        recipientPhone: parsed.data.recipientPhone,
        weightKg: parsed.data.weightKg,
        status: ParcelStatus.RECEIVED_PARIS,
        flightId: parsed.data.flightId || null,
        currentNote: parsed.data.currentNote || 'Colis reçu à Paris',
      },
    })

    // Créer le premier log de statut
    await db.parcelStatusLog.create({
      data: {
        parcelId: parcel.id,
        status: ParcelStatus.RECEIVED_PARIS,
        note: parsed.data.currentNote || 'Colis reçu à Paris',
      },
    })

    revalidatePath('/admin')
    revalidatePath('/admin/colis')

    return {
      success: true,
      data: { id: parcel.id, trackingCode: parcel.trackingCode },
    }
  } catch (error) {
    console.error('[createParcelAction]', error)
    return {
      success: false,
      error: 'Une erreur est survenue lors de la création du colis.',
    }
  }
}
