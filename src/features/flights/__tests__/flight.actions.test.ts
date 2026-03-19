// src/features/flights/__tests__/flight.actions.test.ts
/**
 * Tests unitaires — flight.actions.ts
 * Vérifie createFlightAction avec validation Zod et gestion d'erreurs
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { createFlightAction } from '@/features/flights/actions/flight.actions'
import { db } from '@/lib/db'

const mockCreate = vi.mocked(db.flight.create)

describe('flight.actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('createFlightAction()', () => {
    const validFlightData = {
      direction: 'PARIS_TO_COTONOU',
      origin: 'Paris CDG',
      destination: 'Cotonou',
      availableSpots: 50,
      departureDate: '2026-04-15T10:00:00',
      arrivalDate: '2026-04-15T14:00:00',
      priceEur: 2000, // 20€ en centimes
      priceFcfa: 13000,
      status: 'SCHEDULED',
      notes: null,
    }

    it('crée un vol avec des données valides', async () => {
      const mockFlight = { id: 'flight-123', ...validFlightData }
      mockCreate.mockResolvedValueOnce(mockFlight as never)

      const result = await createFlightAction(validFlightData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.id).toBe('flight-123')
      }
      expect(mockCreate).toHaveBeenCalledWith({
        data: expect.objectContaining({
          direction: 'PARIS_TO_COTONOU',
          origin: 'Paris CDG',
          destination: 'Cotonou',
        }),
      })
    })

    it('retourne une erreur si direction invalide', async () => {
      const invalidData = { ...validFlightData, direction: 'INVALID_DIRECTION' }

      const result = await createFlightAction(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('Données du vol invalides.')
        expect(result.fieldErrors).toBeDefined()
      }
    })

    it('retourne une erreur si origin manquante', async () => {
      const invalidData = { ...validFlightData, origin: '' }

      const result = await createFlightAction(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.fieldErrors?.origin).toBeDefined()
      }
    })

    it('retourne une erreur si destination manquante', async () => {
      const invalidData = { ...validFlightData, destination: '' }

      const result = await createFlightAction(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.fieldErrors?.destination).toBeDefined()
      }
    })

    it('retourne une erreur si availableSpots négatif', async () => {
      const invalidData = { ...validFlightData, availableSpots: -1 }

      const result = await createFlightAction(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.fieldErrors?.availableSpots).toBeDefined()
      }
    })

    it('retourne une erreur si priceEur négatif', async () => {
      const invalidData = { ...validFlightData, priceEur: -100 }

      const result = await createFlightAction(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.fieldErrors?.priceEur).toBeDefined()
      }
    })

    it('retourne une erreur si priceFcfa négatif', async () => {
      const invalidData = { ...validFlightData, priceFcfa: -5000 }

      const result = await createFlightAction(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.fieldErrors?.priceFcfa).toBeDefined()
      }
    })

    it('retourne une erreur si departureDate manquante', async () => {
      const invalidData = { ...validFlightData, departureDate: undefined as unknown as string }

      const result = await createFlightAction(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.fieldErrors?.departureDate).toBeDefined()
      }
    })

    it('gère les erreurs inattendues de façon propre', async () => {
      mockCreate.mockRejectedValueOnce(new Error('Database error'))

      const result = await createFlightAction(validFlightData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('Une erreur est survenue lors de la création du vol.')
      }
    })

    it('accepte les notes optionnelles', async () => {
      const dataWithNotes = { ...validFlightData, notes: 'Vol spécial' }
      const mockFlight = { id: 'flight-123', ...dataWithNotes }
      mockCreate.mockResolvedValueOnce(mockFlight as never)

      const result = await createFlightAction(dataWithNotes)

      expect(result.success).toBe(true)
    })

    it('accepte un statut personnalisé', async () => {
      const dataWithStatus = { ...validFlightData, status: 'CANCELLED' }
      const mockFlight = { id: 'flight-123', ...dataWithStatus }
      mockCreate.mockResolvedValueOnce(mockFlight as never)

      const result = await createFlightAction(dataWithStatus)

      expect(result.success).toBe(true)
    })
  })
})
