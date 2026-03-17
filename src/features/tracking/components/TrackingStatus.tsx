'use client'

/**
 * features/tracking/components/TrackingStatus.tsx
 *
 * RESPONSABILITÉ :
 * - Afficher le résultat global de la recherche d'un colis
 * - Informations complètes : Stepper, Code, Note du facteur, Vol associé
 * - Intégrer le bouton WhatsApp pour un contact contextuel
 */

import { Plane, AlertCircle } from 'lucide-react'

import { getWhatsAppUrl } from '@/lib/whatsapp'

import { TrackingResult } from '../types'

import TrackingSteps from './TrackingSteps'

interface TrackingStatusProps {
  result: TrackingResult
}

export default function TrackingStatus({ result }: TrackingStatusProps) {
  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden transition-shadow duration-200 border border-gray-100 mt-8 w-full max-w-2xl mx-auto">
      {/* En-tête : Code tracking + Status Badge */}
      <div className="bg-gray-50 p-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 font-medium mb-1">Code de suivi</p>
          <p className="font-mono text-xl font-bold text-gray-900 tracking-widest uppercase">
            {result.trackingCode}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm text-gray-500 font-medium mb-1">Poids</p>
          <p className="font-mono text-gray-900 font-semibold">{result.weightKg} kg</p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Stepper (Progression visuelle) */}
        <div>
          <h3 className="font-heading font-bold text-gray-900 text-lg mb-6">État d'avancement</h3>
          <TrackingSteps currentStatus={result.status} />
        </div>

        {/* Note du suivi */}
        {result.currentNote && (
          <div className="bg-amber-50 rounded-btn p-4 flex gap-3 border border-amber-100">
            <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-warning text-sm">Remarque</p>
              <p className="text-sm text-gray-700 mt-1">{result.currentNote}</p>
            </div>
          </div>
        )}

        {/* Informations sur le vol (si associé) */}
        {result.flight && (
          <div className="bg-logistics-bg rounded-btn p-5 border border-logistics/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-logistics flex items-center justify-center flex-shrink-0">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-logistics-dark text-sm">Vol Assigné</p>
                <p className="text-xs text-logistics font-medium mt-0.5 uppercase tracking-wide">
                  {result.flight.direction === 'PARIS_TO_COTONOU'
                    ? 'Paris → Cotonou'
                    : 'Cotonou → Paris'}
                </p>
              </div>
            </div>
            <div className="w-full sm:w-auto text-left sm:text-right">
              <p className="text-xs text-logistics font-medium uppercase tracking-wide">
                Départ prévu
              </p>
              <p className="font-mono font-bold text-logistics-dark mt-0.5">
                {new Intl.DateTimeFormat('fr-FR', {
                  dateStyle: 'short',
                }).format(new Date(result.flight.departureDate))}
              </p>
            </div>
          </div>
        )}

        {/* Bouton WhatsApp contextuel */}
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 text-center mb-4">
            Une question sur votre colis ? Contactez-nous avec votre numéro de suivi.
          </p>
          <a
            href={getWhatsAppUrl('tracking', { trackingCode: result.trackingCode })}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold px-6 py-3 rounded-btn transition-colors duration-200 flex items-center justify-center gap-2 max-w-sm mx-auto shadow-md"
          >
            <span>Contacter le support client</span>
          </a>
        </div>
      </div>
    </div>
  )
}
