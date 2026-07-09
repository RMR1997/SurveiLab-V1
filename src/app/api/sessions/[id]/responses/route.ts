import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ideaResponseSchema } from '@/lib/validation'
import { getAllIdeas } from '@/data/ideas'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate input
    const result = ideaResponseSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      )
    }

    const { ideaId } = result.data
    const ideas = getAllIdeas()
    const ideaIndex = ideas.findIndex(i => i.id === ideaId)
    
    if (ideaIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Invalid idea ID' },
        { status: 400 }
      )
    }

    // Calculate next step
    // Steps: intro(0) -> profile(1) -> ideas[0](2) -> ideas[1](3) -> ... -> final-choice(7) -> feedback(8) -> thanks(9)
    const nextStep = 2 + ideaIndex + 1

    // Upsert response
    await prisma.ideaResponse.upsert({
      where: {
        sessionId_ideaId: {
          sessionId: params.id,
          ideaId: result.data.ideaId,
        },
      },
      create: {
        sessionId: params.id,
        ideaId: result.data.ideaId,
        problemSeverity: result.data.problemSeverity,
        experienceType: result.data.experienceType,
        usefulness: result.data.usefulness,
        usageIntent: result.data.usageIntent,
        urgency: result.data.urgency,
        npsScore: result.data.npsScore,
        conceptClarity: result.data.conceptClarity,
      },
      update: {
        problemSeverity: result.data.problemSeverity,
        experienceType: result.data.experienceType,
        usefulness: result.data.usefulness,
        usageIntent: result.data.usageIntent,
        urgency: result.data.urgency,
        npsScore: result.data.npsScore,
        conceptClarity: result.data.conceptClarity,
      },
    })

    // Update session step
    await prisma.surveySession.update({
      where: { id: params.id },
      data: { currentStep: nextStep },
    })

    return NextResponse.json({
      success: true,
      data: { nextStep },
    })
  } catch (error) {
    console.error('Save response error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save response' },
      { status: 500 }
    )
  }
}
