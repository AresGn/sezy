// src/app/(public)/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* SECTION HERO */}
      <section className="relative overflow-hidden pt-28 pb-32 md:pt-40 md:pb-52 bg-gradient-to-br from-white via-blue-50/50 to-indigo-100/30 dark:from-slate-950 dark:to-slate-900 border-b border-blue-100/50 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8 text-center sm:text-left grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 max-w-2xl px-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-sm font-semibold tracking-wide animate-fade-in">
              🚀 <span className="uppercase tracking-widest text-[10px]">Agence SEZY — Cotonou</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#1B3A6B] dark:text-white leading-[1.1]">
              Votre <span className="text-blue-600 dark:text-blue-400">Passerelle</span> de Confiance Europe — Afrique.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-xl">
              De vos colis Paris-Cotonou à votre installation en France ou au Canada, nous gérons tout avec rigueur et rapidité.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link
                href="/logistique"
                className="px-10 py-5 rounded-2xl bg-[#1B3A6B] text-white text-lg font-bold shadow-2xl shadow-blue-900/20 active:scale-95 hover:scale-105 transition-all text-center"
              >
                Expédier un colis
              </Link>
              <Link
                href="/suivi"
                className="px-10 py-5 rounded-2xl bg-white dark:bg-slate-800 text-[#1B3A6B] dark:text-blue-400 border border-slate-200 dark:border-slate-700 text-lg font-bold shadow-xl shadow-slate-200/50 dark:shadow-none hover:bg-slate-50 transition-all text-center"
              >
                Suivre mon colis
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
               {/* Ici on peut mettre une image de logistique/avion élégante */}
               <div className="aspect-[4/3] bg-gradient-to-tr from-[#1B3A6B] to-slate-800 flex items-center justify-center">
                 <span className="text-white text-9xl">📦</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION SERVICES (Les 3 Pôles) */}
      <section className="py-24 md:py-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-blue-600">Nos Solutions "Tout en 1"</h2>
            <p className="text-4xl md:text-5xl font-black text-[#1B3A6B] dark:text-white">Trois pôles d'expertise à votre service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* PÔLE 1: LOGISTIQUE */}
            <div className="group relative p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-500 overflow-hidden">
               <div className="bg-blue-600/10 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  📦
               </div>
               <h3 className="text-2xl font-bold mb-4 text-[#1B3A6B] dark:text-blue-300">Logistique & Transport</h3>
               <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Liaisons aériennes régulières Paris ↔ Cotonou. Tarifs compétitifs à partir de 20€/kg. Calculateur de prix et tracking inclus.
               </p>
               <Link href="/logistique" className="inline-flex items-center gap-2 font-bold text-blue-600 group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                  Détails tarifs →
               </Link>
            </div>

            {/* PÔLE 2: SHOPPING */}
            <div className="group p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-pink-200 dark:hover:border-pink-900 transition-all duration-500">
               <div className="bg-pink-600/10 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:bg-pink-600 group-hover:text-white transition-all duration-500">
                  💄
               </div>
               <h3 className="text-2xl font-bold mb-4 text-[#1B3A6B] dark:text-pink-300">Shopping & Bien-être</h3>
               <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Retrouvez nos cosmétiques premium et notre sélection nutrition (Maca, Baies de Goji). Commandez directement par WhatsApp.
               </p>
               <Link href="/shopping" className="inline-flex items-center gap-2 font-bold text-pink-600 group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                  Boutique en ligne →
               </Link>
            </div>

            {/* PÔLE 3: ÉTUDES */}
            <div className="group p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-500">
               <div className="bg-indigo-600/10 w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  🎓
               </div>
               <h3 className="text-2xl font-bold mb-4 text-[#1B3A6B] dark:text-indigo-300">Études & Carrière</h3>
               <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  Coaching et accompagnement complet pour vos admissions et installations en France ou au Canada. Votre succès commence ici.
               </p>
               <Link href="/etudes" className="inline-flex items-center gap-2 font-bold text-indigo-600 group-hover:gap-4 transition-all uppercase tracking-widest text-xs">
                  En savoir plus →
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CTA FINAL / WHATSAPP */}
      <section className="py-32 container mx-auto px-4 md:px-8">
         <div className="relative rounded-[3rem] bg-[#1B3A6B] p-12 md:p-24 overflow-hidden shadow-2xl shadow-blue-900/40">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <span className="text-[20rem]">✈️</span>
            </div>
            <div className="relative z-10 max-w-3xl space-y-8">
               <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Prêt à expédier ou à lancer votre projet ?</h2>
               <p className="text-blue-100/70 text-xl font-light">
                 Contactez-nous directement sur WhatsApp pour une réponse instantanée ou passez à notre boutique à Agontikon.
               </p>
               <div className="flex gap-4 pt-4">
                 <button className="px-10 py-5 rounded-2xl bg-white text-[#1B3A6B] text-lg font-bold flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
                    <span>💬 Discuter sur WhatsApp</span>
                 </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
