// src/components/layout/Footer.tsx
/**
 * Footer SEZY — Crédibilité institutionnelle et informations légales
 * Server Component — SEO maximal
 *
 * RESPONSABILITÉ :
 * - Établir la confiance institutionnelle avec RCCM, IFU, adresse
 * - Fournir les liens essentiels et coordonnées de contact
 * - Rassurer le client hésitant sur les transactions internationales
 *
 * DESIGN (DOC 09) :
 * - Fond : bg-sezy-navy (#1B3A6B) — cohérence avec Header
 * - Texte : text-white/90 (principal), text-white/60 (secondaire)
 * - Liens hover : text-white transition-colors
 * - Séparateur : border-white/10
 * - Grille : 4 colonnes desktop, empilé mobile
 *
 * INSPIRATION : Template 21ST Footer — design moderne avec gradients
 * ADAPTATION : Server Component (sans Framer Motion)
 *
 * RÈGLES (DOC 02 & DOC 06) :
 * - Server Component = pas de 'use client'
 * - next/link pour liens internes
 * - <a> pour externes (tel:, mailto:, https://wa.me/)
 * - TypeScript strict
 */

import Link from 'next/link'
import { Facebook, Instagram, Youtube, Phone, MapPin, Mail, Clock } from 'lucide-react'

// Données des liens de services
const serviceLinks = [
  { label: 'Logistique & Transport', href: '/logistique', key: 'logistics-service' },
  { label: 'Shopping & Bien-être', href: '/shopping', key: 'shopping-service' },
  { label: 'Études & Carrière', href: '/etudes', key: 'studies-service' },
  { label: 'Suivi de colis', href: '/suivi', key: 'tracking-service' },
  { label: 'Calculateur de prix', href: '/calculateur', key: 'calculator-service' },
] as const

// Données des liens d'information
const infoLinks = [
  { label: 'Blog & Actualités', href: '/blog' },
  { label: 'Contact', href: '/contact' },
  { label: 'À propos', href: '/about' },
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/confidentialite' },
] as const

// Numéros WhatsApp depuis les variables d'environnement (DOC 07 — jamais hardcodés)
const RAW_WA_1 = process.env.NEXT_PUBLIC_WHATSAPP_1 ?? ''
const RAW_WA_2 = process.env.NEXT_PUBLIC_WHATSAPP_2 ?? ''
// Affichage formaté (avec espace pour la lisibilité visuelle)
const WHATSAPP_1 = RAW_WA_1.replace(/(\+\d{3})(\d{2})(\d{8})/, '$1 $2$3') || 'Contact Principal'
const WHATSAPP_2 = RAW_WA_2.replace(/(\+\d{3})(\d{2})(\d{8})/, '$1 $2$3') || 'Contact Secondaire'

export default function Footer() {
  return (
    <footer className="relative w-full bg-sezy-navy overflow-hidden">
      {/* Gradient décoratif subtil en arrière-plan */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(125% 125% at 50% 0%, #1B3A6B 40%, #2563EB33 100%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Grille principale — 4 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12">
          {/* COLONNE 1 — SEZY Brand */}
          <div className="space-y-5">
            {/* Logo SEZY stylisé */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xl">S</span>
              </div>
              <span className="text-white text-2xl font-heading font-bold">SEZY</span>
            </div>

            {/* Tagline */}
            <p className="text-white/70 text-sm leading-relaxed">
              Votre passerelle de confiance entre l&apos;Europe et l&apos;Afrique.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com/sezy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/sezy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/sezy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/${WHATSAPP_1.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-whatsapp hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              {WHATSAPP_1}
            </a>
          </div>

          {/* COLONNE 2 — Services */}
          <div>
            <h4 className="text-white text-base font-semibold mb-5">Nos Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map(link => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 3 — Informations */}
          <div>
            <h4 className="text-white text-base font-semibold mb-5">Informations</h4>
            <ul className="space-y-3">
              {infoLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 4 — Contact */}
          <div className="space-y-4">
            <h4 className="text-white text-base font-semibold mb-5">Contact</h4>

            {/* Adresse */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-logistics mt-1 flex-shrink-0" />
              <span className="text-white/70 text-sm">Agontikon, Cotonou, Bénin</span>
            </div>

            {/* Horaires */}
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-logistics mt-1 flex-shrink-0" />
              <span className="text-white/70 text-sm">
                Lun–Ven : 10h–18h
                <br />
                <span className="text-white/50">(pause 13h–14h)</span>
              </span>
            </div>

            {/* WhatsApp 1 */}
            <a
              href={`https://wa.me/${WHATSAPP_1.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/70 hover:text-whatsapp transition-colors text-sm"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              {WHATSAPP_1}
            </a>

            {/* WhatsApp 2 */}
            <a
              href={`https://wa.me/${WHATSAPP_2.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white/70 hover:text-whatsapp transition-colors text-sm"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              {WHATSAPP_2}
            </a>

            {/* Email */}
            <a
              href="mailto:agencesezy@gmail.com"
              className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              agencesezy@gmail.com
            </a>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-white/10 pt-8">
          {/* Bande inférieure */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            {/* Copyright */}
            <p>© 2026 SEZY — Tous droits réservés</p>

            {/* RCCM + IFU */}
            <p className="text-center">RCCM : RB/PNO/23B4553 · IFU : 3202323198217</p>

            {/* Crédit (optionnel) */}
            <p className="text-white/40">Propulsé par Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
