/**
 * src/app/admin/page.tsx
 *
 * RESPONSABILITÉ :
 * - Page principale du dashboard admin
 * - Vue d'ensemble des activités clées
 * - Design System : Cards épurées, typographie Montserrat/Inter
 */

import { Plane, Package, ShoppingCart, MessageSquare, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

import { getAdminDashboardStats } from '@/features/admin/services/dashboard.service'

/**
 * Composant StatCard Modernisé
 */
function StatCard({
  title,
  value,
  icon: Icon,
  href,
  colorClass = 'text-sezy-navy',
  bgClass = 'bg-sezy-navy/10',
}: {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  href: string
  colorClass?: string
  bgClass?: string
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-sezy-navy/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2 font-sans">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900 font-heading tracking-tight">
              {value}
            </h3>
            {/* Indicateur de tendance fictif pour le design */}
            {value > 0 && (
              <span className="text-xs font-medium text-green-600 flex items-center bg-green-50 px-1.5 py-0.5 rounded-full">
                <TrendingUp className="w-3 h-3 mr-1" />
                Actif
              </span>
            )}
          </div>
        </div>
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl ${bgClass} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 ${colorClass}`} />
        </div>
      </div>

      <div className="mt-4 flex items-center text-sm font-medium text-sezy-navy opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
        Gérer <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </Link>
  )
}

/**
 * Dashboard principal
 */
export default async function AdminDashboardPage() {
  const stats = await getAdminDashboardStats()

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Vols Programmés"
          value={stats.upcomingFlights}
          icon={Plane}
          href="/admin/vols"
          colorClass="text-blue-600"
          bgClass="bg-blue-50"
        />
        <StatCard
          title="Colis en Transit"
          value={stats.parcelsInTransit}
          icon={Package}
          href="/admin/colis"
          colorClass="text-purple-600"
          bgClass="bg-purple-50"
        />
        <StatCard
          title="Produits Catalogue"
          value={stats.totalProducts}
          icon={ShoppingCart}
          href="/admin/produits"
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50"
        />
        <StatCard
          title="Messages Non lus"
          value={stats.unreadMessages}
          icon={MessageSquare}
          href="/admin/messages"
          colorClass="text-amber-600"
          bgClass="bg-amber-50"
        />
      </section>

      {/* Quick Actions & Welcome */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Welcome Section */}
        <section className="lg:col-span-2 bg-gradient-to-br from-sezy-navy to-sezy-dark rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold font-heading mb-2">
              Bienvenue sur votre espace d&apos;administration
            </h2>
            <p className="text-white/80 max-w-xl mb-6 leading-relaxed">
              Gérez efficacement les vols, suivez les expéditions de colis et mettez à jour votre
              catalogue produits depuis cette interface unifiée.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/vols"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/10"
              >
                Planning des vols
              </Link>
              <Link
                href="/admin/colis"
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-colors border border-white/10"
              >
                Suivi colis
              </Link>
            </div>
          </div>

          {/* Decorative patterns */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-sezy-light/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-sezy-gold/20 rounded-full blur-3xl"></div>
        </section>

        {/* System Status / Mini Widget */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-sezy-navy mb-4 font-heading">État du système</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Base de données</span>
              </div>
              <span className="text-xs text-green-700 font-medium bg-green-100 px-2 py-0.5 rounded-full">
                Connecté
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-700">API NextAuth</span>
              </div>
              <span className="text-xs text-green-700 font-medium bg-green-100 px-2 py-0.5 rounded-full">
                Actif
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">SEZY Platform v1.0.0</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
