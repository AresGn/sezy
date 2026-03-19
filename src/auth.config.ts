// src/auth.config.ts
import type { NextAuthConfig } from 'next-auth'

/**
 * Configuration NextAuth compatible avec le Edge Runtime (Middleware)
 * On n'y importe pas Prisma, bcrypt ou d'autres librairies lourdes.
 */
export const authConfig = {
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).id = token.id as string
      }
      return session
    },
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
