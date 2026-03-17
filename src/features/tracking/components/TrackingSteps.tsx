'use client'

/**
 * features/tracking/components/TrackingSteps.tsx
 *
 * RESPONSABILITÉ :
 * - Afficher visuellement la progression du colis en 4 étapes
 * - Mettre en surbrillance l'étape actuelle (current)
 * - Mettre en couleur logistique les étapes passées
 *
 * DESIGN SYSTEM :
 * - bg-logistics pour étapes terminées
 * - font-sans pour les libellés
 * - Emojis : 📦 ✈️ 🛬 ✅
 * - ring-4 ring-logistics/25 + scale-110 pour l'étape courante
 */

import { ParcelStatus } from '@prisma/client'

interface TrackingStepsProps {
  currentStatus: ParcelStatus
}

const STEPS: { status: ParcelStatus; label: string; emoji: string }[] = [
  { status: 'RECEIVED_PARIS', label: 'Reçu à Paris', emoji: '📦' },
  { status: 'IN_FLIGHT', label: 'En vol', emoji: '✈️' },
  { status: 'ARRIVED_COTONOU', label: 'Arrivé à Cotonou', emoji: '🛬' },
  { status: 'AVAILABLE', label: 'Disponible', emoji: '✅' },
]

const ORDER: ParcelStatus[] = ['RECEIVED_PARIS', 'IN_FLIGHT', 'ARRIVED_COTONOU', 'AVAILABLE']

export default function TrackingSteps({ currentStatus }: TrackingStepsProps) {
  const currentIndex = ORDER.indexOf(currentStatus)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 relative py-4 isolate">
      {/* Ligne de fond (visible uniquement sur sm+) */}
      <div className="absolute top-10 left-8 right-8 h-1 bg-gray-100 -z-10 hidden sm:block" />

      {STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex
        const isCurrent = index === currentIndex

        return (
          <div
            key={step.status}
            className="flex sm:flex-col items-center flex-1 gap-3 sm:gap-0 w-full sm:w-auto relative"
          >
            {/* Indicateur visuel (cercle) */}
            <div
              className={`
                w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-xl
                transition-all duration-300
                ${isCompleted ? 'bg-logistics shadow-md' : 'bg-gray-100 grayscale opacity-60'}
                ${isCurrent ? 'ring-4 ring-logistics/25 scale-110' : ''}
              `}
            >
              {step.emoji}
            </div>

            {/* Libellé de l'étape */}
            <div className="sm:mt-3 flex-1 sm:flex-none">
              <p
                className={`text-sm sm:text-xs text-left sm:text-center font-medium sm:max-w-[90px] leading-tight
                  ${isCompleted ? 'text-logistics font-semibold' : 'text-gray-400'}
                `}
              >
                {step.label}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
