import 'dotenv/config'
import {
  PrismaClient,
  FlightDirection,
  FlightStatus,
  ProductCategory,
  ParcelStatus,
} from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaPg(pool as any)

export const db = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Ré-exportation explicite des énumérations pour l'application
export { FlightDirection, FlightStatus, ProductCategory, ParcelStatus }

export type { PrismaClient }
