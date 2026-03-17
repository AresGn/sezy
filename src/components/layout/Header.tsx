// src/components/layout/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md dark:bg-slate-950/70 border-slate-200 dark:border-slate-800 transition-all duration-300">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-20 items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group transition-transform duration-300 active:scale-95">
          <div className="bg-[#1B3A6B] p-1.5 rounded-lg shadow-lg group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-2xl tracking-tighter px-1">S</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#1B3A6B] dark:text-blue-500">
            EZY — <span className="font-light text-slate-500 dark:text-slate-400">Agence</span>
          </span>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <div className="hidden md:flex gap-8">
          <Link href="/logistique" className="text-sm font-medium hover:text-[#1B3A6B] transition-colors">Logistique</Link>
          <Link href="/shopping" className="text-sm font-medium hover:text-[#1B3A6B] transition-colors">Bien-être</Link>
          <Link href="/etudes" className="text-sm font-medium hover:text-[#1B3A6B] transition-colors">Études</Link>
          <Link href="/suivi" className="text-sm font-medium hover:text-[#1B3A6B] transition-colors">Suivi Colis</Link>
        </div>

        {/* CTA RAPIDE */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-[#1B3A6B] text-white text-sm font-semibold shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 active:scale-95 transition-all"
          >
            Nous contacter
          </Link>
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300">
            {/* Menu icon SVG (simple) */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
