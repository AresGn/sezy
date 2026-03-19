import { Construction, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function ShoppingPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-sezy-gold/10 text-sezy-gold animate-bounce">
        <Construction size={48} />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-sezy-navy mb-6 font-heading tracking-tight">
        Shopping SEZY
      </h1>

      <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
        Notre boutique en ligne est actuellement en cours de développement. Revenez bientôt pour
        découvrir une sélection exclusive de produits bien-être et accessoires.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-sezy-navy text-white font-semibold hover:bg-sezy-dark transition-all duration-300 shadow-lg shadow-sezy-navy/20 active:scale-95"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour à l'accueil
        </Link>
        <div className="text-sm font-medium px-4 py-2 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
          🚧 Arrivée prévue : Prochainement
        </div>
      </div>
    </div>
  )
}
