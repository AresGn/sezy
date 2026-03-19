/**
 * src/app/admin/produits/nouveau/page.tsx
 *
 * RESPONSABILITÉ :
 * - Page de création d'un nouveau produit
 * - Utilise ProductForm
 */

import { ProductForm } from '@/features/products/components/ProductForm'

export default function NouveauProduitPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sezy-navy">Nouveau produit</h2>
        <p className="text-gray-500 mt-1">Créer un nouveau produit pour la boutique</p>
      </div>

      <div className="bg-white rounded-card shadow-card border border-gray-100 p-6">
        <ProductForm />
      </div>
    </div>
  )
}
