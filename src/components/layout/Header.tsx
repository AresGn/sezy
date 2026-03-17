// src/components/layout/Header.tsx
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-sezy-navy sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          
          {/* Logo SEZY */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-extrabold text-white tracking-tighter">
              SEZY<span className="text-logistics">.</span>
            </span>
          </Link>

          {/* Navigation - font-sans md:text-sm (DOC 09) */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: 'Logistique', href: '/logistique' },
              { label: 'Shopping', href: '/shopping' },
              { label: 'Études', href: '/etudes' },
              { label: 'Suivi colis', href: '/suivi' },
              { label: 'Blog', href: '/blog' }
            ].map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA WhatsApp - TOUJOURS bg-whatsapp (DOC 09 3.1) */}
          <a 
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_1?.replace('+', '')}`}
            className="bg-whatsapp hover:bg-whatsapp-dark text-white text-sm font-semibold px-4 py-2 rounded-btn flex items-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Nous contacter</span>
          </a>

        </div>
      </div>
    </header>
  );
}
