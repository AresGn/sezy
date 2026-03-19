/**
 * src/features/products/services/product.service.ts
 *
 * RESPONSABILITÉ :
 * - Logique métier pour la gestion des produits (admin)
 * - Accès direct à @/lib/db pour les opérations CRUD
 */

import { ProductCategory } from '@prisma/client'

import { db } from '@/lib/db'

export interface ProductWithDetails {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  priceFcfa: number
  priceEur: number | null
  category: ProductCategory
  imageUrl: string
  inStock: boolean
  stockQuantity: number | null
  isFeatured: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

/**
 * Récupère tous les produits (admin)
 */
export async function getAllProducts(): Promise<ProductWithDetails[]> {
  return await db.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

/**
 * Récupère un produit par ID (admin)
 */
export async function getProductById(id: string): Promise<ProductWithDetails | null> {
  return await db.product.findUnique({
    where: { id },
  })
}

/**
 * Crée un nouveau produit
 */
export async function createProduct(data: {
  name: string
  slug: string
  description: string
  shortDescription: string
  priceFcfa: number
  priceEur?: number
  category: ProductCategory
  imageUrl: string
  inStock?: boolean
  stockQuantity?: number
  isFeatured?: boolean
  isActive?: boolean
}): Promise<ProductWithDetails> {
  return await db.product.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      priceFcfa: data.priceFcfa,
      priceEur: data.priceEur || null,
      category: data.category,
      imageUrl: data.imageUrl,
      inStock: data.inStock ?? true,
      stockQuantity: data.stockQuantity || null,
      isFeatured: data.isFeatured ?? false,
      isActive: data.isActive ?? true,
    },
  })
}

/**
 * Met à jour un produit
 */
export async function updateProduct(
  id: string,
  data: Partial<{
    name: string
    slug: string
    description: string
    shortDescription: string
    priceFcfa: number
    priceEur: number
    category: ProductCategory
    imageUrl: string
    inStock: boolean
    stockQuantity: number
    isFeatured: boolean
    isActive: boolean
  }>,
): Promise<ProductWithDetails> {
  return await db.product.update({
    where: { id },
    data,
  })
}

/**
 * Supprime (désactive) un produit
 */
export async function deleteProduct(id: string): Promise<void> {
  await db.product.update({
    where: { id },
    data: { isActive: false },
  })
}
