// src/middleware.ts
/**
 * Middleware de sécurité SEZY — Version Edge-compatible
 * Protège les routes /admin et gère la session NextAuth sans charger Prisma.
 */
import NextAuth from 'next-auth'

import { authConfig } from '@/auth.config'

export default NextAuth(authConfig).auth

export const config = {
  matcher: ['/admin/:path*'],
}
