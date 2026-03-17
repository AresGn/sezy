// src/app/(public)/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Package, ShoppingBag, GraduationCap, ArrowRight, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION HERO - DOC 09 4.2 */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center">
        {/* L'image de fond doit être optimisée avec next/image - VIS-006 */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-sezy-navy/75 z-10" /> {/* Overlay VIS-007 */}
          <div className="relative w-full h-full bg-slate-900">
             {/* Placeholder pour l'image réelle qui sera ajoutée plus tard */}
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Votre Passerelle de Confiance
            <span className="block text-logistics">Europe — Afrique</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 font-sans">
            Colis, Shopping, Études — De Paris à Cotonou, on gère tout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/logistique"
              className="bg-logistics hover:bg-logistics-dark text-white font-semibold px-8 py-4 rounded-btn transition-colors">
              Calculer mon tarif
            </Link>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_1?.replace('+', '')}`}
              className="bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold px-8 py-4 rounded-btn flex items-center justify-center gap-2 transition-colors">
              <MessageCircle className="w-5 h-5" />
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* SECTION SERVICES - 3 PÔLES (DOC 09 3.2) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Pôles d'Excellence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Trois domaines d'expertise pour faciliter vos échanges entre la France et le Bénin.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PÔLE LOGISTIQUE */}
            <div className="bg-white rounded-card shadow-card hover:shadow-card-hover p-8 transition-all border border-slate-100 group">
              <div className="w-14 h-14 rounded-full bg-logistics-bg flex items-center justify-center mb-6 text-logistics group-hover:bg-logistics group-hover:text-white transition-colors">
                <Package size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Logistique & Transport</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Transport de colis Paris ↔ Cotonou. Fret aérien régulier, sécurisé et rapide à partir de <span className="font-mono font-semibold text-logistics">20€/kg</span>.
              </p>
              <Link href="/logistique" className="inline-flex items-center text-logistics font-semibold hover:gap-2 transition-all">
                Détails du service <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* PÔLE SHOPPING */}
            <div className="bg-white rounded-card shadow-card hover:shadow-card-hover p-8 transition-all border border-slate-100 group">
              <div className="w-14 h-14 rounded-full bg-shopping-bg flex items-center justify-center mb-6 text-shopping group-hover:bg-shopping group-hover:text-white transition-colors">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Shopping & Bien-être</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Produits bio et naturels (Maca, Baies de Goji). Commandez vos produits préférés et recevez-les directement au Bénin.
              </p>
              <Link href="/shopping" className="inline-flex items-center text-shopping font-semibold hover:gap-2 transition-all">
                Voir la boutique <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>

            {/* PÔLE ÉTUDES */}
            <div className="bg-white rounded-card shadow-card hover:shadow-card-hover p-8 transition-all border border-slate-100 group">
              <div className="w-14 h-14 rounded-full bg-studies-bg flex items-center justify-center mb-6 text-studies group-hover:bg-studies group-hover:text-white transition-colors">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Études & Carrière</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Accompagnement personnalisé pour vos projets d'études en Europe. Orientation, inscription et préparation au départ.
              </p>
              <Link href="/etudes" className="inline-flex items-center text-studies font-semibold hover:gap-2 transition-all">
                En savoir plus <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-sezy-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Prêt à envoyer votre colis ?</h2>
          <p className="text-white/80 text-lg mb-10">Rejoignez des centaines de clients qui font confiance à SEZY pour leurs envois entre la France et le Bénin.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/suivi" className="bg-white text-sezy-navy px-8 py-4 rounded-btn font-bold hover:bg-slate-100 transition-colors">
              Suivre un colis existant
            </Link>
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_1?.replace('+', '')}`} className="bg-whatsapp hover:bg-whatsapp-dark text-white px-8 py-4 rounded-btn font-bold flex items-center gap-2 transition-colors">
              <MessageCircle size={20} /> Programmer un envoi
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
