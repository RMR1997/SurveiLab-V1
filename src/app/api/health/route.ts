import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test DB connection with simple query
    const count = await prisma.startupIdea.count()
    const envCheck = {
      hasTursoUrl: !!process.env.TURSO_DATABASE_URL,
      hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
      tursoUrlLength: process.env.TURSO_DATABASE_URL?.length,
      tursoTokenLength: process.env.TURSO_AUTH_TOKEN?.length,
      tursoUrlParts: process.env.TURSO_DATABASE_URL ? `${process.env.TURSO_DATABASE_URL.substring(0, 15)}...${process.env.TURSO_DATABASE_URL.substring(process.env.TURSO_DATABASE_URL.length - 15)}` : null,
      tursoTokenParts: process.env.TURSO_AUTH_TOKEN ? `${process.env.TURSO_AUTH_TOKEN.substring(0, 15)}...${process.env.TURSO_AUTH_TOKEN.substring(process.env.TURSO_AUTH_TOKEN.length - 15)}` : null,
    }
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      startupIdeasCount: count,
      env: envCheck,
    })
  } catch (error: any) {
    const envCheck = {
      hasTursoUrl: !!process.env.TURSO_DATABASE_URL,
      hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
      tursoUrlLength: process.env.TURSO_DATABASE_URL?.length,
      tursoTokenLength: process.env.TURSO_AUTH_TOKEN?.length,
      tursoUrlParts: process.env.TURSO_DATABASE_URL ? `${process.env.TURSO_DATABASE_URL.substring(0, 15)}...${process.env.TURSO_DATABASE_URL.substring(process.env.TURSO_DATABASE_URL.length - 15)}` : null,
      tursoTokenParts: process.env.TURSO_AUTH_TOKEN ? `${process.env.TURSO_AUTH_TOKEN.substring(0, 15)}...${process.env.TURSO_AUTH_TOKEN.substring(process.env.TURSO_AUTH_TOKEN.length - 15)}` : null,
    }
    return NextResponse.json({
      status: 'error',
      database: 'failed',
      error: error?.message || String(error),
      env: envCheck,
    }, { status: 500 })
  }
}
