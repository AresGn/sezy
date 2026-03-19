/**
 * src/app/admin/colis/[id]/page.tsx
 *
 * RESPONSABILITÉ :
 * - Page de mise à jour du statut d'un colis
 * - Affiche les détails du colis et l'historique des statuts
 * - Formulaire de changement de statut
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plane } from 'lucide-react'
import { ParcelStatus } from '@prisma/client'

import { getParcelById } from '@/features/tracking/services/parcel.service'

import { ParcelStatusForm } from './ParcelStatusForm'

const STATUS_OPTIONS = [
  { value: ParcelStatus.RECEIVED_PARIS, label: 'Reçu à Paris' },
  { value: ParcelStatus.IN_FLIGHT, label: 'En vol' },
  { value: ParcelStatus.ARRIVED_COTONOU, label: 'Arrivé à Cotonou' },
  { value: ParcelStatus.AVAILABLE, label: 'Disponible' },
]

/**
 * Badge de statut de colis
 */
function ParcelStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    RECEIVED_PARIS: 'bg-blue-100 text-blue-800',
    IN_FLIGHT: 'bg-yellow-100 text-yellow-800',
    ARRIVED_COTONOU: 'bg-purple-100 text-purple-800',
    AVAILABLE: 'bg-green-100 text-green-800',
  }

  const labels: Record<string, string> = {
    RECEIVED_PARIS: 'Reçu à Paris',
    IN_FLIGHT: 'En vol',
    ARRIVED_COTONOU: 'Arrivé à Cotonou',
    AVAILABLE: 'Disponible',
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}
    >
      {labels[status] || status}
    </span>
  )
}

interface PageProps {
  params: Promise<{ id: string }>
}

/**
 * Page détail colis - Server Component
 */
export default async function AdminColisDetailPage({ params }: PageProps) {
  const { id } = await params
  const parcel = await getParcelById(id)

  if (!parcel) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/colis"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-sezy-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour à la liste
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sezy-navy">Colis {parcel.trackingCode}</h2>
          <div className="flex items-center gap-3 mt-2">
            <ParcelStatusBadge status={parcel.status} />
            <span className="text-gray-500">
              Reçu le {new Date(parcel.receivedAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Détails du colis */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-sezy-navy mb-4">Détails du colis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Expéditeur</p>
                <p className="font-medium">{parcel.senderName}</p>
                <p className="text-sm text-gray-600">{parcel.senderPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Destinataire</p>
                <p className="font-medium">{parcel.recipientName}</p>
                <p className="text-sm text-gray-600">{parcel.recipientPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Poids</p>
                <p className="font-medium">{parcel.weightKg} kg</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vol assigné</p>
                {parcel.flight ? (
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-sezy-navy" />
                    <p className="font-medium text-sezy-navy">
                      {parcel.flight.direction === 'PARIS_TO_COTONOU'
                        ? 'Paris → Cotonou'
                        : 'Cotonou → Paris'}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400">Aucun vol assigné</p>
                )}
              </div>
            </div>
            {parcel.currentNote && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">Note</p>
                <p className="text-sm">{parcel.currentNote}</p>
              </div>
            )}
          </div>

          {/* Historique des statuts */}
          {parcel.statusLogs && parcel.statusLogs.length > 0 && (
            <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-sezy-navy mb-4">Historique des statuts</h3>
              <div className="space-y-4">
                {parcel.statusLogs.map(log => (
                  <div key={log.id} className="flex items-start gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-sezy-navy" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <ParcelStatusBadge status={log.status} />
                        <span className="text-sm text-gray-500">
                          {new Date(log.loggedAt).toLocaleString('fr-FR')}
                        </span>
                      </div>
                      {log.note && <p className="text-sm text-gray-600 mt-1">{log.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Formulaire de mise à jour */}
        <div>
          <div className="bg-white rounded-card shadow-card border border-gray-100 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-sezy-navy mb-4">Mettre à jour le statut</h3>
            <ParcelStatusForm
              parcelId={parcel.id}
              currentStatus={parcel.status}
              statusOptions={STATUS_OPTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
