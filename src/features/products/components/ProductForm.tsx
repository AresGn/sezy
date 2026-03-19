/**
 * src/features/products/components/ProductForm.tsx
 *
 * RESPONSABILITÉ :
 * - Formulaire de création/modification d'un produit
 * - Client Component pour interactivité
 * - Utilise createProductAction
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProductCategory } from '@prisma/client'

import { createProductAction } from '@/features/products/actions/product.actions'

const CATEGORY_OPTIONS = [
  { value: ProductCategory.COSMETICS, label: 'Cosmétiques' },
  { value: ProductCategory.NUTRITION, label: 'Nutrition' },
  { value: ProductCategory.WELLNESS, label: 'Bien-être' },
]

export function ProductForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate slug from name
  function generateSlug(name: string): string {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)

    const name = formData.get('name') as string

    const data = {
      name,
      slug: (formData.get('slug') as string) || generateSlug(name),
      description: formData.get('description') as string,
      shortDescription: formData.get('shortDescription') as string,
      priceFcfa: parseInt(formData.get('priceFcfa') as string, 10),
      priceEur: formData.get('priceEur')
        ? parseInt(formData.get('priceEur') as string, 10) * 100
        : undefined,
      category: formData.get('category') as ProductCategory,
      imageUrl: formData.get('imageUrl') as string,
      inStock: formData.get('inStock') === 'on',
      stockQuantity: formData.get('stockQuantity')
        ? parseInt(formData.get('stockQuantity') as string, 10)
        : undefined,
      isFeatured: formData.get('isFeatured') === 'on',
      isActive: formData.get('isActive') === 'on',
    }

    const result = await createProductAction(data)

    if (result.success) {
      router.push('/admin/produits')
      router.refresh()
    } else {
      setError(result.error || 'Erreur lors de la création')
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom du produit *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
            placeholder="Crème solaire SPF50"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug (URL)
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
            placeholder="creme-solaire-spf50"
          />
          <p className="text-xs text-gray-500 mt-1">Auto-généré si vide</p>
        </div>

        {/* Catégorie */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Catégorie *
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={ProductCategory.COSMETICS}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          >
            {CATEGORY_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Prix FCA */}
        <div>
          <label htmlFor="priceFcfa" className="block text-sm font-medium text-gray-700 mb-2">
            Prix (FCFA) *
          </label>
          <input
            type="number"
            id="priceFcfa"
            name="priceFcfa"
            required
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
            placeholder="5000"
          />
        </div>

        {/* Prix EUR */}
        <div>
          <label htmlFor="priceEur" className="block text-sm font-medium text-gray-700 mb-2">
            Prix (EUR)
          </label>
          <input
            type="number"
            id="priceEur"
            name="priceEur"
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
            placeholder="8.50"
          />
          <p className="text-xs text-gray-500 mt-1">Prix en euros (optionnel)</p>
        </div>

        {/* URL Image */}
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-2">
            URL de l'image *
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Description courte */}
      <div>
        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-2">
          Description courte *
        </label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          required
          rows={2}
          maxLength={300}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          placeholder="Description brève pour l'affichage dans les cartes (max 300 caractères)"
        />
        <p className="text-xs text-gray-500 mt-1">Max 300 caractères</p>
      </div>

      {/* Description complète */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description complète *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={5}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sezy-navy/20 focus:border-sezy-navy outline-none"
          placeholder="Description détaillée du produit..."
        />
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="inStock"
            defaultChecked
            className="w-4 h-4 text-sezy-navy rounded"
          />
          <span className="text-sm text-gray-700">En stock</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="isFeatured" className="w-4 h-4 text-sezy-navy rounded" />
          <span className="text-sm text-gray-700">Produit vedettes</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked
            className="w-4 h-4 text-sezy-navy rounded"
          />
          <span className="text-sm text-gray-700">Actif</span>
        </label>
      </div>

      {/* Boutons */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-sezy-navy text-white rounded-lg hover:bg-sezy-navy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Création...' : 'Créer le produit'}
        </button>
      </div>
    </form>
  )
}
