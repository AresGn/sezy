import { GraduationCap, Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EtudesPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center bg-gradient-to-b from-white to-gray-50">
      <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-blue-50 text-blue-600 animate-pulse">
        <GraduationCap size={48} />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-sezy-navy mb-6 font-heading tracking-tight text-balance">
        Études en Europe & Accompagnement
      </h1>

      <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
        Nous préparons un service complet d'accompagnement pour vos projets d'études à l'étranger.
        Cette page est actuellement en cours de développement.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-sezy-navy text-white font-semibold hover:bg-sezy-dark transition-all duration-300 shadow-lg shadow-sezy-navy/20 active:scale-95"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Retour à l'accueil
        </Link>
        <span className="flex items-center text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
          <Sparkles className="mr-2 h-4 w-4" /> Bientôt disponible
        </span>
      </div>
    </div>
  )
}
