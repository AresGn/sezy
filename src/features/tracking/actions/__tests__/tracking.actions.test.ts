import { describe, it, expect, vi, beforeEach } from 'vitest'

import { searchParcelByCodeAction } from '../tracking.actions'
import * as trackingService from '../../services/tracking.service'

vi.mock('../../services/tracking.service', () => ({
  searchByCode: vi.fn(),
}))

describe('Tracking Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('searchParcelByCodeAction()', () => {
    it('retourne une erreur si le format du code est invalide', async () => {
      const result = await searchParcelByCodeAction({ trackingCode: 'ABC-123' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('Code de suivi invalide ou mal formaté.')
        expect(result.fieldErrors?.trackingCode).toBeDefined()
      }
    })

    it("retourne NOT FOUND si le colis n'existe pas", async () => {
      vi.mocked(trackingService.searchByCode).mockResolvedValue(null)

      const result = await searchParcelByCodeAction({ trackingCode: 'SEZY-2026-9999' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('Aucun colis trouvé pour ce code de suivi.')
      }
    })

    it('retourne le colis en cas de succès avec un code respectant Zod', async () => {
      const mockResult = {
        id: '123',
        trackingCode: 'SEZY-2026-0001',
        senderName: 'Marie',
        recipientName: 'Jean',
        weightKg: 5,
        status: 'RECEIVED_PARIS',
        currentNote: null,
        receivedAt: new Date(),
        flight: null,
        steps: [],
      } as any // eslint-disable-line @typescript-eslint/no-explicit-any

      vi.mocked(trackingService.searchByCode).mockResolvedValue(mockResult)

      const result = await searchParcelByCodeAction({ trackingCode: 'SEZY-2026-0001' })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.trackingCode).toBe('SEZY-2026-0001')
      }
    })

    it('gère les erreurs inattendues de façon propre', async () => {
      vi.mocked(trackingService.searchByCode).mockRejectedValue(new Error('Database explosion'))

      const result = await searchParcelByCodeAction({ trackingCode: 'SEZY-2026-0001' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('Une erreur est survenue lors de la recherche du colis.')
      }
    })
  })
})
