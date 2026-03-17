// src/app/(public)/logistique/page.tsx
import { Metadata } from 'next'
import { Plane, CheckCircle, Package, ArrowRight, Truck } from 'lucide-react'
import Link from 'next/link'

import { getUpcomingFlights, getNextFlight } from '@/features/flights/services/flight.service'
import PriceCalculator from '@/features/calculator/components/PriceCalculator'
import FlightCalendar from '@/features/flights/components/FlightCalendar'
import NextFlightBanner from '@/features/flights/components/NextFlightBanner'
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton'

export const metadata: Metadata = {
  title: 'Logistique Paris Cotonou | Envoi colis 20€/kg par avion | SEZY',
  description:
    'Bénéficiez du service logistique le plus rapide entre la France et le Bénin. Calendrier des vols, simulateur de prix et réservation WhatsApp.',
}

export const dynamic = 'force-dynamic'

/**
 * Page Pôle Logistique (Route Group public)
 *
 * RESPONSABILITÉ :
 * - Présenter les services de fret aérien Paris ↔ Cotonou
 * - Assembler le calculateur de prix et le calendrier des prochains vols
 * - Convertir le visiteur vers WhatsApp
 *
 * DESIGN SYSTEM :
 * - Section pôle : bg-logistics-bg
 * - Cartes d'étapes : rounded-card, shadow-card
 * - Accents : bg-logistics, text-logistics
 */
export default async function LogistiquePage() {
  // Récupération des données métiers via les services (Server Component)
  const [flights, nextFlight] = await Promise.all([getUpcomingFlights(), getNextFlight()])

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* SECTION 1 : HERO (DOC 09 - Section 4.3) */}
        <section className="relative bg-sezy-navy pt-16 pb-20 sm:pt-20 sm:pb-32 px-4 overflow-hidden">
          {/* Overlay Design - On utilise un gradient subtil au sommet pour démarquer de la navbar */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-logistics/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                <Truck className="w-3 h-3 text-logistics" />
                Transport Aérien Sécurisé
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                Logistique & Transport <br />
                <span className="text-logistics">Europe ↔ Afrique</span> en 1 clic.
              </h1>
              <p className="text-lg sm:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
                Le moyen le plus simple et rapide pour envoyer vos colis entre la France et le
                Bénin. Fret marchandise, groupage aérien et dédouanement inclus.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="#calculator"
                  className="bg-logistics hover:bg-logistics-dark text-white px-8 py-4 rounded-btn font-bold uppercase tracking-wider text-sm shadow-xl shadow-logistics/20 transition-all flex items-center gap-2 scale-100 hover:scale-105"
                >
                  Calculer mon tarif <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#flights"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-btn font-bold uppercase tracking-wider text-sm transition-all flex items-center gap-2 backdrop-blur-md"
                >
                  Calendrier vols
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 : PROCHAIN VOL (Bannière flottante) */}
        <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-30">
          <NextFlightBanner flight={nextFlight} />
        </div>

        {/* SECTION 3 : COMMENT ÇA MARCHE ? */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-sezy-navy mb-4">
                Votre envoi en 3 étapes simples
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Un processus rodé pour vous garantir sérénité et livraison express.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Package,
                  title: 'Dépôt en agence',
                  desc: "Déposez vos colis à notre bureau de Garges (Paris) ou Fidjrossè (Cotonou). Option d'enlèvement à domicile disponible.",
                },
                {
                  icon: Plane,
                  title: 'Expédition Sécurisée',
                  desc: 'Vos colis sont pesés, étiquetés et embarqués sur le prochain vol fret direct. Double pesée pour garantie.',
                },
                {
                  icon: CheckCircle,
                  title: 'Récupération Express',
                  desc: 'Retirez vos colis en agence après dédouanement. Livraison finale possible selon votre localité.',
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="group p-8 rounded-card bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all text-center"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-logistics mx-auto mb-6 shadow-sm group-hover:bg-logistics group-hover:text-white transition-colors duration-300">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-sezy-navy mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 : TARIFS OFFICIELS */}
        <section className="py-20 px-4 bg-logistics-bg">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl sm:text-4xl font-black text-sezy-navy mb-6">
                  Tarifs transparents, <br />
                  sans frais cachés.
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Chez SEZY, nous simplifions le calcul de vos envois. Nos tarifs sont au kilo réel,
                  incluant le transport aérien et les formalités en douane.
                </p>

                <div className="space-y-4">
                  {[
                    { label: 'Paris vers Cotonou', price: '20 € / kg' },
                    { label: 'Cotonou vers Paris', price: '10 000 FCFA / kg' },
                    { label: 'Enlèvement (Paris IdF)', price: 'À partir de 15 €' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-logistics/10"
                    >
                      <span className="font-sans font-bold text-sezy-navy">{item.label}</span>
                      <span className="font-mono text-logistics font-black">{item.price}</span>
                    </div>
                  ))}
                  <div className="bg-white/50 p-4 rounded-xl border border-dashed border-gray-300 mt-4">
                    <p className="text-[11px] text-gray-400 italic">
                      * Le poids est facturé au kilogramme supérieur (ex: 4.2 kg facturé 5 kg).
                    </p>
                  </div>
                </div>
              </div>

              {/* CALCULATEUR */}
              <PriceCalculator />
            </div>
          </div>
        </section>

        {/* SECTION 5 : CALENDRIER DES VOLS */}
        <section id="flights" className="pt-4 pb-16 px-4 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <FlightCalendar flights={flights} />
          </div>
        </section>

        {/* SECTION 6 : CTA FINAL */}
        <section className="py-16 px-4 bg-sezy-navy">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-white mb-6">
              Prêt à expédier votre colis ?
            </h2>
            <p className="text-white/70 mb-10">
              Nos conseillers sont disponibles sur WhatsApp pour valider votre réservation et
              répondre à toutes vos questions.
            </p>
            <Link
              href="https://wa.me/22901042087361"
              className="inline-flex items-center justify-center gap-3 bg-whatsapp hover:bg-whatsapp-dark text-white px-10 py-5 rounded-btn font-black uppercase tracking-widest text-sm shadow-xl shadow-whatsapp/20 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto min-w-[280px]"
            >
              <Package className="w-5 h-5 fill-current" />
              Réserver via WhatsApp
            </Link>
          </div>
        </section>
      </main>

      <WhatsAppFloatingButton />
    </>
  )
}
