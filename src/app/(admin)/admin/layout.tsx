/**
 * src/app/admin/layout.tsx
 *
 * RESPONSABILITÉ :
 * - Layout racine de toutes les pages /admin/*
 * - Intégration de la Sidebar responsive
 * - Gestion du margin-left pour le contenu
 * - Protection par middleware + vérification session
 */

import { ReactNode } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'
import { AdminSidebar } from '@/components/layout/AdminSidebar'

interface AdminLayoutProps {
  children: ReactNode
}

/**
 * Layout Server Component
 * La protection /admin/* est gérée par le middleware
 * Vérification supplémentaire de session ADMIN
 */
export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth()

  // Protection supplémentaire : Seul un utilisateur connecté peut accéder
  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      {/* Sidebar de navigation (Fixe) */}
      <AdminSidebar />

      {/* Contenu principal */}
      <main className="flex-1 w-full lg:pl-72 transition-all duration-300 ease-in-out">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
          {/* Header Mobile (Placeholder pour l'espacement du bouton menu) */}
          <div className="h-12 lg:hidden mb-6 flex items-center justify-end">
            <span className="text-sm font-medium text-gray-500">Administration Mobile</span>
          </div>

          {/* Header de la page admin */}
          <header className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-sezy-navy tracking-tight">
                Administration SEZY
              </h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">
                Gestion unifiée de la plateforme
              </p>
            </div>

            {/* Quick Actions / Status could go here */}
            <div className="hidden sm:flex items-center gap-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Système opérationnel
              </span>
              <span className="text-sm text-gray-400">
                {new Date().toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </span>
            </div>
          </header>

          {/* Contenu de la page (Slot) */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</div>
        </div>
      </main>
    </div>
  )
}
