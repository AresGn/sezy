/**
 * src/app/admin/vols/page.tsx
 *
 * RESPONSABILITÉ :
 * - Liste des vols avec boutons d'action (Voir, Modifier)
 * - Bouton "Nouveau vol" vers /admin/vols/nouveau
 * - Server Component avec getAllFlights()
 */

import Link from 'next/link'
import { Plus, Plane, ArrowRight, Edit } from 'lucide-react'

import { getAllFlights } from '@/features/flights/services/flight.service'

/**
 * Badge de statut de vol
 */
function FlightStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    SCHEDULED: 'bg-blue-100 text-blue-800',
    BOARDING: 'bg-yellow-100 text-yellow-800',
    IN_FLIGHT: 'bg-purple-100 text-purple-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
  }

  const labels: Record<string, string> = {
    SCHEDULED: 'Programmé',
    BOARDING: 'Embarquement',
    IN_FLIGHT: 'En vol',
    COMPLETED: 'Terminé',
    CANCELLED: 'Annulé',
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
 * Page liste des vols - Server Component
 */
export default async function AdminVolsPage() {
  const flights = await getAllFlights()

  return (
    <div className="space-y-6">
      {/* Header avec bouton nouveau */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sezy-navy">Gestion des vols</h2>
          <p className="text-gray-500 mt-1">{flights.length} vol(s) enregistré(s)</p>
        </div>
        <Link
          href="/admin/vols/nouveau"
          className="flex items-center gap-2 px-4 py-2 bg-sezy-navy text-white rounded-lg hover:bg-sezy-navy/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau vol
        </Link>
      </div>

      {/* Liste des vols en cards */}
      {flights.length === 0 ? (
        <div className="bg-white rounded-card shadow-card border border-gray-100 p-12 text-center">
          <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun vol enregistré</p>
          <Link
            href="/admin/vols/nouveau"
            className="inline-flex items-center gap-2 mt-4 text-sezy-navy hover:underline"
          >
            Créer le premier vol <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {flights.map(flight => (
            <div
              key={flight.id}
              className="bg-white rounded-card shadow-card border border-gray-100 p-6 hover:shadow-card-hover transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sezy-navy/10">
                    <Plane className="w-6 h-6 text-sezy-navy" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-sezy-navy">
                        {flight.direction === 'PARIS_TO_COTONOU'
                          ? 'Paris → Cotonou'
                          : 'Cotonou → Paris'}
                      </h3>
                      <FlightStatusBadge status={flight.status} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="text-gray-400">Départ:</span>
                        <p className="font-medium">
                          {new Date(flight.departureDate).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Arrivée:</span>
                        <p className="font-medium">
                          {new Date(flight.arrivalDate).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Places:</span>
                        <p className="font-medium">{flight.availableSpots}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Prix:</span>
                        <p className="font-medium">
                          {flight.priceEur / 100}€ / {flight.priceFcfa}FCFA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/vols/${flight.id}`}
                    className="p-2 text-gray-400 hover:text-sezy-navy hover:bg-sezy-navy/5 rounded-lg transition-colors"
                    title="Modifier"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
