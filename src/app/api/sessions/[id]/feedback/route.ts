import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { feedbackSchema } from '@/lib/validation'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate input
    const result = feedbackSchema.safeParse(body)
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

    // Upsert feedback
    await prisma.feedback.upsert({
      where: { sessionId: params.id },
      create: {
        sessionId: params.id,
        mostImportantFeature: result.data.mostImportantFeature,
        biggestConcern: result.data.biggestConcern,
        otherIdeas: result.data.otherIdeas || null,
      },
      update: {
        mostImportantFeature: result.data.mostImportantFeature,
        biggestConcern: result.data.biggestConcern,
        otherIdeas: result.data.otherIdeas || null,
      },
    })

    // Update session as completed
    await prisma.surveySession.update({
      where: { id: params.id },
      data: { 
        currentStep: 9,
        isCompleted: true,
        completedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save feedback error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save feedback' },
      { status: 500 }
    )
  }
}
