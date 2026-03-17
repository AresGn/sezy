import { describe, it, expect, vi } from 'vitest'

import { db } from '@/lib/db'

import { searchByCode, formatParcel } from '../tracking.service'

vi.mock('@/lib/db', () => ({
  db: {
    parcel: { findUnique: vi.fn() },
  },
}))

describe('Tracking Service', () => {
  describe('formatParcel()', () => {
    it('formate correctement le colis en omettant les numéros de téléphone (SÉCURITÉ)', () => {
      const mockParcel = {
        id: '123',
        trackingCode: 'SEZY-2026-0001',
        senderName: 'Marie',
        senderPhone: '+33612345678', // Ne doit pas être dans le résultat
        recipientName: 'Jean',
        recipientPhone: '+22901234567', // Ne doit pas être dans le résultat
        weightKg: 5,
        status: 'RECEIVED_PARIS',
        currentNote: 'Note',
        receivedAt: new Date(),
        flightId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        flight: null,
      } as any // eslint-disable-line @typescript-eslint/no-explicit-any

      const formatted = formatParcel(mockParcel)

      expect(formatted).not.toHaveProperty('senderPhone')
      expect(formatted).not.toHaveProperty('recipientPhone')
      expect(formatted.trackingCode).toBe('SEZY-2026-0001')
      expect(formatted.status).toBe('RECEIVED_PARIS')
    })

    it('inclut les informations de vol si présentes', () => {
      const mockParcel = {
        id: '123',
        trackingCode: 'SEZY-2026-0001',
        senderName: 'Marie',
        senderPhone: '+336',
        recipientName: 'Jean',
        recipientPhone: '+229',
        weightKg: 5,
        status: 'IN_FLIGHT',
        currentNote: null,
        receivedAt: new Date(),
        flightId: 'flight-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        flight: {
          id: 'flight-1',
          direction: 'PARIS_TO_COTONOU',
          departureDate: new Date(),
          arrivalDate: new Date(),
          status: 'IN_FLIGHT',
        },
      } as any // eslint-disable-line @typescript-eslint/no-explicit-any

      const formatted = formatParcel(mockParcel)
      expect(formatted.flight).toBeDefined()
      expect(formatted.flight?.direction).toBe('PARIS_TO_COTONOU')
    })
  })

  describe('searchByCode()', () => {
    it('retourne le colis formaté si trouvé', async () => {
      vi.mocked(db.parcel.findUnique).mockResolvedValue({
        id: '123',
        trackingCode: 'SEZY-2026-0001',
        senderName: 'Marie',
        senderPhone: '+336',
        recipientName: 'Jean',
        recipientPhone: '+229',
        weightKg: 5,
        status: 'RECEIVED_PARIS',
        currentNote: null,
        receivedAt: new Date(),
        flight: null,
      } as any) // eslint-disable-line @typescript-eslint/no-explicit-any

      const result = await searchByCode('SEZY-2026-0001')
      expect(result).toBeDefined()
      expect(result?.trackingCode).toBe('SEZY-2026-0001')
      expect(result).not.toHaveProperty('senderPhone')
    })

    it("retourne null si le colis n'est pas trouvé", async () => {
      vi.mocked(db.parcel.findUnique).mockResolvedValue(null)

      const result = await searchByCode('SEZY-9999-9999')
      expect(result).toBeNull()
    })
  })
})
