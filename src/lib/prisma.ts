import { PrismaClient } from '@prisma/client'

// Use Turso (libSQL) adapter in production, standard SQLite locally
async function createPrismaClient() {
  if (process.env.TURSO_DATABASE_URL) {
    const { createClient } = await import('@libsql/client')
    const { PrismaLibSQL } = await import('@prisma/adapter-libsql')

    const libsql = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
    const adapter = new PrismaLibSQL(libsql)
    return new PrismaClient({ adapter } as any)
  }
  return new PrismaClient()
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || (await createPrismaClient())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
