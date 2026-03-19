// src/features/flights/__tests__/flight.service.test.ts
/**
 * Tests unitaires — flight.service.ts
 * Vérifie la logique de getAllFlights(), getUpcomingFlights(), getNextFlight()
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

import {
  getAllFlights,
  getUpcomingFlights,
  getNextFlight,
} from '@/features/flights/services/flight.service'
import { db } from '@/lib/db'

const mockFindMany = vi.mocked(db.flight.findMany)
const mockFindFirst = vi.mocked(db.flight.findFirst)

// Type minimal simulant un vol Prisma pour les tests
interface MockFlight {
  id: string
  direction: string
  status: string
  departureDate: Date
  arrivalDate: Date
  origin: string
  destination: string
  availableSpots: number
  priceEur: number
  priceFcfa: number
  notes: string | null
  createdAt: Date
  updatedAt: Date
}

function makeMockFlight(overrides: Partial<MockFlight> = {}): MockFlight {
  return {
    id: 'flight-test-1',
    direction: 'PARIS_TO_COTONOU',
    status: 'SCHEDULED',
    departureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    arrivalDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
    origin: 'Paris CDG',
    destination: 'Cotonou',
    availableSpots: 20,
    priceEur: 2000,
    priceFcfa: 1300000,
    notes: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

describe('flight.service', () => {
  beforeEach(() => {
    mockFindMany.mockReset()
    mockFindFirst.mockReset()
  })

  describe('getAllFlights()', () => {
    it('retourne tous les vols non supprimés triés par date', async () => {
      const flights = [makeMockFlight({ id: '1' }), makeMockFlight({ id: '2' })]
      mockFindMany.mockResolvedValueOnce(flights as never)

      const result = await getAllFlights()

      expect(result).toEqual(flights)
      expect(mockFindMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        orderBy: { departureDate: 'asc' },
      })
    })

    it('retourne un tableau vide si aucun vol', async () => {
      mockFindMany.mockResolvedValueOnce([])

      const result = await getAllFlights()

      expect(result).toEqual([])
    })

    it('exclut les vols supprimés (deletedAt non null)', async () => {
      mockFindMany.mockResolvedValueOnce([])

      await getAllFlights()

      expect(mockFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ deletedAt: null }),
        }),
      )
    })
  })

  describe('getUpcomingFlights()', () => {
    it('retourne uniquement les vols SCHEDULED dans le futur', async () => {
      const flights = [makeMockFlight()]
      mockFindMany.mockResolvedValueOnce(flights as never)

      const result = await getUpcomingFlights()

      expect(result).toEqual(flights)
      expect(mockFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 'SCHEDULED',
            departureDate: expect.objectContaining({ gte: expect.any(Date) }),
            deletedAt: null,
          }),
        }),
      )
    })

    it('retourne un tableau vide si aucun vol à venir', async () => {
      mockFindMany.mockResolvedValueOnce([])

      const result = await getUpcomingFlights()

      expect(result).toEqual([])
    })

    it('tri les vols par date de départ croissante', async () => {
      mockFindMany.mockResolvedValueOnce([])

      await getUpcomingFlights()

      expect(mockFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { departureDate: 'asc' },
        }),
      )
    })

    it('sélectionne uniquement les champs nécessaires', async () => {
      mockFindMany.mockResolvedValueOnce([])

      await getUpcomingFlights()

      expect(mockFindMany).toHaveBeenCalledWith(
        expect.objectContaining({
          select: expect.objectContaining({
            id: true,
            direction: true,
            origin: true,
            destination: true,
            availableSpots: true,
            departureDate: true,
            arrivalDate: true,
            priceEur: true,
            priceFcfa: true,
            status: true,
            notes: true,
          }),
        }),
      )
    })
  })

  describe('getNextFlight()', () => {
    it('retourne null si aucun vol SCHEDULED dans le futur', async () => {
      mockFindFirst.mockResolvedValueOnce(null)

      const result = await getNextFlight()

      expect(result).toBeNull()
    })

    it('retourne le vol le plus proche chronologiquement', async () => {
      const futureFlight = makeMockFlight()
      mockFindFirst.mockResolvedValueOnce(futureFlight as never)

      const result = await getNextFlight()

      expect(result).toEqual(futureFlight)
      expect(result?.status).toBe('SCHEDULED')
    })

    it('appelle db avec orderBy departureDate asc', async () => {
      mockFindFirst.mockResolvedValueOnce(null)

      await getNextFlight()

      expect(mockFindFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          orderBy: { departureDate: 'asc' },
        }),
      )
    })

    it('filtre uniquement les vols SCHEDULED', async () => {
      mockFindFirst.mockResolvedValueOnce(null)

      await getNextFlight()

      expect(mockFindFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: 'SCHEDULED' }),
        }),
      )
    })

    it('filtre uniquement les vols avec departureDate dans le futur', async () => {
      mockFindFirst.mockResolvedValueOnce(null)

      await getNextFlight()

      expect(mockFindFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            departureDate: expect.objectContaining({ gte: expect.any(Date) }),
          }),
        }),
      )
    })
  })
})
