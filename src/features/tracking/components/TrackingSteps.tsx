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
    <div className="flex flex-col sm:flex-row w-full isolate pt-2 pb-4 px-2 sm:px-0">
      {STEPS.map((step, index) => {
        const isCompleted = index <= currentIndex
        const isCurrent = index === currentIndex

        return (
          <div
            key={step.status}
            className="flex sm:flex-col items-center flex-1 w-full sm:w-auto relative py-4 sm:py-0"
          >
            {/* Lignes connectrices avec l'étape précédente */}
            {index > 0 && (
              <>
                {/* HORIZONTALE (Desktop) */}
                <div
                  className={`absolute hidden sm:block h-1 top-6 w-full right-1/2 -z-10 transition-colors duration-300 ${
                    isCompleted ? 'bg-logistics' : 'bg-gray-100'
                  }`}
                />
                {/* VERTICALE (Mobile) */}
                <div
                  className={`absolute sm:hidden w-1 left-[3.5rem] h-full bottom-1/2 -ml-0.5 -z-10 transition-colors duration-300 ${
                    isCompleted ? 'bg-logistics' : 'bg-gray-100'
                  }`}
                  style={{ left: '23px' /* Alignement parfait avec le w-12/center */ }}
                />
              </>
            )}

            {/* Bulle indicateur */}
            <div
              className={`
                w-12 h-12 relative z-10 flex-shrink-0 rounded-full flex items-center justify-center text-xl
                transition-all duration-300
                ${isCompleted ? 'bg-logistics shadow-md' : 'bg-gray-100 grayscale opacity-90'}
                ${isCurrent ? 'ring-4 ring-logistics/30 scale-110' : ''}
              `}
            >
              <span>{step.emoji}</span>
            </div>

            {/* Label de l'étape */}
            <div className="ml-5 sm:ml-0 sm:mt-4 flex-1 sm:flex-none">
              <p
                className={`text-base sm:text-xs text-left sm:text-center font-medium leading-tight
                  ${isCompleted ? 'text-logistics font-bold' : 'text-gray-400'}
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
