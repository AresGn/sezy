// src/lib/__tests__/whatsapp.test.ts
/**
 * Tests unitaires — lib/whatsapp.ts
 * Vérifie les 6 contextes WhatsApp définis dans DOC 04
 */
import { describe, it, expect, beforeEach } from 'vitest'

import { getWhatsAppUrl } from '@/lib/whatsapp'

describe('getWhatsAppUrl', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_WHATSAPP_1 = '+22901042087361'
  })

  it('context home → contient wa.me et le numéro encodé', () => {
    const url = getWhatsAppUrl('home')
    expect(url).toContain('wa.me')
    expect(url).toContain('22901042087361')
  })

  it('context home -> message URL-encode (sans espaces bruts)', () => {
    const url = getWhatsAppUrl('home')
    expect(url).not.toMatch(/text=.*\s/)
    expect(url).toContain('text=')
  })

  it('context logistics → message logistique Paris-Cotonou', () => {
    const url = getWhatsAppUrl('logistics')
    expect(url).toContain('wa.me')
    expect(decodeURIComponent(url)).toContain('Paris')
    expect(decodeURIComponent(url)).toContain('Cotonou')
  })

  it('context logistics avec flightDate → inclut la date dans le message', () => {
    const url = getWhatsAppUrl('logistics', { flightDate: '15 Avril 2026' })
    expect(decodeURIComponent(url)).toContain('15 Avril 2026')
  })

  it('context shopping → message shopping générique', () => {
    const url = getWhatsAppUrl('shopping')
    expect(url).toContain('wa.me')
    const decoded = decodeURIComponent(url)
    expect(decoded).toContain('Shopping')
  })

  it('context shopping avec productName → inclut le nom du produit', () => {
    const url = getWhatsAppUrl('shopping', { productName: 'Maca Bio 500g' })
    const decoded = decodeURIComponent(url)
    expect(decoded).toContain('Maca Bio 500g')
  })

  it('context studies → message checklist diagnostic', () => {
    const url = getWhatsAppUrl('studies')
    expect(url).toContain('wa.me')
    const decoded = decodeURIComponent(url)
    expect(decoded).toContain('checklist')
  })

  it('context tracking → message question colis générique', () => {
    const url = getWhatsAppUrl('tracking')
    expect(url).toContain('wa.me')
    const decoded = decodeURIComponent(url)
    expect(decoded).toContain('colis')
  })

  it('context tracking avec trackingCode → inclut le code colis', () => {
    const url = getWhatsAppUrl('tracking', { trackingCode: 'SEZY-ABCD-1234' })
    const decoded = decodeURIComponent(url)
    expect(decoded).toContain('SEZY-ABCD-1234')
  })

  it('context contact → message contact générique', () => {
    const url = getWhatsAppUrl('contact')
    expect(url).toContain('wa.me')
    expect(url).toContain('text=')
  })

  it('retourne # si NEXT_PUBLIC_WHATSAPP_1 non défini', () => {
    const original = process.env.NEXT_PUBLIC_WHATSAPP_1
    delete process.env.NEXT_PUBLIC_WHATSAPP_1
    const url = getWhatsAppUrl('home')
    expect(url).toBe('#')
    process.env.NEXT_PUBLIC_WHATSAPP_1 = original
  })
})
