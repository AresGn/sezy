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

        console.log('[AUTH] Tentative de connexion pour:', email)

        if (!email || !password) {
          console.log('[AUTH] Email ou mot de passe manquant')
          return null
        }

        try {
          // DOC 07: Validation contre la base de données
          console.log("[AUTH] Recherche de l'admin dans la DB...")
          const admin = await db.admin.findUnique({
            where: { email, isActive: true },
          })

          if (!admin) {
            console.log('[AUTH] Admin non trouvé ou inactif pour email:', email)
            return null
          }

          console.log('[AUTH] Admin trouvé, vérification du mot de passe...')
          // Vérifier le mot de passe
          const isValid = await bcrypt.compare(password, admin.passwordHash)

          if (isValid) {
            console.log('[AUTH] Mot de passe valide. Connexion réussie.')
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

          console.log('[AUTH] Mot de passe invalide')
          return null
        } catch (error) {
          console.error("[AUTH] Erreur CRITIQUE lors de l'authentification:", error)
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
