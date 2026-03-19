// src/middleware.ts
/**
 * Middleware de sécurité SEZY — Version Edge-compatible
 * Protège les routes /admin et gère la session NextAuth sans charger Prisma.
 */
import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'

import { authConfig } from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth(req => {
  const isLoggedIn = !!req.auth
  const nextUrl = req.nextUrl

  const isOnAdmin = nextUrl.pathname.startsWith('/admin')
  const isOnLogin = nextUrl.pathname.startsWith('/auth/login')

  // Rediriger vers login si accès admin sans être connecté
  if (isOnAdmin && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl))
  }

  // Rediriger vers admin si déjà connecté et sur page login
  if (isOnLogin && isLoggedIn) {
    return NextResponse.redirect(new URL('/admin', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*', '/auth/login'],
}
