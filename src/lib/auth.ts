// src/lib/auth.ts
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { authConfig } from '@/auth.config'

/**
 * Configuration NextAuth pour SEZY - Admin uniquement via credentials.
 * Authentification via la table Admin dans PostgreSQL.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

        if (!email || !password) return null

        try {
          // DOC 07: Validation contre la base de données
          const admin = await db.admin.findUnique({
            where: { email, isActive: true },
          })

          if (!admin) return null

          // Vérifier le mot de passe
          const isValid = await bcrypt.compare(password, admin.passwordHash)

          if (isValid) {
            // Mettre à jour lastLoginAt
            await db.admin.update({
              where: { id: admin.id },
              data: { lastLoginAt: new Date() },
            })

            return {
              id: admin.id,
              email: admin.email,
              name: admin.name,
            }
          }

          return null
        } catch (error) {
          console.error("[AUTH] Erreur lors de l'authentification:", error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 heures
  },
})
