import { BookOpen, Coffee, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-emerald-50 text-emerald-600 animate-bounce">
        <BookOpen size={48} />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-sezy-navy mb-6 font-heading tracking-tight">
        Blog SEZY
      </h1>

      <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
        Nos rédacteurs préparent des articles passionnants sur la logistique, le lifestyle et bien
        d'autres sujets. Détendez-vous, un café à la main, cela arrive bientôt !
      </p>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-sezy-navy text-white font-semibold hover:bg-sezy-dark transition-all duration-300 shadow-lg shadow-sezy-navy/20 active:scale-95"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour à l'accueil
        </Link>
        <div className="flex items-center gap-2 text-emerald-600 font-semibold italic">
          <Coffee size={20} />
          <span>Rédaction en cours...</span>
        </div>
      </div>
    </div>
  )
}
