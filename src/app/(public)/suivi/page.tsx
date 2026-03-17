// src/app/(public)/suivi/page.tsx
import { Metadata } from 'next'
import { Plane } from 'lucide-react'

import { searchByCode } from '@/features/tracking/services/tracking.service'
import TrackingForm from '@/features/tracking/components/TrackingForm'
import TrackingStatus from '@/features/tracking/components/TrackingStatus'
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton'

export const metadata: Metadata = {
  title: 'Suivi de Colis SEZY | Paris ↔ Cotonou',
  description: "Suivez en temps réel l'acheminement de votre colis avec SEZY.",
}

/**
 * Page Publique: Suivi de Colis
 *
 * RESPONSABILITÉ :
 * - Afficher l'interface de suivi de colis (Hero, Formulaire, Résultat)
 * - Server Component strict : Effectue l'appel DB directement via le service
 * - Consomme searchParams pour récupérer le code depuis l'URL (ex: ?code=SEZY-2024-0001)
 */
export default async function SuiviPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams
  const rawCode = resolvedParams?.code
  const code = typeof rawCode === 'string' ? rawCode.trim().toUpperCase() : undefined

  // Appel direct au service métier (pas à la Server Action), comme exigé par le DOC
  let result = null
  if (code) {
    result = await searchByCode(code)
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50 flex flex-col pb-20">
        {/* Section Hero Suivi */}
        <section className="bg-logistics-bg py-12 sm:py-16 px-4 relative border-b border-logistics/10">
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-logistics mb-6 shadow-md">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-sezy-navy mb-4 leading-tight">
              Suivi de Colis
            </h1>
            <p className="text-gray-600 text-lg mx-auto max-w-xl">
              Saisissez votre numéro de suivi SEZY pour connaître l'état exact de votre expédition.
            </p>
          </div>
        </section>

        {/* Section Contenu Principal (Formulaire + Résultat) */}
        <section className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          {/* Composant Client : Formulaire */}
          {/* Note: Il devrait idéalement rediriger vers ?code=... pour déclencher searchParams */}
          <TrackingForm initialCode={code} />

          {/* Résultat affiché via Client Component */}
          {result && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TrackingStatus result={result} />
            </div>
          )}

          {/* Message si le code est dans l'URL mais n'existe pas en base */}
          {code && !result && (
            <div className="mt-8 mx-auto max-w-2xl bg-red-50 border border-red-100 rounded-card p-6 text-center shadow-card">
              <p className="text-red-700 font-medium font-sans">
                Aucun colis ne correspond au code{' '}
                <span className="font-mono bg-white px-2 py-1 rounded inline-block mx-1 shadow-sm uppercase tracking-widest text-sm text-gray-900 border border-red-200">
                  {code}
                </span>
                <br />
                <span className="text-sm opacity-80 mt-2 block">
                  Vérifiez la saisie et réessayez.
                </span>
              </p>
            </div>
          )}
        </section>
      </main>

      <WhatsAppFloatingButton />
    </>
  )
}
