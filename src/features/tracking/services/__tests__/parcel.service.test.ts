// src/features/tracking/services/__tests__/parcel.service.test.ts
/**
 * Tests unitaires — parcel.service.ts
 * Vérifie la logique de getAllParcels(), getParcelById(), updateParcelStatus()
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

import {
  getAllParcels,
  getParcelById,
  updateParcelStatus,
} from '@/features/tracking/services/parcel.service'
import { db } from '@/lib/db'

const mockFindMany = vi.mocked(db.parcel.findMany)
const mockFindUnique = vi.mocked(db.parcel.findUnique)
const mockUpdate = vi.mocked(db.parcel.update)
const mockStatusLogCreate = vi.mocked(db.parcelStatusLog.create)

describe('parcel.service', () => {
  beforeEach(() => {
    mockFindMany.mockReset()
    mockFindUnique.mockReset()
    mockUpdate.mockReset()
    mockStatusLogCreate.mockReset()
  })

  describe('getAllParcels()', () => {
    it('retourne tous les colis triés par date décroissante', async () => {
      const parcels = [
        { id: '1', trackingCode: 'SEZY-2026-0001' },
        { id: '2', trackingCode: 'SEZY-2026-0002' },
      ]
      mockFindMany.mockResolvedValueOnce(parcels as never)

      const result = await getAllParcels()

      expect(result).toEqual(parcels)
      expect(mockFindMany).toHaveBeenCalledWith({
        orderBy: { receivedAt: 'desc' },
        include: { flight: true },
      })
    })

    it('retourne un tableau vide si aucun colis', async () => {
      mockFindMany.mockResolvedValueOnce([])

      const result = await getAllParcels()

      expect(result).toEqual([])
    })
  })

  describe('getParcelById()', () => {
    it('retourne le colis avec ses détails et logs', async () => {
      const parcel = { id: 'parcel-1', trackingCode: 'SEZY-2026-0001' }
      mockFindUnique.mockResolvedValueOnce(parcel as never)

      const result = await getParcelById('parcel-1')

      expect(result).toEqual(parcel)
      expect(mockFindUnique).toHaveBeenCalledWith({
        where: { id: 'parcel-1' },
        include: { flight: true, statusLogs: { orderBy: { loggedAt: 'desc' } } },
      })
    })

    it('retourne null si le colis n existe pas', async () => {
      mockFindUnique.mockResolvedValueOnce(null)

      const result = await getParcelById('inexistant')

      expect(result).toBeNull()
    })
  })

  describe('updateParcelStatus()', () => {
    it('met à jour le statut et crée un log', async () => {
      const updatedParcel = { id: 'parcel-1', status: 'IN_FLIGHT' }
      mockUpdate.mockResolvedValueOnce(updatedParcel as never)
      mockStatusLogCreate.mockResolvedValueOnce({ id: 'log-1' } as never)

      const result = await updateParcelStatus('parcel-1', 'IN_FLIGHT', 'Colis en route')

      expect(result).toEqual(updatedParcel)
      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: 'parcel-1' },
        data: { status: 'IN_FLIGHT', currentNote: 'Colis en route' },
        include: { flight: true },
      })
      expect(mockStatusLogCreate).toHaveBeenCalledWith({
        data: { parcelId: 'parcel-1', status: 'IN_FLIGHT', note: 'Colis en route' },
      })
    })

    it('accepte une note optionnelle', async () => {
      const updatedParcel = { id: 'parcel-1', status: 'ARRIVED_COTONOU' }
      mockUpdate.mockResolvedValueOnce(updatedParcel as never)
      mockStatusLogCreate.mockResolvedValueOnce({ id: 'log-1' } as never)

      const result = await updateParcelStatus('parcel-1', 'ARRIVED_COTONOU')

      expect(result).toEqual(updatedParcel)
      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: 'parcel-1' },
        data: { status: 'ARRIVED_COTONOU', currentNote: null },
        include: { flight: true },
      })
    })
  })
})
