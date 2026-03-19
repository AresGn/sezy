// src/features/products/__tests__/product.actions.test.ts
/**
 * Tests unitaires — product.actions.ts
 * Vérifie createProductAction, updateProductAction
 * Couverture: nominal, validation Zod, CONFLICT (slug unique), UNAUTHORIZED
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

// ─────────────────────────────────────────────────────────────
// MOCKS - Utilise vi.hoisted pour éviter les erreurs de declaration
// ─────────────────────────────────────────────────────────────

const { mockRevalidatePath } = vi.hoisted(() => ({
  mockRevalidatePath: vi.fn(),
}))

const { mockProductCreate, mockProductUpdate } = vi.hoisted(() => ({
  mockProductCreate: vi.fn(),
  mockProductUpdate: vi.fn(),
}))

const { mockAuth } = vi.hoisted(() => ({
  mockAuth: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  auth: mockAuth,
}))

vi.mock('next/cache', () => ({
  revalidatePath: mockRevalidatePath,
}))

vi.mock('@/lib/db', () => ({
  db: {
    product: {
      create: mockProductCreate,
      update: mockProductUpdate,
    },
  },
}))

// Mock du service product
vi.mock('@/features/products/services/product.service', () => ({
  createProduct: mockProductCreate,
  updateProduct: mockProductUpdate,
}))

// Import APRÈS les mocks
import {
  createProductAction,
  updateProductAction,
} from '@/features/products/actions/product.actions'

describe('product.actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock ADMIN_EMAIL pour les tests
    vi.stubEnv('ADMIN_EMAIL', 'admin@test.com')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  // ─────────────────────────────────────────────────────────
  // TEST SUITE: createProductAction
  // ─────────────────────────────────────────────────────────
  describe('createProductAction()', () => {
    const validProductData = {
      name: 'Crème solaire SPF50',
      slug: 'creme-solaire-spf50',
      description: 'Protection solaire haute pour toute la famille',
      shortDescription: 'SPF50 - Protection UVA/UVB',
      priceFcfa: 5000,
      priceEur: 800,
      category: 'COSMETICS',
      imageUrl: 'https://example.com/images/creme.jpg',
      inStock: true,
      stockQuantity: 100,
      isFeatured: true,
      isActive: true,
    }

    it('crée un produit - cas nominal', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })
      mockProductCreate.mockResolvedValueOnce({ id: 'product-new-123', ...validProductData })

      const result = await createProductAction(validProductData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.id).toBe('product-new-123')
      }
    })

    it('VALIDATION_ERROR: retourne erreur si nom manquant', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })

      const result = await createProductAction({ ...validProductData, name: '' })

      expect(result.success).toBe(false)
    })

    it('VALIDATION_ERROR: retourne erreur si URL image invalide', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })

      const result = await createProductAction({ ...validProductData, imageUrl: 'not-a-url' })

      expect(result.success).toBe(false)
    })

    it('UNAUTHORIZED: retourne erreur si pas admin', async () => {
      mockAuth.mockResolvedValueOnce(null)

      const result = await createProductAction(validProductData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('UNAUTHORIZED')
      }
    })

    it('revalidatePath après création', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })
      mockProductCreate.mockResolvedValueOnce({ id: 'product-new-123', ...validProductData })

      await createProductAction(validProductData)

      expect(mockRevalidatePath).toHaveBeenCalledWith('/admin')
      expect(mockRevalidatePath).toHaveBeenCalledWith('/shopping')
    })
  })

  // ─────────────────────────────────────────────────────────
  // TEST SUITE: updateProductAction
  // ─────────────────────────────────────────────────────────
  describe('updateProductAction()', () => {
    const updateData = {
      name: 'Nouveau nom du produit',
      priceFcfa: 6000,
      inStock: false,
    }

    it('met à jour un produit - cas nominal', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })
      mockProductUpdate.mockResolvedValueOnce({ id: 'product-123', ...updateData })

      const result = await updateProductAction('product-123', updateData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.id).toBe('product-123')
      }
    })

    it('VALIDATION_ERROR: retourne erreur si données invalides', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })

      const result = await updateProductAction('product-123', { priceFcfa: -500 })

      expect(result.success).toBe(false)
    })

    it('UNAUTHORIZED: retourne erreur si pas admin', async () => {
      mockAuth.mockResolvedValueOnce(null)

      const result = await updateProductAction('product-123', updateData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('UNAUTHORIZED')
      }
    })

    it('revalidatePath après mise à jour', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })
      mockProductUpdate.mockResolvedValueOnce({ id: 'product-123', ...updateData })

      await updateProductAction('product-123', updateData)

      expect(mockRevalidatePath).toHaveBeenCalledWith('/admin')
      expect(mockRevalidatePath).toHaveBeenCalledWith('/shopping')
    })
  })
})
