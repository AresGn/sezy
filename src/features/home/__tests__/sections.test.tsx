// @vitest-environment jsdom
// src/features/home/__tests__/sections.test.tsx
/**
 * Tests smoke (render) — Sections de la landing page SEZY
 * Vérifie que chaque section Server Component se rend sans erreur
 * et contient les éléments attendus définis dans le design kit
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import StatsSection from '@/features/home/components/StatsSection'
import ServicesSection from '@/features/home/components/ServicesSection'
import HowItWorksSection from '@/features/home/components/HowItWorksSection'
import TestimonialsSection from '@/features/home/components/TestimonialsSection'
import CtaSection from '@/features/home/components/CtaSection'
import HeroSection from '@/features/home/components/HeroSection'

describe('StatsSection', () => {
  it('se rend sans erreur', () => {
    const { container } = render(<StatsSection />)
    expect(container).toBeTruthy()
  })

  it('contient les 4 stats SEZY', () => {
    render(<StatsSection />)
    expect(screen.getByText('+2000')).toBeTruthy()
    expect(screen.getByText('Paris ↔ Cotonou')).toBeTruthy()
    expect(screen.getByText('4.9/5')).toBeTruthy()
    expect(screen.getByText('3')).toBeTruthy()
  })

  it('contient le titre SEZY EN CHIFFRES', () => {
    render(<StatsSection />)
    expect(screen.getByText('SEZY EN CHIFFRES')).toBeTruthy()
  })
})

describe('ServicesSection', () => {
  it('se rend sans erreur', () => {
    const { container } = render(<ServicesSection />)
    expect(container).toBeTruthy()
  })

  it('contient les 3 pôles SEZY', () => {
    render(<ServicesSection />)
    expect(screen.getByText('Logistique & Transport')).toBeTruthy()
    expect(screen.getByText('Shopping & Bien-être')).toBeTruthy()
    expect(screen.getByText('Études & Carrière')).toBeTruthy()
  })

  it('contient les CTAs vers les 3 pôles', () => {
    render(<ServicesSection />)
    expect(screen.getByText('Calculer mon tarif')).toBeTruthy()
    expect(screen.getByText('Voir le catalogue')).toBeTruthy()
    expect(screen.getByText('Ma checklist')).toBeTruthy()
  })
})

describe('HowItWorksSection', () => {
  it('se rend sans erreur', () => {
    const { container } = render(<HowItWorksSection />)
    expect(container).toBeTruthy()
  })

  it('contient les 3 étapes (01, 02, 03)', () => {
    render(<HowItWorksSection />)
    expect(screen.getByText('01')).toBeTruthy()
    expect(screen.getByText('02')).toBeTruthy()
    expect(screen.getByText('03')).toBeTruthy()
  })

  it('contient le titre de section', () => {
    render(<HowItWorksSection />)
    expect(screen.getByText('Comment ça marche ?')).toBeTruthy()
  })

  it('contient un lien vers /logistique', () => {
    render(<HowItWorksSection />)
    const link = screen.getByRole('link', { name: /envoyer mon premier colis/i })
    expect(link.getAttribute('href')).toBe('/logistique')
  })
})

describe('TestimonialsSection', () => {
  it('se rend sans erreur', () => {
    const { container } = render(<TestimonialsSection />)
    expect(container).toBeTruthy()
  })

  it('contient les 3 témoignages', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText('Aminata Koffi')).toBeTruthy()
    expect(screen.getByText('Jean-Baptiste Sossou')).toBeTruthy()
    expect(screen.getByText('Marie-Claire Dossou')).toBeTruthy()
  })

  it('contient le titre de section', () => {
    render(<TestimonialsSection />)
    expect(screen.getByText('Ce que disent nos clients')).toBeTruthy()
  })
})

describe('CtaSection', () => {
  it('se rend sans erreur', () => {
    const { container } = render(<CtaSection />)
    expect(container).toBeTruthy()
  })

  it('contient un lien vers /logistique', () => {
    render(<CtaSection />)
    const link = screen.getByRole('link', { name: /calculer mon tarif/i })
    expect(link.getAttribute('href')).toBe('/logistique')
  })

  it('contient un bouton WhatsApp', () => {
    render(<CtaSection />)
    expect(screen.getByText(/whatsapp/i)).toBeTruthy()
  })
})

describe('HeroSection', () => {
  it('se rend sans erreur', () => {
    const { container } = render(<HeroSection />)
    expect(container).toBeTruthy()
  })

  it('contient un H1 avec Paris et Cotonou', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
    expect(screen.getByText('Paris')).toBeTruthy()
    expect(screen.getByText('Cotonou')).toBeTruthy()
  })

  it('contient un CTA vers /suivi', () => {
    render(<HeroSection />)
    const links = screen.getAllByRole('link')
    const suiviLink = links.find((l: HTMLElement) => l.getAttribute('href') === '/suivi')
    expect(suiviLink).toBeTruthy()
  })
})
