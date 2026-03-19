// src/features/admin/__tests__/dashboard.service.test.ts
/**
 * Tests unitaires — dashboard.service.ts
 * Vérifie getAdminDashboardStats() selon DOC 04 section 9
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

import { getAdminDashboardStats } from '@/features/admin/services/dashboard.service'
import { db } from '@/lib/db'

const mockFlightCount = vi.mocked(db.flight.count)
const mockParcelCount = vi.mocked(db.parcel.count)
const mockProductCount = vi.mocked(db.product.count)
const mockMessageCount = vi.mocked(db.contactMessage.count)

describe('dashboard.service', () => {
  beforeEach(() => {
    mockFlightCount.mockReset()
    mockParcelCount.mockReset()
    mockProductCount.mockReset()
    mockMessageCount.mockReset()
  })

  describe('getAdminDashboardStats()', () => {
    it('retourne les stats avec les valeurs correctes', async () => {
      mockFlightCount.mockResolvedValueOnce(5)
      mockParcelCount.mockResolvedValueOnce(12)
      mockProductCount.mockResolvedValueOnce(20)
      mockMessageCount.mockResolvedValueOnce(3)

      const result = await getAdminDashboardStats()

      expect(result).toEqual({
        upcomingFlights: 5,
        parcelsInTransit: 12,
        totalProducts: 20,
        unreadMessages: 3,
      })
    })

    it('compte uniquement les vols SCHEDULED dans le futur', async () => {
      mockFlightCount.mockResolvedValueOnce(0)
      mockParcelCount.mockResolvedValueOnce(0)
      mockProductCount.mockResolvedValueOnce(0)
      mockMessageCount.mockResolvedValueOnce(0)

      await getAdminDashboardStats()

      expect(mockFlightCount).toHaveBeenCalledWith({
        where: expect.objectContaining({
          status: 'SCHEDULED',
          departureDate: expect.objectContaining({ gte: expect.any(Date) }),
          deletedAt: null,
        }),
      })
    })

    it('compte les colis en transit (RECEIVED_PARIS ou IN_FLIGHT)', async () => {
      mockFlightCount.mockResolvedValueOnce(0)
      mockParcelCount.mockResolvedValueOnce(0)
      mockProductCount.mockResolvedValueOnce(0)
      mockMessageCount.mockResolvedValueOnce(0)

      await getAdminDashboardStats()

      expect(mockParcelCount).toHaveBeenCalledWith({
        where: expect.objectContaining({
          status: {
            in: ['RECEIVED_PARIS', 'IN_FLIGHT'],
          },
        }),
      })
    })

    it('compte uniquement les produits actifs', async () => {
      mockFlightCount.mockResolvedValueOnce(0)
      mockParcelCount.mockResolvedValueOnce(0)
      mockProductCount.mockResolvedValueOnce(0)
      mockMessageCount.mockResolvedValueOnce(0)

      await getAdminDashboardStats()

      expect(mockProductCount).toHaveBeenCalledWith({
        where: expect.objectContaining({
          isActive: true,
        }),
      })
    })

    it('compte uniquement les messages non lus', async () => {
      mockFlightCount.mockResolvedValueOnce(0)
      mockParcelCount.mockResolvedValueOnce(0)
      mockProductCount.mockResolvedValueOnce(0)
      mockMessageCount.mockResolvedValueOnce(0)

      await getAdminDashboardStats()

      expect(mockMessageCount).toHaveBeenCalledWith({
        where: expect.objectContaining({
          isRead: false,
        }),
      })
    })

    it('retourne des zéros si aucune donnée', async () => {
      mockFlightCount.mockResolvedValueOnce(0)
      mockParcelCount.mockResolvedValueOnce(0)
      mockProductCount.mockResolvedValueOnce(0)
      mockMessageCount.mockResolvedValueOnce(0)

      const result = await getAdminDashboardStats()

      expect(result).toEqual({
        upcomingFlights: 0,
        parcelsInTransit: 0,
        totalProducts: 0,
        unreadMessages: 0,
      })
    })
  })
})
