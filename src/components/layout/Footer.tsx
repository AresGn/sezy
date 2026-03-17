// src/components/layout/Footer.tsx
import Link from 'next/link';
import { MessageCircle, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sezy-navy text-white/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Colonne 1 : Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl font-extrabold text-white">SEZY<span className="text-logistics">.</span></h3>
            <p className="text-sm leading-relaxed">
              Votre passerelle de confiance entre l'Europe et l'Afrique. 
              Logistique, Shopping et Accompagnement Études.
            </p>
          </div>

          {/* Colonne 2 : Services */}
          <div>
            <h4 className="font-heading text-white font-bold mb-6">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/logistique" className="hover:text-logistics transition-colors">Fret Paris → Cotonou</Link></li>
              <li><Link href="/shopping" className="hover:text-shopping transition-colors">Boutique Bien-être</Link></li>
              <li><Link href="/etudes" className="hover:text-studies transition-colors">Accompagnement Étudiants</Link></li>
              <li><Link href="/suivi" className="hover:text-white transition-colors">Suivre mon colis</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Contact */}
          <div>
            <h4 className="font-heading text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><MapPin size={18} className="text-logistics flex-shrink-0" /> <span>Agontikon, Cotonou, Bénin</span></li>
              <li className="flex gap-3"><Phone size={18} className="text-logistics flex-shrink-0" /> <span>{process.env.NEXT_PUBLIC_WHATSAPP_1}</span></li>
              <li className="flex gap-3"><Mail size={18} className="text-logistics flex-shrink-0" /> <span>contact@sezy.bj</span></li>
            </ul>
          </div>

          {/* Colonne 4 : Urgence WhatsApp */}
          <div>
            <h4 className="font-heading text-white font-bold mb-6">Support</h4>
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_1?.replace('+', '')}`}
              className="bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold px-6 py-3 rounded-btn flex items-center justify-center gap-2 transition-colors w-full"
            >
              <MessageCircle size={20} />
              WhatsApp Direct
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} SEZY. Tous droits réservés.</p>
          <div className="flex gap-6">
            <p>RCCM : <span className="font-mono text-white/60">RB-COT-24-B-3103</span></p>
            <p>IFU : <span className="font-mono text-white/60">3202416410188</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
