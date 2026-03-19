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

  // Rediriger vers login si accès admin sans être connecté
  if (isOnAdmin && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/admin/:path*'],
}
