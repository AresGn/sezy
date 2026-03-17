// src/features/flights/services/__tests__/flight.service.test.ts
/**
 * Tests unitaires — flight.service.ts
 * Vérifie la logique de getNextFlight()
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { getNextFlight } from '@/features/flights/services/flight.service'
import { db } from '@/lib/db'

// Le mock de db est défini globalement dans src/test/setup.ts
const mockFindFirst = vi.mocked(db.flight.findFirst)

// Type minimal simulant un vol Prisma pour les tests
interface MockFlight {
  id: string
  direction: string
  status: string
  departureDate: Date
  origin: string
  destination: string
  availableSpots: number
  priceEur: number
  priceFcfa: number
  createdAt: Date
  updatedAt: Date
}

function makeMockFlight(overrides: Partial<MockFlight> = {}): MockFlight {
  return {
    id: 'flight-test-1',
    direction: 'PARIS_TO_COTONOU',
    status: 'SCHEDULED',
    departureDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // dans 7 jours
    origin: 'Paris CDG',
    destination: 'Cotonou',
    availableSpots: 20,
    priceEur: 2000, // centimes
    priceFcfa: 1300000,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  }
}

describe('getNextFlight', () => {
  beforeEach(() => {
    mockFindFirst.mockReset()
  })

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
          departureDate: expect.objectContaining({ gt: expect.any(Date) }),
        }),
      }),
    )
  })

  it('filtre uniquement la direction PARIS_TO_COTONOU', async () => {
    mockFindFirst.mockResolvedValueOnce(null)
    await getNextFlight()
    expect(mockFindFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ direction: 'PARIS_TO_COTONOU' }),
      }),
    )
  })
})
