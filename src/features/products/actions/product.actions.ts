/**
 * src/features/products/actions/product.actions.ts
 *
 * RESPONSABILITÉ :
 * - Server Actions pour la gestion des produits (admin)
 * - createProductAction, updateProductAction, deleteProductAction
 */

'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { ActionResult } from '@/types'

import { ProductSchema } from '../types'
import { createProduct, updateProduct, deleteProduct } from '../services/product.service'

/**
 * Action : Créer un nouveau produit
 */
export async function createProductAction(data: unknown): Promise<ActionResult<{ id: string }>> {
  // Vérification auth
  const session = await auth()
  if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
    return { success: false, error: 'UNAUTHORIZED' }
  }

  // Validation Zod
  const parsed = ProductSchema.safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      error: 'Données du produit invalides.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const product = await createProduct(parsed.data)

    revalidatePath('/admin')
    revalidatePath('/admin/produits')
    revalidatePath('/shopping')

    return {
      success: true,
      data: { id: product.id },
    }
  } catch (error) {
    console.error('[createProductAction]', error)
    return {
      success: false,
      error: 'Une erreur est survenue lors de la création du produit.',
    }
  }
}

/**
 * Action : Mettre à jour un produit
 */
export async function updateProductAction(
  id: string,
  data: unknown,
): Promise<ActionResult<{ id: string }>> {
  // Vérification auth
  const session = await auth()
  if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
    return { success: false, error: 'UNAUTHORIZED' }
  }

  // Validation Zod (partielle)
  const parsed = ProductSchema.partial().safeParse(data)
  if (!parsed.success) {
    return {
      success: false,
      error: 'Données du produit invalides.',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  try {
    const product = await updateProduct(id, parsed.data)

    revalidatePath('/admin')
    revalidatePath('/admin/produits')
    revalidatePath(`/admin/produits/${id}`)
    revalidatePath('/shopping')

    return {
      success: true,
      data: { id: product.id },
    }
  } catch (error) {
    console.error('[updateProductAction]', error)
    return {
      success: false,
      error: 'Une erreur est survenue lors de la mise à jour du produit.',
    }
  }
}

/**
 * Action : Supprimer (désactiver) un produit
 */
export async function deleteProductAction(id: string): Promise<ActionResult<{ id: string }>> {
  // Vérification auth
  const session = await auth()
  if (!session?.user || session.user.email !== process.env.ADMIN_EMAIL) {
    return { success: false, error: 'UNAUTHORIZED' }
  }

  try {
    await deleteProduct(id)

    revalidatePath('/admin')
    revalidatePath('/admin/produits')
    revalidatePath('/shopping')

    return {
      success: true,
      data: { id },
    }
  } catch (error) {
    console.error('[deleteProductAction]', error)
    return {
      success: false,
      error: 'Une erreur est survenue lors de la suppression du produit.',
    }
  }
}
