/**
 * features/calculator/components/PriceCalculator.tsx
 *
 * RESPONSABILITÉ :
 * - Fournir une interface interactive pour calculer les frais d'expédition
 * - Client Component (useState / useEffect)
 *
 * DESIGN SYSTEM :
 * - thèmes logistics (bg-logistics)
 * - font-mono pour les montants
 * - micro-animations hover/active
 */

'use client'

import { useState, useMemo } from 'react'
import { FlightDirection } from '@prisma/client'
import { Calculator, Plane, MessageCircle, Scale, RefreshCw } from 'lucide-react'

import { cn } from '@/lib/utils'

import { calculateShippingPrice } from '../services/calculator.service'

export default function PriceCalculator() {
  const [weight, setWeight] = useState<number>(1)
  const [direction, setDirection] = useState<FlightDirection>('PARIS_TO_COTONOU')
  // Calcul automatique du résultat (useMemo au lieu de useEffect pour éviter les cascading renders)
  const result = useMemo(() => {
    if (weight > 0) {
      return calculateShippingPrice({ weightKg: weight, direction })
    }
    return null
  }, [weight, direction])

  return (
    <div
      id="calculator"
      className="bg-white rounded-card shadow-card overflow-hidden border border-gray-100 scroll-mt-28"
    >
      {/* Header du calculateur */}
      <div className="bg-logistics p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-6 h-6" />
          <h2 className="font-heading text-xl font-bold">Simulateur de Tarifs</h2>
        </div>
        <p className="text-white/80 text-sm">Estimez instantanément le coût de votre expédition.</p>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inputs Section */}
          <div className="space-y-6">
            {/* Direction Toggle */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block px-1">
                Direction du colis
              </label>
              <div className="flex p-1 bg-gray-50 rounded-lg border border-gray-100">
                <button
                  onClick={() => setDirection('PARIS_TO_COTONOU')}
                  className={cn(
                    'flex-1 py-3 px-4 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2',
                    direction === 'PARIS_TO_COTONOU'
                      ? 'bg-white text-logistics shadow-sm'
                      : 'text-gray-400 hover:text-gray-600',
                  )}
                >
                  Paris ➜ Cotonou
                </button>
                <button
                  onClick={() => setDirection('COTONOU_TO_PARIS')}
                  className={cn(
                    'flex-1 py-3 px-4 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-2',
                    direction === 'COTONOU_TO_PARIS'
                      ? 'bg-white text-logistics shadow-sm'
                      : 'text-gray-400 hover:text-gray-600',
                  )}
                >
                  Cotonou ➜ Paris
                </button>
              </div>
            </div>

            {/* Weight Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">
                  Poids (en kg)
                </label>
                <span className="text-[10px] text-logistics bg-logistics/10 px-2 py-0.5 rounded-full font-bold">
                  Note: Arrondi au kg sup.
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300">
                  <Scale className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={weight}
                  onChange={e => setWeight(parseFloat(e.target.value) || 0)}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-logistics focus:ring-4 focus:ring-logistics/10 rounded-xl py-4 pl-12 pr-4 text-sezy-navy font-mono font-bold text-lg outline-none transition-all"
                  placeholder="Ex: 4.5"
                />
              </div>
              {/* Sliders d'exemples rapides */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {[1, 5, 10, 20, 50].map(w => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className="flex-shrink-0 bg-gray-100 hover:bg-logistics hover:text-white px-3 py-1.5 rounded-lg text-[11px] font-bold text-gray-500 transition-colors"
                  >
                    {w}kg
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gray-50/50 rounded-2xl p-6 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center relative group overflow-hidden">
            {/* Décoration background */}
            <Plane className="absolute -right-8 -bottom-8 w-32 h-32 text-gray-100 -rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none" />

            {!result || weight <= 0 ? (
              <div className="relative z-10 py-10 opacity-40">
                <RefreshCw className="w-10 h-10 mx-auto mb-3 animate-spin-slow" />
                <p className="text-sm font-sans">En attente de saisie...</p>
              </div>
            ) : (
              <div className="relative z-10 w-full animate-in zoom-in-95 duration-300">
                <p className="text-[10px] items-center text-gray-400 font-bold uppercase tracking-widest mb-1">
                  Coût d'expédition estimé
                </p>

                <div className="flex flex-col items-center gap-1 mb-6">
                  <div className="text-4xl md:text-5xl font-mono font-black text-sezy-navy">
                    {(result.priceEur / 100).toFixed(0)}€
                  </div>
                  <div className="text-lg md:text-xl font-mono font-bold text-logistics/70">
                    ≈ {result.priceFcfa.toLocaleString()} FCFA
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm self-stretch rounded-xl p-4 border border-white shadow-sm mb-6">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Basé sur un poids facturé de{' '}
                    <strong className="text-sezy-navy">{result.weightCharged} kg</strong>.<br />
                    Tarif définitif lors du pesage au dépôt.
                  </p>
                </div>

                <a
                  href={result.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-whatsapp hover:bg-whatsapp-dark text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-3 shadow-lg shadow-whatsapp/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  Réserver cet envoi
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 text-center font-medium leading-tight italic">
          * Les prix affichés incluent le transport et le dédouanement (fret aérien). Délai
          indicatif : 5 à 7 jours ouvrés.
        </p>
      </div>
    </div>
  )
}
