import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test DB connection with simple query
    const count = await prisma.startupIdea.count()
    const envCheck = {
      hasTursoUrl: !!process.env.TURSO_DATABASE_URL,
      hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
      nodeEnv: process.env.NODE_ENV,
      tursoUrlPrefix: process.env.TURSO_DATABASE_URL?.substring(0, 30) + '...',
    }
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      startupIdeasCount: count,
      env: envCheck,
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      database: 'failed',
      error: error?.message || String(error),
      hasTursoUrl: !!process.env.TURSO_DATABASE_URL,
      hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
    }, { status: 500 })
  }
}
