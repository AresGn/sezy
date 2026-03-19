/**
 * src/features/flights/components/FlightForm.tsx
 *
 * RESPONSABILITÉ :
 * - Formulaire de création/modification d'un vol
 * - Client Component pour interactivité
 * - Utilise createFlightAction
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FlightDirection, FlightStatus } from '@prisma/client'

import { createFlightAction } from '@/features/flights/actions/flight.actions'

const DIRECTION_OPTIONS = [
  { value: FlightDirection.PARIS_TO_COTONOU, label: 'Paris → Cotonou' },
  { value: FlightDirection.COTONOU_TO_PARIS, label: 'Cotonou → Paris' },
]

const STATUS_OPTIONS = [
  { value: FlightStatus.SCHEDULED, label: 'Programmé' },
  { value: FlightStatus.BOARDING, label: 'Embarquement' },
  { value: FlightStatus.IN_FLIGHT, label: 'En vol' },
  { value: FlightStatus.COMPLETED, label: 'Terminé' },
  { value: FlightStatus.CANCELLED, label: 'Annulé' },
]

interface FlightFormProps {
  defaultValues?: {
    direction?: FlightDirection
    origin?: string
    destination?: string
    availableSpots?: number
    departureDate?: string
    arrivalDate?: string
    priceEur?: number
    priceFcfa?: number
    status?: FlightStatus
    notes?: string
  }
}

export function FlightForm({ defaultValues }: FlightFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    const data = {
      direction: formData.get('direction') as FlightDirection,
      origin: formData.get('origin') as string,
      destination: formData.get('destination') as string,
      availableSpots: parseInt(formData.get('availableSpots') as string, 10),
      departureDate: formData.get('departureDate') as string,
      arrivalDate: formData.get('arrivalDate') as string,
      priceEur: parseInt(formData.get('priceEur') as string, 10) * 100, // Convert to cents
      priceFcfa: parseInt(formData.get('priceFcfa') as string, 10),
      status: formData.get('status') as FlightStatus,
      notes: (formData.get('notes') as string) || null,
    }

    const result = await createFlightAction(data)

    if (result.success) {
      router.push('/admin/vols')
      router.refresh()
    } else {
      setError(result.error || 'Erreur lors de la création')
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Direction */}
        <div>
          <label htmlFor="direction" className="block text-sm font-medium text-gray-700 mb-2">
            Direction *
          </label>
          <select
            id="direction"
            name="direction"
            required
            defaultValue={defaultValues?.direction || FlightDirection.PARIS_TO_COTONOU}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          >
            {DIRECTION_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Statut */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
            Statut *
          </label>
          <select
            id="status"
            name="status"
            required
            defaultValue={defaultValues?.status || FlightStatus.SCHEDULED}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Origine */}
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
            Origine *
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            required
            defaultValue={defaultValues?.origin || 'Paris'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          />
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
            Destination *
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            required
            defaultValue={defaultValues?.destination || 'Cotonou'}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          />
        </div>

        {/* Date de départ */}
        <div>
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-2">
            Date de départ *
          </label>
          <input
            type="datetime-local"
            id="departureDate"
            name="departureDate"
            required
            defaultValue={defaultValues?.departureDate || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          />
        </div>

        {/* Date d'arrivée */}
        <div>
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-2">
            Date d'arrivée *
          </label>
          <input
            type="datetime-local"
            id="arrivalDate"
            name="arrivalDate"
            required
            defaultValue={defaultValues?.arrivalDate || ''}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          />
        </div>

        {/* Places disponibles */}
        <div>
          <label htmlFor="availableSpots" className="block text-sm font-medium text-gray-700 mb-2">
            Places disponibles *
          </label>
          <input
            type="number"
            id="availableSpots"
            name="availableSpots"
            required
            min="0"
            defaultValue={defaultValues?.availableSpots || 50}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          />
        </div>

        {/* Prix EUR */}
        <div>
          <label htmlFor="priceEur" className="block text-sm font-medium text-gray-700 mb-2">
            Prix (EUR) *
          </label>
          <input
            type="number"
            id="priceEur"
            name="priceEur"
            required
            min="0"
            step="0.01"
            defaultValue={defaultValues?.priceEur ? defaultValues.priceEur / 100 : 20}
            placeholder="20.00"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">Prix en euros (ex: 20 = 20€)</p>
        </div>

        {/* Prix FCFA */}
        <div>
          <label htmlFor="priceFcfa" className="block text-sm font-medium text-gray-700 mb-2">
            Prix (FCFA) *
          </label>
          <input
            type="number"
            id="priceFcfa"
            name="priceFcfa"
            required
            min="0"
            defaultValue={defaultValues?.priceFcfa || 10000}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          />
        </div>
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          Notes (optionnel)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          defaultValue={defaultValues?.notes || ''}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          placeholder="Informations supplémentaires..."
        />
      </div>

      {/* Boutons */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-sezy-navy text-white rounded-lg hover:bg-sezy-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Création...' : 'Créer le vol'}
        </button>
      </div>
    </form>
  )
}
