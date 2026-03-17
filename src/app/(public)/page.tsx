// src/app/(public)/page.tsx
/**
 * Page d'accueil SEZY — Assemblage des sections stratégiques
 * Async Server Component — SEO maximal avec Schema.org
 *
 * RESPONSABILITÉ :
 * - Assembler les 7 sections dans l'ordre stratégique défini
 * - Fournir les métadonnées SEO complètes
 * - Intégrer le Schema.org LocalBusiness pour Google Maps
 *
 * ORDRE DES SECTIONS (stratégique et non modifiable) :
 * 1. HeroSection — Accroche principale
 * 2. StatsSection — Preuve sociale numérique
 * 3. ServicesSection — Les 3 pôles SEZY
 * 4. HowItWorksSection — Processus simplifié
 * 5. NextFlightSection — Urgence et disponibilité
 * 6. TestimonialsSection — Témoignages clients
 * 7. CtaSection — Conversion finale
 *
 * SEO (DOC 06) :
 * - Metadata export pour Next.js
 * - JSON-LD Schema.org LocalBusiness
 * - OpenGraph pour réseaux sociaux
 *
 * RÈGLES (DOC 02 & DOC 06) :
 * - Async Server Component (même sans await)
 * - Aucune logique métier — assemblage pur
 * - Imports séparés pour chaque section
 * - TypeScript strict
 */

import type { Metadata } from 'next'

import HeroSection from '@/features/home/components/HeroSection'
import StatsSection from '@/features/home/components/StatsSection'
import ServicesSection from '@/features/home/components/ServicesSection'
import HowItWorksSection from '@/features/home/components/HowItWorksSection'
import NextFlightSection from '@/features/flights/components/NextFlightSection'
import TestimonialsSection from '@/features/home/components/TestimonialsSection'
import CtaSection from '@/features/home/components/CtaSection'

// Métadonnées SEO pour la page d'accueil (DOC 06)
export const metadata: Metadata = {
  title: 'SEZY — Envoi de colis Paris Cotonou | Shopping & Études',
  description:
    'Agence SEZY : envoi de colis Paris ↔ Cotonou dès 20€/kg, shopping bien-être premium et accompagnement études France/Canada. Votre passerelle de confiance Europe-Afrique.',
  keywords: [
    'envoi colis Paris Cotonou',
    'agence transport Bénin France',
    'coaching études France Bénin',
    'cosmétiques Cotonou',
    'logistique Paris Cotonou',
    'shopping bien-être Bénin',
  ],
  openGraph: {
    title: 'SEZY — Votre Passerelle Paris-Cotonou',
    description: 'Colis, Shopping, Études — Tout en 1 depuis Cotonou.',
    url: 'https://sezy.bj',
    siteName: 'SEZY',
    locale: 'fr_BJ',
    type: 'website',
  },
  alternates: {
    canonical: 'https://sezy.bj',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Schema.org LocalBusiness pour Google Maps (JSON-LD)
const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Agence SEZY',
  description: 'Passerelle de confiance Europe-Afrique',
  url: 'https://sezy.bj',
  telephone: process.env.NEXT_PUBLIC_WHATSAPP_1 || '+2290142087361',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Agontikon',
    addressLocality: 'Cotonou',
    addressCountry: 'BJ',
  },
  openingHours: 'Mo-Fr 10:00-18:00',
  sameAs: ['https://www.facebook.com/agencesezy'],
}

export default async function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* JSON-LD Schema.org LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      {/* 1. HERO SECTION — Accroche principale */}
      <HeroSection />

      {/* 2. STATS SECTION — Preuve sociale numérique */}
      <StatsSection />

      {/* 3. SERVICES SECTION — Les 3 pôles SEZY */}
      <ServicesSection />

      {/* 4. HOW IT WORKS — Processus simplifié */}
      <HowItWorksSection />

      {/* 5. NEXT FLIGHT — Urgence et disponibilité */}
      <NextFlightSection />

      {/* 6. TESTIMONIALS — Preuve sociale */}
      <TestimonialsSection />

      {/* 7. CTA FINAL — Conversion */}
      <CtaSection />
    </div>
  )
}
