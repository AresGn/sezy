'use client'

/**
 * features/tracking/components/TrackingForm.tsx
 *
 * RESPONSABILITÉ :
 * - Afficher le formulaire de saisie du code de suivi
 * - Gérer l'état de chargement et les erreurs de validation
 * - Appeler la Server Action pour la recherche (ou rediriger via URL)
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { searchParcelByCodeAction } from '../actions/tracking.actions'

export default function TrackingForm({ initialCode = '' }: { initialCode?: string }) {
  const router = useRouter()
  const [code, setCode] = useState(initialCode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedCode = code.trim().toUpperCase()
    if (!trimmedCode) return

    setLoading(true)

    try {
      const result = await searchParcelByCodeAction({ trackingCode: trimmedCode })

      if (!result.success) {
        setError(result.error)
      } else {
        // Redirection vers l'URL avec le code pour déclencher le SSR de la page "suivi"
        router.push(`/suivi?code=${trimmedCode}`)
      }
    } catch {
      setError('Une erreur inattendue est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-card shadow-card border border-gray-100 p-6 w-full max-w-md mx-auto transition-shadow duration-200 hover:shadow-card-hover">
      <h2 className="font-heading text-xl font-bold text-gray-900 mb-4 text-center">
        Suivre mon colis
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="trackingCode" className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de suivi
          </label>
          <input
            id="trackingCode"
            type="text"
            placeholder="SEZY-YYYY-NNNN"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            className="w-full px-4 py-3 border border-gray-300 rounded-btn font-mono text-base tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-logistics focus:border-transparent transition-colors duration-200"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-btn">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="w-full bg-logistics hover:bg-logistics-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <span>Rechercher</span>
          )}
        </button>
      </form>
    </div>
  )
}
