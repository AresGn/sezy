/**
 * src/app/admin/messages/page.tsx
 *
 * RESPONSABILITÉ :
 * - Liste des messages de contact avec badges non lus
 * - Bouton pour marquer comme lu
 * - Server Component avec getAllMessages()
 */

import { Mail, Check, MailOpen } from 'lucide-react'

import { getAllMessages } from '@/features/contact/services/message.service'

import { markMessageAsReadAction } from './markMessageAsReadButton'

const SUBJECT_LABELS: Record<string, string> = {
  LOGISTICS: 'Logistique',
  SHOPPING: 'Shopping',
  STUDIES: 'Études',
  TRACKING: 'Suivi',
  OTHER: 'Autre',
}

/**
 * Badge de sujet
 */
function SubjectBadge({ subject }: { subject: string }) {
  const styles: Record<string, string> = {
    LOGISTICS: 'bg-blue-100 text-blue-800',
    SHOPPING: 'bg-green-100 text-green-800',
    STUDIES: 'bg-purple-100 text-purple-800',
    TRACKING: 'bg-yellow-100 text-yellow-800',
    OTHER: 'bg-gray-100 text-gray-800',
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[subject] || 'bg-gray-100 text-gray-800'}`}
    >
      {SUBJECT_LABELS[subject] || subject}
    </span>
  )
}

/**
 * Page liste des messages - Server Component
 */
export default async function AdminMessagesPage() {
  const messages = await getAllMessages()
  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-sezy-navy">Messages de contact</h2>
        <p className="text-gray-500 mt-1">
          {messages.length} message(s) · {unreadCount} non lu(s)
        </p>
      </div>

      {/* Liste des messages */}
      {messages.length === 0 ? (
        <div className="bg-white rounded-card shadow-card border border-gray-100 p-12 text-center">
          <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun message reçu</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`bg-white rounded-card shadow-card border p-6 transition-all ${
                message.isRead
                  ? 'border-gray-100 opacity-75'
                  : 'border-sezy-navy/20 border-l-4 border-l-sezy-navy'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full ${message.isRead ? 'bg-gray-100' : 'bg-sezy-navy/10'}`}
                  >
                    {message.isRead ? (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Mail className="w-5 h-5 text-sezy-navy" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-sezy-navy">{message.fullName}</h3>
                      <SubjectBadge subject={message.subject} />
                      {!message.isRead && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Non lu
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {message.email}
                      {message.phone && ` · ${message.phone}`}
                    </div>
                    <p className="text-gray-700">{message.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Reçu le {new Date(message.createdAt).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>
                {!message.isRead && (
                  <form action={markMessageAsReadAction.bind(null, message.id)}>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-sezy-navy border border-sezy-navy rounded-lg hover:bg-sezy-navy hover:text-white transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Marquer comme lu
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
