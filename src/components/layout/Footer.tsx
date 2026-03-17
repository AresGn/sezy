// src/components/layout/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-[#020617] text-slate-300 py-16 mt-20">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
        {/* COL 1: Agence SEZY */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-2xl tracking-tight">SEZY</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Votre agence de confiance reliant l'Europe et l'Afrique. De vos envois de colis à votre installation académique, nous gérons chaque étape.
          </p>
          <div className="flex space-x-4">
            {/* Social links simulation */}
            <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition">F</span>
            <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition">T</span>
            <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition">I</span>
          </div>
        </div>

        {/* COL 2: Menu Rapide */}
        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Pôles d'Activités</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/logistique" className="hover:text-white transition">Logistique & Transport</Link></li>
            <li><Link href="/shopping" className="hover:text-white transition">Shopping & Bien-être</Link></li>
            <li><Link href="/etudes" className="hover:text-white transition">Études & Carrière</Link></li>
          </ul>
        </div>

        {/* COL 3: Contact Infos */}
        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Nous contacter</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-slate-500 font-medium">📍</span>
              <span>Agontikon 6ème rue, Immeuble Clinique Chaussure, Cotonou</span>
            </li>
            <li className="flex items-center gap-2 underline underline-offset-4 decoration-slate-700">
               <span className="text-slate-500">📞</span>
               +229 0142087361
            </li>
            <li className="flex items-center gap-2">
               <span className="text-slate-500 font-medium">✉️</span>
               agencesezy@gmail.com
            </li>
          </ul>
        </div>

        {/* COL 4: Légal Cotonou */}
        <div className="space-y-6">
          <h4 className="text-white font-bold uppercase tracking-widest text-xs">Informations Légales</h4>
          <ul className="space-y-3 text-xs opacity-70">
            <li>RCCM : RB/PNO/23B4553</li>
            <li>IFU : 3202323198217</li>
            <li>Siège : Cotonou, Bénin</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12 flex flex-col md:flex-row justify-between items-center text-xs opacity-50 space-y-4 md:space-y-0">
        <p>&copy; {currentYear} Agence SEZY. Tous droits réservés.</p>
        <div className="flex gap-8">
          <Link href="/legal" className="hover:underline">Mentions Légales</Link>
          <Link href="/privacy" className="hover:underline">Confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}
