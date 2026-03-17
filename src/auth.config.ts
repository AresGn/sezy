// src/auth.config.ts
import type { NextAuthConfig } from 'next-auth'

/**
 * Configuration NextAuth compatible avec le Edge Runtime (Middleware)
 * On n'y importe pas Prisma, bcrypt ou d'autres librairies lourdes.
 */
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')

      if (isOnAdmin) {
        if (isLoggedIn) return true
        return false // Redirige vers login
      }
      return true
    },
  },
  providers: [], // Sera complété dans lib/auth.ts
} satisfies NextAuthConfig
