/**
 * src/app/auth/login/page.tsx
 *
 * RESPONSABILITÉ :
 * - Page de connexion Admin
 * - Design : Split screen (Image brand + Formulaire)
 * - Feedback visuel et gestion des erreurs
 */

'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Identifiants incorrects. Veuillez réessayer.')
        setLoading(false)
      } else {
        setSuccess(true)
        // Petit délai pour afficher le succès avant redirection
        setTimeout(() => {
          router.push('/admin')
          router.refresh()
        }, 800)
      }
    } catch {
      setError('Une erreur technique est survenue. Réessayez plus tard.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex w-full">
      {/* Colonne Gauche : Formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-block mb-8 group">
              <span className="text-3xl font-extrabold tracking-tight text-sezy-navy">SEZY</span>
              <span className="block h-1 w-12 bg-sezy-gold mt-1 rounded-full group-hover:w-full transition-all duration-300"></span>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-heading">
              Connexion Admin
            </h1>
            <p className="mt-2 text-gray-500">Accédez à votre espace de gestion sécurisé.</p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-sezy-navy focus:ring-2 focus:ring-sezy-navy/20 transition-all outline-none bg-gray-50 focus:bg-white"
                  placeholder="admin@sezy.bj"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="block w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-sezy-navy focus:ring-2 focus:ring-sezy-navy/20 transition-all outline-none bg-gray-50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Feedback Messages */}
            {error && (
              <div className="flex items-center gap-2 p-4 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-4 text-sm text-green-700 bg-green-50 rounded-lg border border-green-100 animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Connexion réussie ! Redirection...</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className={`
                group w-full flex items-center justify-center py-3.5 px-4 
                border border-transparent rounded-xl text-sm font-semibold text-white 
                bg-sezy-navy hover:bg-sezy-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sezy-navy 
                transition-all duration-200 shadow-lg shadow-sezy-navy/20
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : success ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-500 hover:text-sezy-navy transition-colors inline-flex items-center gap-1 group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Retourner à l&apos;accueil
            </Link>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="absolute bottom-6 left-0 w-full text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SEZY Plateforme. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Colonne Droite : Image/Brand */}
      <div className="hidden lg:flex w-1/2 bg-sezy-navy relative overflow-hidden items-center justify-center">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-sezy-navy to-sezy-dark opacity-90 z-10"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sezy-light/30 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-sezy-gold/20 rounded-full blur-3xl z-0"></div>

        {/* Content */}
        <div className="relative z-20 text-center px-12 max-w-lg">
          <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <span className="text-4xl font-bold text-white">S</span>
          </div>
          <h2 className="text-4xl font-bold text-white font-heading mb-6 tracking-tight">
            Gérez votre activité en toute simplicité
          </h2>
          <p className="text-lg text-blue-100 leading-relaxed">
            Une interface unifiée pour piloter les vols, les colis et votre catalogue produits.
            Conçue pour la performance et la clarté.
          </p>

          {/* Stats Mini */}
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-bold text-white">24/7</p>
              <p className="text-xs text-blue-200 uppercase tracking-wider mt-1">Support</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="text-xs text-blue-200 uppercase tracking-wider mt-1">Secure</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Fast</p>
              <p className="text-xs text-blue-200 uppercase tracking-wider mt-1">Performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
