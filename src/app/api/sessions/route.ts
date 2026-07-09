import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    // Get client info
    const ipAddress = request.headers.get('x-forwarded-for') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    const referrer = request.headers.get('referer') || 'direct'

    // Create new session
    const session = await prisma.surveySession.create({
      data: {
        ipAddress,
        userAgent,
        referrer,
        currentStep: 1,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        currentStep: session.currentStep,
      },
    })
  } catch (error) {
    console.error('Create session error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create session' },
      { status: 500 }
    )
  }
}
