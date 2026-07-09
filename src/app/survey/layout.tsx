"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Container } from '@/components/layout/container'
import { useSurveySession } from '@/hooks/use-survey-session'
import { getAllIdeas } from '@/data/ideas'

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { session } = useSurveySession()
  const [progress, setProgress] = useState(0)
  const ideas = getAllIdeas()

  useEffect(() => {
    // Calculate progress percentage
    const totalSteps = 2 + ideas.length + 2 // intro + profile + ideas + choice + feedback
    const currentStep = session.currentStep
    const percentage = Math.min((currentStep / totalSteps) * 100, 100)
    setProgress(percentage)
  }, [session.currentStep, ideas.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <Navbar 
        showProgress={session.currentStep > 0} 
        progress={progress}
      />
      
      <main className="pt-24 pb-16 px-4">
        <Container size="small" className="max-w-3xl">
          {children}
        </Container>
      </main>
    </div>
  )
}
