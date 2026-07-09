import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { ageRangeLabels, occupationLabels, experienceLabels, usageIntentLabels, clarityLabels } from '@/lib/utils'
import { getAllIdeas } from '@/data/ideas'

export async function GET() {
  try {
    const sessions = await prisma.surveySession.findMany({
      include: {
        profile: true,
        responses: true,
        finalChoice: true,
        feedback: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    const ideas = getAllIdeas()
    const ideaMap = new Map(ideas.map(i => [i.id, i]))

    const data = sessions.map((session, index) => ({
      id: session.id,
      no: index + 1,
      sessionId: session.id.slice(0, 8) + '...',
      createdAt: new Date(session.createdAt).toLocaleString('id-ID'),
      isCompleted: session.isCompleted,
      profile: session.profile ? {
        ageRange: ageRangeLabels[session.profile.ageRange] || session.profile.ageRange,
        occupation: occupationLabels[session.profile.occupation] || session.profile.occupation,
        location: session.profile.location,
        techSavviness: session.profile.techSavviness,
      } : null,
      responses: session.responses.map(r => ({
        ideaName: ideaMap.get(r.ideaId)?.name || r.ideaId,
        ideaColor: ideaMap.get(r.ideaId)?.colorPrimary || '#888',
        problemSeverity: r.problemSeverity,
        experienceType: experienceLabels[r.experienceType] || r.experienceType,
        usefulness: r.usefulness,
        usageIntent: usageIntentLabels[r.usageIntent] || r.usageIntent,
        urgency: r.urgency,
        npsScore: r.npsScore,
        conceptClarity: clarityLabels[r.conceptClarity] || r.conceptClarity,
      })),
      finalChoice: session.finalChoice ? {
        firstChoice: ideaMap.get(session.finalChoice.firstChoiceId)?.name || '-',
        firstChoiceColor: ideaMap.get(session.finalChoice.firstChoiceId)?.colorPrimary || '#888',
        secondChoice: session.finalChoice.secondChoiceId
          ? ideaMap.get(session.finalChoice.secondChoiceId)?.name || '-'
          : null,
        reason: session.finalChoice.reason,
      } : null,
      feedback: session.feedback ? {
        mostImportantFeature: session.feedback.mostImportantFeature,
        biggestConcern: session.feedback.biggestConcern,
        otherIdeas: session.feedback.otherIdeas || null,
      } : null,
    }))

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Responses error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch responses' },
      { status: 500 }
    )
  }
}
