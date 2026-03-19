/**
 * src/app/admin/colis/page.tsx
 *
 * RESPONSABILITÉ :
 * - Liste des colis avec code de suivi et statut actuel
 * - Lien vers mise à jour du statut
 * - Server Component avec getAllParcels()
 */

import Link from 'next/link'
import { Package, ArrowRight, Plus } from 'lucide-react'

import { getAllParcels } from '@/features/tracking/services/parcel.service'

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
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}
    >
      {labels[status] || status}
    </span>
  )
}

/**
 * Page liste des colis - Server Component
 */
export default async function AdminColisPage() {
  const parcels = await getAllParcels()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sezy-navy">Gestion des colis</h2>
          <p className="text-gray-500 mt-1">{parcels.length} colis enregistré(s)</p>
        </div>
        <Link
          href="/admin/colis/nouveau"
          className="inline-flex items-center gap-2 px-4 py-2 bg-sezy-navy text-white rounded-lg hover:bg-sezy-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Nouveau Colis</span>
        </Link>
      </div>

      {/* Liste des colis */}
      {parcels.length === 0 ? (
        <div className="bg-white rounded-card shadow-card border border-gray-100 p-12 text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun colis enregistré</p>
        </div>
      ) : (
        <div className="bg-white rounded-card shadow-card border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Code</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Expéditeur
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">
                  Destinataire
                </th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Poids</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Statut</th>
                <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Reçu le</th>
                <th className="text-right px-6 py-3 text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {parcels.map(parcel => (
                <tr key={parcel.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <span className="font-mono font-semibold text-sezy-navy">
                      {parcel.trackingCode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-900">{parcel.senderName}</div>
                    <div className="text-gray-500 text-xs">{parcel.senderPhone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-900">{parcel.recipientName}</div>
                    <div className="text-gray-500 text-xs">{parcel.recipientPhone}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{parcel.weightKg} kg</td>
                  <td className="px-6 py-4">
                    <ParcelStatusBadge status={parcel.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(parcel.receivedAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/colis/${parcel.id}`}
                      className="inline-flex items-center gap-1 text-sm text-sezy-navy hover:underline"
                    >
                      Modifier <ArrowRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
