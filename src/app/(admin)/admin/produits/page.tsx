/**
 * src/app/admin/produits/page.tsx
 *
 * RESPONSABILITÉ :
 * - Liste des produits avec boutons d'action
 * - Bouton "Nouveau produit" vers /admin/produits/nouveau
 * - Server Component avec getAllProducts()
 */

import Link from 'next/link'
import { Plus, ShoppingBag, Edit, Eye, ToggleLeft, ToggleRight } from 'lucide-react'

import { getAllProducts } from '@/features/products/services/product.service'
import { CATEGORY_LABELS } from '@/features/products/types'

/**
 * Badge de catégorie
 */
function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, string> = {
    COSMETICS: 'bg-pink-100 text-pink-800',
    NUTRITION: 'bg-green-100 text-green-800',
    WELLNESS: 'bg-purple-100 text-purple-800',
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${styles[category] || 'bg-gray-100 text-gray-800'}`}
    >
      {CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] || category}
    </span>
  )
}

/**
 * Page liste des produits - Server Component
 */
export default async function AdminProduitsPage() {
  const products = await getAllProducts()

  return (
    <div className="space-y-6">
      {/* Header avec bouton nouveau */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-sezy-navy">Gestion des produits</h2>
          <p className="text-gray-500 mt-1">{products.length} produit(s) enregistré(s)</p>
        </div>
        <Link
          href="/admin/produits/nouveau"
          className="flex items-center gap-2 px-4 py-2 bg-sezy-navy text-white rounded-lg hover:bg-sezy-navy/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouveau produit
        </Link>
      </div>

      {/* Liste des produits */}
      {products.length === 0 ? (
        <div className="bg-white rounded-card shadow-card border border-gray-100 p-12 text-center">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Aucun produit enregistré</p>
          <Link
            href="/admin/produits/nouveau"
            className="inline-flex items-center gap-2 mt-4 text-sezy-navy hover:underline"
          >
            Créer le premier produit <Plus className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className={`bg-white rounded-card shadow-card border border-gray-100 overflow-hidden ${
                !product.isActive ? 'opacity-60' : ''
              }`}
            >
              {/* Image */}
              <div className="aspect-square bg-gray-100 relative">
                {product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingBag className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                {product.isFeatured && (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <CategoryBadge category={product.category} />
                  {product.isActive ? (
                    <ToggleRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <h3 className="font-semibold text-sezy-navy mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-sezy-navy">
                      {product.priceFcfa.toLocaleString('fr-FR')} FCA
                    </span>
                    {product.priceEur && (
                      <span className="text-sm text-gray-500 ml-2">
                        ({(product.priceEur / 100).toFixed(2)}€)
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href={`/admin/produits/${product.id}`}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-sezy-navy border border-sezy-navy rounded-lg hover:bg-sezy-navy hover:text-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Modifier
                  </Link>
                  <Link
                    href={`/shopping`}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-sezy-navy"
                    target="_blank"
                  >
                    <Eye className="w-4 h-4" />
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
