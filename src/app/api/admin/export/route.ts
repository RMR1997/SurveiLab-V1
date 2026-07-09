import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAllIdeas } from '@/data/ideas'
import { ageRangeLabels, occupationLabels, experienceLabels, usageIntentLabels, clarityLabels } from '@/lib/utils'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'

    // Fetch all data
    const [sessions, ideas] = await Promise.all([
      prisma.surveySession.findMany({
        include: {
          profile: true,
          responses: true,
          finalChoice: true,
          feedback: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.startupIdea.findMany(),
    ])

    // Create idea lookup
    const ideaMap = new Map(ideas.map(i => [i.id, i]))

    // Format data
    const exportData = sessions.map(session => ({
      sessionId: session.id,
      createdAt: session.createdAt.toISOString(),
      completedAt: session.completedAt?.toISOString() || null,
      profile: session.profile ? {
        ageRange: ageRangeLabels[session.profile.ageRange] || session.profile.ageRange,
        occupation: occupationLabels[session.profile.occupation] || session.profile.occupation,
        location: session.profile.location,
        techSavviness: session.profile.techSavviness,
      } : null,
      ideaResponses: session.responses.map(r => ({
        ideaName: ideaMap.get(r.ideaId)?.name || r.ideaId,
        problemSeverity: r.problemSeverity,
        experienceType: experienceLabels[r.experienceType] || r.experienceType,
        usefulness: r.usefulness,
        usageIntent: usageIntentLabels[r.usageIntent] || r.usageIntent,
        urgency: r.urgency,
        npsScore: r.npsScore,
        conceptClarity: clarityLabels[r.conceptClarity] || r.conceptClarity,
      })),
      finalChoice: session.finalChoice ? {
        firstChoice: ideaMap.get(session.finalChoice.firstChoiceId)?.name || session.finalChoice.firstChoiceId,
        secondChoice: session.finalChoice.secondChoiceId 
          ? ideaMap.get(session.finalChoice.secondChoiceId)?.name || session.finalChoice.secondChoiceId
          : null,
        reason: session.finalChoice.reason,
      } : null,
      feedback: session.feedback ? {
        mostImportantFeature: session.feedback.mostImportantFeature,
        biggestConcern: session.feedback.biggestConcern,
        otherIdeas: session.feedback.otherIdeas,
      } : null,
    }))

    if (format === 'csv') {
      // Create CSV
      const headers = [
        'Session ID',
        'Created At',
        'Completed',
        'Age Range',
        'Occupation',
        'Location',
        'Tech Savviness',
        'Final Choice',
        'Second Choice',
        'Choice Reason',
      ]

      const rows = exportData.map(s => [
        s.sessionId,
        s.createdAt,
        s.completedAt ? 'Yes' : 'No',
        s.profile?.ageRange || '',
        s.profile?.occupation || '',
        s.profile?.location || '',
        s.profile?.techSavviness || '',
        s.finalChoice?.firstChoice || '',
        s.finalChoice?.secondChoice || '',
        s.finalChoice?.reason || '',
      ])

      const csv = [headers.join(','), ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))].join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="survey-export-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      })
    }

    // Default JSON
    return NextResponse.json({
      success: true,
      data: {
        sessions: exportData,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to export data' },
      { status: 500 }
    )
  }
}
