// src/lib/auth.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Simuler un login admin pour SEZY
        // En prod, on chercherait l'admin dans la DB
        if (credentials.email === process.env.ADMIN_EMAIL) {
          const isValid = await bcrypt.compare(
            credentials.password as string,
            process.env.ADMIN_PASSWORD_HASH!,
          )
          if (isValid) {
            return { id: 'admin', email: process.env.ADMIN_EMAIL, name: 'Admin SEZY' }
          }
        }

        return null
      },
    }),
  ],
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
})
