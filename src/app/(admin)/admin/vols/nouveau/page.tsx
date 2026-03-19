/**
 * src/app/admin/vols/nouveau/page.tsx
 *
 * RESPONSABILITÉ :
 * - Page de création d'un nouveau vol
 * - Utilise FlightForm
 */

import { FlightForm } from '@/features/flights/components/FlightForm'

export default function NouveauVolPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sezy-navy">Nouveau vol</h2>
        <p className="text-gray-500 mt-1">Créer un nouveau vol programé</p>
      </div>

      <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
        <FlightForm />
      </div>
    </div>
  )
}
