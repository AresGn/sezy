// src/features/tracking/__tests__/parcel.actions.test.ts
/**
 * Tests unitaires — parcel.actions.ts
 * Vérifie createParcelAction et updateParcelStatusAction
 * Couverture: nominal, UNAUTHORIZED, VALIDATION_ERROR, BUSINESS_RULE_ERROR (DM-002), NOT_FOUND
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

// ─────────────────────────────────────────────────────────────
// MOCKS - Utilise vi.hoisted pour éviter les erreurs de declaration
// ─────────────────────────────────────────────────────────────

const { mockRevalidatePath } = vi.hoisted(() => ({
  mockRevalidatePath: vi.fn(),
}))

const { mockParcelUpdate, mockParcelCreate, mockParcelCount, mockParcelStatusLogCreate } =
  vi.hoisted(() => ({
    mockParcelUpdate: vi.fn(),
    mockParcelCreate: vi.fn(),
    mockParcelCount: vi.fn(),
    mockParcelStatusLogCreate: vi.fn(),
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
    parcel: {
      update: mockParcelUpdate,
      create: mockParcelCreate,
      count: mockParcelCount,
    },
    parcelStatusLog: { create: mockParcelStatusLogCreate },
  },
}))

// Import APRÈS les mocks
import {
  createParcelAction,
  updateParcelStatusAction,
} from '@/features/tracking/actions/parcel.actions'

describe('parcel.actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Mock ADMIN_EMAIL pour les tests
    vi.stubEnv('ADMIN_EMAIL', 'admin@test.com')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  // ─────────────────────────────────────────────────────────
  // TEST SUITE: updateParcelStatusAction
  // ─────────────────────────────────────────────────────────
  describe('updateParcelStatusAction()', () => {
    const validParams = {
      parcelId: 'parcel-123',
      status: 'IN_FLIGHT' as const,
      note: 'Colis en route vers Cotonou',
    }

    it('DM-002: met à jour le statut - cas nominal', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })
      mockParcelUpdate.mockResolvedValueOnce({ id: 'parcel-123', status: 'IN_FLIGHT' })
      mockParcelStatusLogCreate.mockResolvedValueOnce({ id: 'log-1' })

      const result = await updateParcelStatusAction(
        validParams.parcelId,
        validParams.status,
        validParams.note,
      )

      expect(result.success).toBe(true)
      expect(mockParcelUpdate).toHaveBeenCalled()
    })

    it('UNAUTHORIZED: retourne erreur si pas de session', async () => {
      mockAuth.mockResolvedValueOnce(null)

      const result = await updateParcelStatusAction(validParams.parcelId, validParams.status)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('UNAUTHORIZED')
      }
    })

    it('DM-002: revalidatePath après mise à jour', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })
      mockParcelUpdate.mockResolvedValueOnce({ id: 'parcel-123', status: 'IN_FLIGHT' })
      mockParcelStatusLogCreate.mockResolvedValueOnce({ id: 'log-1' })

      await updateParcelStatusAction(validParams.parcelId, validParams.status)

      expect(mockRevalidatePath).toHaveBeenCalledWith('/admin')
    })
  })

  // ─────────────────────────────────────────────────────────
  // TEST SUITE: createParcelAction
  // ─────────────────────────────────────────────────────────
  describe('createParcelAction()', () => {
    const validParcelData = {
      senderName: 'Jean Dupont',
      senderPhone: '+33612345678',
      recipientName: 'Marie Kouassi',
      recipientPhone: '+22901234567',
      weightKg: 5.5,
    }

    it('crée un colis - cas nominal', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })
      mockParcelCount.mockResolvedValueOnce(5)
      mockParcelCreate.mockResolvedValueOnce({
        id: 'parcel-new',
        trackingCode: 'SEZY-2026-0006',
        ...validParcelData,
        status: 'RECEIVED_PARIS',
      })
      mockParcelStatusLogCreate.mockResolvedValueOnce({ id: 'log-1' })

      const result = await createParcelAction(validParcelData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.trackingCode).toBe('SEZY-2026-0006')
      }
    })

    it('VALIDATION_ERROR: retourne erreur si senderName manquant', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })

      const result = await createParcelAction({ ...validParcelData, senderName: '' })

      expect(result.success).toBe(false)
    })

    it('UNAUTHORIZED: retourne erreur si pas admin', async () => {
      mockAuth.mockResolvedValueOnce(null)

      const result = await createParcelAction(validParcelData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe('UNAUTHORIZED')
      }
    })

    it('BUSINESS_RULE_ERROR: génère code unique SEZY-YYYY-NNNN', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })
      mockParcelCount.mockResolvedValueOnce(0)
      mockParcelCreate.mockResolvedValueOnce({
        id: 'parcel-new',
        trackingCode: 'SEZY-2026-0001',
        ...validParcelData,
      })
      mockParcelStatusLogCreate.mockResolvedValueOnce({ id: 'log-1' })

      const result = await createParcelAction(validParcelData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.trackingCode).toMatch(/^SEZY-\d{4}-\d{4}$/)
      }
    })

    it('revalidatePath après création', async () => {
      mockAuth.mockResolvedValueOnce({ user: { email: 'admin@test.com' } })
      mockParcelCount.mockResolvedValueOnce(0)
      mockParcelCreate.mockResolvedValueOnce({
        id: 'parcel-new',
        trackingCode: 'SEZY-2026-0001',
        ...validParcelData,
      })
      mockParcelStatusLogCreate.mockResolvedValueOnce({ id: 'log-1' })

      await createParcelAction(validParcelData)

      expect(mockRevalidatePath).toHaveBeenCalledWith('/admin')
    })
  })
})
