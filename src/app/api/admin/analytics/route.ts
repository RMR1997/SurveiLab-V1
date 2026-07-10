import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateIdeaScore } from '@/lib/utils'
import { getAllIdeas } from '@/data/ideas'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // Get all data
    const [sessions, responses, finalChoices, ideas] = await Promise.all([
      prisma.surveySession.findMany(),
      prisma.ideaResponse.findMany(),
      prisma.finalChoice.findMany(),
      prisma.startupIdea.findMany({ orderBy: { sortOrder: 'asc' } }),
    ])

    const completedSessions = sessions.filter(s => s.isCompleted)
    const totalResponses = sessions.length
    const completionRate = totalResponses > 0 
      ? (completedSessions.length / totalResponses) * 100 
      : 0

    // Calculate average completion time for completed sessions
    const avgCompletionTime = completedSessions.length > 0
      ? completedSessions.reduce((acc, s) => {
          if (s.completedAt && s.createdAt) {
            return acc + (s.completedAt.getTime() - s.createdAt.getTime()) / (1000 * 60)
          }
          return acc
        }, 0) / completedSessions.length
      : 0

    // Process idea rankings
    const ideaRankings = ideas.map(idea => {
      const ideaResponses = responses.filter(r => r.ideaId === idea.id)
      const finalChoiceCount = finalChoices.filter(f => f.firstChoiceId === idea.id).length

      if (ideaResponses.length === 0) {
        return {
          ideaId: idea.id,
          ideaName: idea.name,
          problemSeverity: 0,
          usefulness: 0,
          urgency: 0,
          nps: 0,
          finalChoiceCount: 0,
          finalChoicePercentage: 0,
          compositeScore: 0,
        }
      }

      const avgProblemSeverity = ideaResponses.reduce((acc, r) => acc + r.problemSeverity, 0) / ideaResponses.length
      const avgUsefulness = ideaResponses.reduce((acc, r) => acc + r.usefulness, 0) / ideaResponses.length
      const avgUrgency = ideaResponses.reduce((acc, r) => acc + r.urgency, 0) / ideaResponses.length
      const avgNps = ideaResponses.reduce((acc, r) => acc + r.npsScore, 0) / ideaResponses.length
      
      const firstChoicePercentage = completedSessions.length > 0
        ? (finalChoiceCount / completedSessions.length) * 100
        : 0

      // Calculate composite score using first response as sample
      const sampleResponse = ideaResponses[0]
      const compositeScore = calculateIdeaScore({
        problemSeverity: avgProblemSeverity,
        usefulness: avgUsefulness,
        urgency: avgUrgency,
        npsScore: avgNps,
        usageIntent: sampleResponse.usageIntent,
        conceptClarity: sampleResponse.conceptClarity,
      })

      return {
        ideaId: idea.id,
        ideaName: idea.name,
        problemSeverity: Number(avgProblemSeverity.toFixed(2)),
        usefulness: Number(avgUsefulness.toFixed(2)),
        urgency: Number(avgUrgency.toFixed(2)),
        nps: Number(avgNps.toFixed(2)),
        finalChoiceCount,
        finalChoicePercentage: Number(firstChoicePercentage.toFixed(1)),
        compositeScore: Number(compositeScore.toFixed(2)),
      }
    })

    // Sort by composite score
    ideaRankings.sort((a, b) => b.compositeScore - a.compositeScore)

    // Demographics
    const profiles = await prisma.respondentProfile.findMany()
    const demographics = {
      byAge: {} as Record<string, number>,
      byOccupation: {} as Record<string, number>,
      byLocation: {} as Record<string, number>,
    }

    profiles.forEach(p => {
      demographics.byAge[p.ageRange] = (demographics.byAge[p.ageRange] || 0) + 1
      demographics.byOccupation[p.occupation] = (demographics.byOccupation[p.occupation] || 0) + 1
      demographics.byLocation[p.location] = (demographics.byLocation[p.location] || 0) + 1
    })

    // Hourly responses
    const hourlyResponses = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      count: 0,
    }))

    sessions.forEach(s => {
      const hour = s.createdAt.getHours()
      hourlyResponses[hour].count++
    })

    return NextResponse.json({
      success: true,
      data: {
        totalResponses,
        completionRate: Number(completionRate.toFixed(1)),
        avgCompletionTime: Number(avgCompletionTime.toFixed(1)),
        ideaRankings,
        demographics,
        hourlyResponses,
      },
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
