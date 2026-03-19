import { z } from 'zod'

// Types pour les produits SEZY
export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  priceFcfa: number
  priceEur?: number
  category: ProductCategory
  imageUrl: string
  inStock: boolean
  stockQuantity?: number
  isFeatured: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export enum ProductCategory {
  COSMETICS = 'COSMETICS',
  NUTRITION = 'NUTRITION',
  WELLNESS = 'WELLNESS',
}

export const CATEGORY_LABELS = {
  COSMETICS: 'Cosmétiques',
  NUTRITION: 'Nutrition',
  WELLNESS: 'Bien-être',
} as const

export interface ProductFormData {
  name: string
  slug: string
  description: string
  shortDescription: string
  priceFcfa: number
  priceEur?: number
  category: ProductCategory
  imageUrl: string
  inStock: boolean
  stockQuantity?: number
  isFeatured: boolean
  isActive: boolean
}

// Schéma de validation Zod pour les produits
export const ProductSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  slug: z
    .string()
    .min(3)
    .regex(
      /^[a-z0-9-]+$/,
      'Le slug ne doit contenir que des lettres minuscules, chiffres et tirets',
    ),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  shortDescription: z
    .string()
    .min(5, 'La description courte doit contenir au moins 5 caractères')
    .max(150, 'Max 150 caractères'),
  priceFcfa: z.coerce.number().min(0, 'Le prix doit être positif'),
  priceEur: z.coerce.number().min(0).optional(),
  category: z.nativeEnum(ProductCategory),
  imageUrl: z.string().url("L'URL de l'image est invalide"),
  inStock: z.boolean().default(true),
  stockQuantity: z.coerce.number().min(0).optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
})
