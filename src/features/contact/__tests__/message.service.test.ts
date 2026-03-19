// src/features/contact/__tests__/message.service.test.ts
/**
 * Tests unitaires — message.service.ts
 * Vérifie la logique de getAllMessages(), getMessageById(), markMessageAsRead()
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'

import {
  getAllMessages,
  getMessageById,
  markMessageAsRead,
} from '@/features/contact/services/message.service'
import { db } from '@/lib/db'

const mockFindMany = vi.mocked(db.contactMessage.findMany)
const mockFindUnique = vi.mocked(db.contactMessage.findUnique)
const mockUpdate = vi.mocked(db.contactMessage.update)

describe('message.service', () => {
  beforeEach(() => {
    mockFindMany.mockReset()
    mockFindUnique.mockReset()
    mockUpdate.mockReset()
  })

  describe('getAllMessages()', () => {
    it('retourne tous les messages triés par date décroissante', async () => {
      const messages = [
        { id: '1', fullName: 'Jean', message: 'Bonjour' },
        { id: '2', fullName: 'Marie', message: 'Salut' },
      ]
      mockFindMany.mockResolvedValueOnce(messages as never)

      const result = await getAllMessages()

      expect(result).toEqual(messages)
      expect(mockFindMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
      })
    })

    it('retourne un tableau vide si aucun message', async () => {
      mockFindMany.mockResolvedValueOnce([])

      const result = await getAllMessages()

      expect(result).toEqual([])
    })
  })

  describe('getMessageById()', () => {
    it('retourne le message par ID', async () => {
      const message = { id: 'message-1', fullName: 'Jean', isRead: false }
      mockFindUnique.mockResolvedValueOnce(message as never)

      const result = await getMessageById('message-1')

      expect(result).toEqual(message)
      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: 'message-1' } })
    })

    it('retourne null si le message n existe pas', async () => {
      mockFindUnique.mockResolvedValueOnce(null)

      const result = await getMessageById('inexistant')

      expect(result).toBeNull()
    })
  })

  describe('markMessageAsRead()', () => {
    it('met à jour le champ isRead à true', async () => {
      mockUpdate.mockResolvedValueOnce({ id: 'message-1', isRead: true } as never)

      await markMessageAsRead('message-1')

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: 'message-1' },
        data: { isRead: true },
      })
    })
  })
})
