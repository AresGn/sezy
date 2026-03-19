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
  // On accepte les deux noms de variables pour être sûr
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
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
      // MODIF : On vérifie juste si l'objet auth existe (le JWT est valide)
      const isLoggedIn = !!auth
      const isOnAdmin = nextUrl.pathname.startsWith('/admin')

      if (isOnAdmin) {
        return isLoggedIn // true = accès, false = redirection vers login
      }
      return true
    },
  },
  providers: [], // Sera complété dans lib/auth.ts
} satisfies NextAuthConfig
