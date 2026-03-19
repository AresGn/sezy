/**
 * features/admin/services/types.ts
 *
 * RESPONSABILITÉ :
 * - Types TypeScript pour le dashboard admin
 */

export interface AdminDashboardStats {
  /** Nombre de vols à venir (status SCHEDULED, date départ >= now) */
  upcomingFlights: number

  /** Nombre de colis en transit (status IN_FLIGHT ou RECEIVED_PARIS) */
  parcelsInTransit: number

  /** Nombre total de produits actifs */
  totalProducts: number

  /** Nombre de messages non lus */
  unreadMessages: number
}

export interface AdminDashboardResponse {
  stats: AdminDashboardStats
  success: boolean
  error?: string
}
