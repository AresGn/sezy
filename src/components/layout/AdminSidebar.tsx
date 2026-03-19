/**
 * src/components/layout/AdminSidebar.tsx
 *
 * RESPONSABILITÉ :
 * - Sidebar de navigation pour les pages admin
 * - Responsive : Mobile drawer + Desktop sidebar
 * - Navigation vers /admin/*
 * - Design System : sezy-navy + sezy-gold accents
 */

'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Plane,
  Package,
  ShoppingCart,
  MessageSquare,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/vols', label: 'Vols & Trajets', icon: Plane },
  { href: '/admin/colis', label: 'Suivi Colis', icon: Package },
  { href: '/admin/produits', label: 'Produits', icon: ShoppingCart },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-sezy-navy text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 bg-sezy-navy text-white z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col shadow-xl
        `}
      >
        {/* Logo Header */}
        <div className="p-8 border-b border-white/10">
          <Link href="/admin" className="block group">
            <h1 className="text-3xl font-extrabold tracking-tight text-white group-hover:text-sezy-gold transition-colors">
              SEZY
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <p className="text-xs text-white/60 font-medium uppercase tracking-wider">
                Administration
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {navItems.map(item => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  group flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? 'bg-sezy-gold text-sezy-navy font-bold shadow-lg shadow-sezy-gold/20'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${isActive ? 'text-sezy-navy' : 'text-white/70 group-hover:text-white'}`}
                  />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-sezy-navy" />}
              </Link>
            )
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-white/10 bg-sezy-navy-light/30">
          <div className="flex items-center gap-3 px-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-sezy-gold flex items-center justify-center text-sezy-navy font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Admin</p>
              <p className="text-xs text-white/50">agencesezy@gmail.com</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 
                     text-red-300 hover:text-white hover:bg-red-500/20 
                     rounded-lg transition-all duration-200 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  )
}
