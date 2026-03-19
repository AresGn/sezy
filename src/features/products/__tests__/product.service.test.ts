// src/features/products/__tests__/product.service.test.ts
/**
 * Tests unitaires — product.service.ts
 * Vérifie la logique de getAllProducts(), getProductById(), createProduct(), updateProduct(), deleteProduct()
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '@/features/products/services/product.service'
import { db } from '@/lib/db'

const mockFindMany = vi.mocked(db.product.findMany)
const mockFindUnique = vi.mocked(db.product.findUnique)
const mockCreate = vi.mocked(db.product.create)
const mockUpdate = vi.mocked(db.product.update)

describe('product.service', () => {
  beforeEach(() => {
    mockFindMany.mockReset()
    mockFindUnique.mockReset()
    mockCreate.mockReset()
    mockUpdate.mockReset()
  })

  describe('getAllProducts()', () => {
    it('retourne tous les produits triés par date décroissante', async () => {
      const products = [
        { id: '1', name: 'Produit A' },
        { id: '2', name: 'Produit B' },
      ]
      mockFindMany.mockResolvedValueOnce(products as never)

      const result = await getAllProducts()

      expect(result).toEqual(products)
      expect(mockFindMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      })
    })

    it('retourne un tableau vide si aucun produit', async () => {
      mockFindMany.mockResolvedValueOnce([])

      const result = await getAllProducts()

      expect(result).toEqual([])
    })
  })

  describe('getProductById()', () => {
    it('retourne le produit par ID', async () => {
      const product = { id: 'product-1', name: 'Crème solaire' }
      mockFindUnique.mockResolvedValueOnce(product as never)

      const result = await getProductById('product-1')

      expect(result).toEqual(product)
      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 'product-1' } })
    })

    it('retourne null si le produit n existe pas', async () => {
      mockFindUnique.mockResolvedValueOnce(null)

      const result = await getProductById('inexistant')

      expect(result).toBeNull()
    })
  })

  describe('createProduct()', () => {
    const validProductData = {
      name: 'Crème solaire SPF50',
      slug: 'creme-solaire-spf50',
      description: 'Protection solaire haute',
      shortDescription: 'SPF50 pour toute la famille',
      priceFcfa: 5000,
      priceEur: 800,
      category: 'COSMETICS' as const,
      imageUrl: 'https://example.com/creme.jpg',
      inStock: true,
      stockQuantity: undefined,
      isFeatured: false,
      isActive: true,
    }

    it('crée un produit avec les données fournies', async () => {
      const createdProduct = { id: 'product-new', ...validProductData }
      mockCreate.mockResolvedValueOnce(createdProduct as never)

      const result = await createProduct(validProductData)

      expect(result).toEqual(createdProduct)
      expect(mockCreate).toHaveBeenCalledWith({ data: validProductData })
    })

    it('utilise les valeurs par défaut pour les champs optionnels', async () => {
      const dataWithDefaults = {
        ...validProductData,
        inStock: undefined,
        isFeatured: undefined,
        isActive: undefined,
      }
      const createdProduct = { id: 'product-new', ...dataWithDefaults }
      mockCreate.mockResolvedValueOnce(createdProduct as never)

      await createProduct(dataWithDefaults)

      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          inStock: true,
          isFeatured: false,
          isActive: true,
        }),
      })
    })
  })

  describe('updateProduct()', () => {
    it('met à jour un produit existant', async () => {
      const updatedProduct = { id: 'product-1', name: 'Nouveau nom' }
      mockUpdate.mockResolvedValueOnce(updatedProduct as never)

      const result = await updateProduct('product-1', { name: 'Nouveau nom' })

      expect(result).toEqual(updatedProduct)
      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: 'product-1' },
        data: { name: 'Nouveau nom' },
      })
    })

    it('accepte des mises à jour partielles', async () => {
      const updatedProduct = { id: 'product-1', priceFcfa: 6000 }
      mockUpdate.mockResolvedValueOnce(updatedProduct as never)

      const result = await updateProduct('product-1', { priceFcfa: 6000 })

      expect(result).toEqual(updatedProduct)
    })
  })

  describe('deleteProduct()', () => {
    it('désactive le produit (isActive = false)', async () => {
      mockUpdate.mockResolvedValueOnce({ id: 'product-1', isActive: false } as never)

      await deleteProduct('product-1')

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: 'product-1' },
        data: { isActive: false },
      })
    })
  })
})
