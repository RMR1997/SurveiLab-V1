import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { finalChoiceSchema } from '@/lib/validation'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate input
    const result = finalChoiceSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    // Check if session exists
    const session = await prisma.surveySession.findUnique({
      where: { id: params.id },
    })

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Session not found' },
        { status: 404 }
      )
    }

    // Upsert final choice
    await prisma.finalChoice.upsert({
      where: { sessionId: params.id },
      create: {
        sessionId: params.id,
        firstChoiceId: result.data.firstChoiceId,
        secondChoiceId: result.data.secondChoiceId || null,
        reason: result.data.reason,
      },
      update: {
        firstChoiceId: result.data.firstChoiceId,
        secondChoiceId: result.data.secondChoiceId || null,
        reason: result.data.reason,
      },
    })

    // Update session step
    await prisma.surveySession.update({
      where: { id: params.id },
      data: { currentStep: 8 },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save final choice error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save final choice' },
      { status: 500 }
    )
  }
}
