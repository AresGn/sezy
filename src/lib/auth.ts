// src/lib/auth.ts
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { authConfig } from '@/auth.config'

/**
 * Configuration complète de NextAuth pour les Server Components et l'API.
 * Utilise l'adaptateur Prisma et la logique de validation bcrypt.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
})
