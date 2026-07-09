import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { profileSchema } from '@/lib/validation'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate input
    const result = profileSchema.safeParse(body)
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

    // Create or update profile
    await prisma.respondentProfile.upsert({
      where: { sessionId: params.id },
      create: {
        sessionId: params.id,
        ageRange: result.data.ageRange,
        occupation: result.data.occupation,
        location: result.data.location,
        techSavviness: result.data.techSavviness,
      },
      update: {
        ageRange: result.data.ageRange,
        occupation: result.data.occupation,
        location: result.data.location,
        techSavviness: result.data.techSavviness,
      },
    })

    // Update session step
    await prisma.surveySession.update({
      where: { id: params.id },
      data: { currentStep: 2 },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save profile error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save profile' },
      { status: 500 }
    )
  }
}
