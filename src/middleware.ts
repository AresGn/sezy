// src/middleware.ts
/**
 * Middleware de sécurité SEZY
 * Protège les routes /admin et gère la session NextAuth
 */
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'

export default auth(req => {
  const isLoggedIn = !!req.auth
  const nextUrl = req.nextUrl

  const isOnAdmin = nextUrl.pathname.startsWith('/admin')
  const isOnLogin = nextUrl.pathname.startsWith('/login')

  // Rediriger vers login si accès admin sans être connecté
  if (isOnAdmin && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // Rediriger vers admin si déjà connecté et sur page login
  if (isOnLogin && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', nextUrl))
  }

  return NextResponse.next()
})

// Configurer les routes sur lesquelles le middleware s'applique
export const config = {
  matcher: ['/admin/:path*', '/login'],
}
