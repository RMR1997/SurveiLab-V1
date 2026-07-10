"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ConceptCard } from '@/components/survey/concept-card'
import { RadioQuestion, LikertQuestion, NPSQuestion } from '@/components/survey/question-set'
import { useSurveySession } from '@/hooks/use-survey-session'
import { getIdeaBySlug, getAllIdeas } from '@/data/ideas'
import { 
  experienceTypeOptions, 
  usageIntentOptions, 
  clarityLevelOptions,
  likertLabels 
} from '@/data/questions'
import { IdeaResponseInput, ideaResponseSchema } from '@/lib/validation'
import { IdeaResponse } from '@/types/survey'
import { toast } from 'sonner'

export default function ConceptPage() {
  const router = useRouter()
  const params = useParams()
  const ideaSlug = params.ideaSlug as string
  
  const { session, isInitialized, saveResponse, goToStep } = useSurveySession()
  const idea = getIdeaBySlug(ideaSlug)
  const allIdeas = getAllIdeas()
  
  const currentIndex = allIdeas.findIndex(i => i.slug === ideaSlug)
  const nextIdea = allIdeas[currentIndex + 1]
  const prevIdea = allIdeas[currentIndex - 1]
  
  const [formData, setFormData] = useState<Partial<IdeaResponseInput>>({
    ideaId: idea?.id,
    problemSeverity: 3,
    experienceType: undefined,
    usefulness: 3,
    usageIntent: undefined,
    urgency: 3,
    npsScore: 5,
    conceptClarity: undefined,
    customBehaviorAnswer: undefined,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Tunggu sampai localStorage selesai di-load
    if (!isInitialized) return
    
    if (!session.sessionId) {
      router.push('/')
      return
    }
    
    if (!idea) {
      router.push('/')
      return
    }

    // Restore saved response if exists
    const saved = session.responses[idea.id]
    if (saved) {
      setFormData({ ...saved, ideaId: idea.id })
    }

    // Update step only if moving forward to avoid resetting progress
    const stepForThisPage = 2 + currentIndex
    if (stepForThisPage > session.currentStep) {
      goToStep(stepForThisPage)
    }
  }, [session.sessionId, idea, currentIndex, isInitialized])

  const handleSubmit = async () => {
    if (!idea) return
    
    if (idea.customQuestion && !formData.customBehaviorAnswer) {
      toast.error('Silakan pilih jawaban untuk pertanyaan tambahan di bagian bawah')
      return
    }
    
    const result = ideaResponseSchema.safeParse(formData)
    if (!result.success) {
      const error = result.error.errors[0]
      toast.error(error.message)
      return
    }

    setIsSubmitting(true)
    
    // Convert to IdeaResponse format
    const responseData: IdeaResponse = {
      ideaId: idea.id,
      problemSeverity: result.data.problemSeverity,
      experienceType: result.data.experienceType,
      usefulness: result.data.usefulness,
      usageIntent: result.data.usageIntent,
      urgency: result.data.urgency,
      npsScore: result.data.npsScore,
      conceptClarity: result.data.conceptClarity,
      customBehaviorAnswer: result.data.customBehaviorAnswer,
    }
    
    const success = await saveResponse(idea.id, responseData)
    setIsSubmitting(false)
    
    if (success) {
      if (nextIdea) {
        router.push(`/survey/concept/${nextIdea.slug}`)
      } else {
        router.push('/survey/final-choice')
      }
    } else {
      toast.error('Gagal menyimpan. Silakan coba lagi.')
    }
  }

  const handleBack = () => {
    if (prevIdea) {
      router.push(`/survey/concept/${prevIdea.slug}`)
    } else {
      router.push('/survey/profile')
    }
  }

  // Show loading spinner while localStorage is being initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  if (!idea) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Step indicator */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Konsep {currentIndex + 1} dari {allIdeas.length}
        </p>
        <h1 className="text-xl font-semibold">Penilaian Ide</h1>
      </div>

      {/* Concept Card */}
      <ConceptCard idea={idea} />

      {/* Questions */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
        <CardContent className="p-6 sm:p-8 space-y-8">
          {/* Q1: Problem Severity */}
          <LikertQuestion
            id="problemSeverity"
            question="Menurut Anda, seberapa besar masalah yang ingin diselesaikan platform ini?"
            value={formData.problemSeverity || 3}
            onChange={(value) => setFormData({ ...formData, problemSeverity: value })}
            labels={likertLabels.problemSeverity}
          />

          {/* Q2: Experience Type */}
          <RadioQuestion
            id="experienceType"
            question="Apakah Anda atau orang di sekitar Anda pernah mengalami masalah tersebut?"
            options={experienceTypeOptions}
            value={formData.experienceType || ''}
            onChange={(value) => setFormData({ ...formData, experienceType: value as any })}
          />

          {/* Q3: Usefulness */}
          <LikertQuestion
            id="usefulness"
            question="Seberapa bermanfaat platform ini?"
            value={formData.usefulness || 3}
            onChange={(value) => setFormData({ ...formData, usefulness: value })}
            labels={likertLabels.usefulness}
          />

          {/* Q4: Usage Intent */}
          <RadioQuestion
            id="usageIntent"
            question="Jika platform ini tersedia hari ini, apakah Anda akan menggunakannya?"
            options={usageIntentOptions}
            value={formData.usageIntent || ''}
            onChange={(value) => setFormData({ ...formData, usageIntent: value as any })}
          />

          {/* Q5: Urgency */}
          <LikertQuestion
            id="urgency"
            question="Seberapa mendesak platform ini?"
            value={formData.urgency || 3}
            onChange={(value) => setFormData({ ...formData, urgency: value })}
            labels={likertLabels.urgency}
          />

          {/* Q6: NPS */}
          <NPSQuestion
            id="npsScore"
            question="Seberapa besar kemungkinan Anda merekomendasikan platform ini kepada teman?"
            value={formData.npsScore ?? 5}
            onChange={(value) => setFormData({ ...formData, npsScore: value })}
          />

          {/* Q7: Concept Clarity */}
          <RadioQuestion
            id="conceptClarity"
            question="Apakah preview website membantu Anda memahami konsep platform ini?"
            options={clarityLevelOptions}
            value={formData.conceptClarity || ''}
            onChange={(value) => setFormData({ ...formData, conceptClarity: value as any })}
          />

          {/* Q8: Custom Behavioral Question */}
          {idea.customQuestion && idea.customOptions && (
            <>
              <div className="h-px bg-border/55 w-full my-6" />
              <RadioQuestion
                id="customBehaviorAnswer"
                question={idea.customQuestion}
                options={idea.customOptions.map(opt => ({ value: opt, label: opt }))}
                value={formData.customBehaviorAnswer || ''}
                onChange={(value) => setFormData({ ...formData, customBehaviorAnswer: value })}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Button>
        
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="gap-2 rounded-xl"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Menyimpan...
            </>
          ) : (
            <>
              {nextIdea ? 'Lanjut' : 'Lanjut ke Pilihan'}
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}
