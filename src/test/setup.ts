// src/test/setup.ts
// Configuration globale des tests SEZY
import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock des variables d'environnement pour les tests
process.env.NEXT_PUBLIC_WHATSAPP_1 = '+22901042087361'
process.env.NEXT_PUBLIC_WHATSAPP_2 = '+22901066386417'
process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000'

// Mock de next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  redirect: vi.fn(),
}))

// Mock de next-auth
vi.mock('next-auth', () => ({
  default: vi.fn(),
  auth: vi.fn().mockResolvedValue(null),
}))

// Mock de next/image (pour les tests composants)
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    return { type: 'img', props: { src, alt, ...props } }
  },
}))

// Mock de Prisma pour les tests unitaires
vi.mock('@/lib/db', () => ({
  db: {
    flight: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    parcel: {
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    parcelStatusLog: { create: vi.fn() },
    product: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    contactMessage: { create: vi.fn() },
  },
}))
