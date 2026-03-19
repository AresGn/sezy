/**
 * src/app/admin/colis/nouveau/page.tsx
 *
 * RESPONSABILITÉ :
 * - Page de création d'un nouveau colis
 * - Formulaire (Client Component) pour l'enregistrement
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Save } from 'lucide-react'

import { createParcelAction } from '@/features/tracking/actions/parcel.actions'

export default function NewParcelPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // États du formulaire
  const [formData, setFormData] = useState({
    senderName: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    weightKg: 1,
    currentNote: 'Colis reçu à Paris',
    flightId: '', // Optionnel, à implémenter plus tard avec la liste des vols
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weightKg' ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await createParcelAction({
        ...formData,
        // On assure que le flightId est undefined si vide pour éviter l'erreur Prisma
        flightId: formData.flightId || undefined,
      })

      if (result.success) {
        router.push('/admin/colis')
        router.refresh()
      } else {
        setError(result.error || 'Une erreur est survenue.')
        // Afficher les erreurs de champs si disponibles
        if (result.fieldErrors) {
          const fieldErrorMsg = Object.values(result.fieldErrors).flat().join(', ')
          setError(`Erreur de validation : ${fieldErrorMsg}`)
        }
      }
    } catch {
      setError('Une erreur technique est survenue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/colis"
          className="p-2 text-gray-400 hover:text-sezy-navy hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-sezy-navy">Nouveau Colis</h1>
          <p className="text-gray-500">Enregistrement d'un colis reçu</p>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-card shadow-card border border-gray-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          {/* Section Expéditeur */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
              Expéditeur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy"
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                <input
                  type="tel"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>
          </div>

          {/* Section Destinataire */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
              Destinataire
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy"
                  placeholder="Marie Koffi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                <input
                  type="tel"
                  name="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy"
                  placeholder="+229 97 00 00 00"
                />
              </div>
            </div>
          </div>

          {/* Section Colis */}
          <div className="space-y-4 pt-2">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2">
              Détails du Colis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Poids (kg) *</label>
                <input
                  type="number"
                  name="weightKg"
                  value={formData.weightKg}
                  onChange={handleChange}
                  required
                  step="0.1"
                  min="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy"
                />
              </div>
              {/* Le champ Note pourrait être ajouté ici si besoin, pour l'instant on utilise la valeur par défaut */}
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sezy-navy text-white font-medium rounded-lg hover:bg-sezy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sezy-navy disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Enregistrer le Colis
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
