/**
 * src/app/admin/colis/[id]/ParcelStatusForm.tsx
 *
 * RESPONSABILITÉ :
 * - Formulaire de mise à jour du statut d'un colis
 * - Client Component avec Server Action
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ParcelStatus } from '@prisma/client'

import { updateParcelStatusAction } from '@/features/tracking/actions/parcel.actions'

interface StatusOption {
  value: ParcelStatus
  label: string
}

interface ParcelStatusFormProps {
  parcelId: string
  currentStatus: ParcelStatus
  statusOptions: StatusOption[]
}

export function ParcelStatusForm({
  parcelId,
  currentStatus,
  statusOptions,
}: ParcelStatusFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    const status = formData.get('status') as ParcelStatus
    const note = formData.get('note') as string

    const result = await updateParcelStatusAction(parcelId, status, note)

    if (result.success) {
      router.refresh()
    } else {
      setError(result.error || 'Erreur lors de la mise à jour')
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
          Nouveau statut
        </label>
        <select
          id="status"
          name="status"
          defaultValue={currentStatus}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-2">
          Note (optionnel)
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          placeholder="Ajouter une note pour le client..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-sezy-navy text-white rounded-lg hover:bg-sezy-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Mise à jour...' : 'Mettre à jour'}
      </button>
    </form>
  )
}
