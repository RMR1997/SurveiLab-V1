"use client"

import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './use-local-storage'
import { RespondentProfile, IdeaResponse, FinalChoice, Feedback } from '@/types/survey'

interface SurveySessionData {
  sessionId: string | null
  currentStep: number
  profile: RespondentProfile | null
  responses: Record<string, IdeaResponse>
  finalChoice: FinalChoice | null
  feedback: Feedback | null
  isCompleted: boolean
}

const initialSession: SurveySessionData = {
  sessionId: null,
  currentStep: 0,
  profile: null,
  responses: {},
  finalChoice: null,
  feedback: null,
  isCompleted: false,
}

export function useSurveySession() {
  const [session, setSession, isInitialized] = useLocalStorage<SurveySessionData>('survey-session', initialSession)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createSession = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/sessions', { method: 'POST' })
      const data = await response.json()
      
      if (data.success) {
        setSession({
          ...initialSession,
          sessionId: data.data.sessionId,
          currentStep: 1,
        })
        return data.data.sessionId
      }
      throw new Error(data.error || 'Failed to create session')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [setSession])

  const saveProfile = useCallback(async (profile: RespondentProfile) => {
    if (!session.sessionId) return false
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/sessions/${session.sessionId}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      
      const data = await response.json()
      if (data.success) {
        setSession((prev) => ({
          ...prev,
          profile,
          currentStep: 2,
        }))
        return true
      }
      throw new Error(data.error || 'Failed to save profile')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [session.sessionId, setSession])

  const saveResponse = useCallback(async (ideaId: string, response: IdeaResponse) => {
    if (!session.sessionId) return false
    
    setIsLoading(true)
    try {
      const response_api = await fetch(`/api/sessions/${session.sessionId}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...response, ideaId }),
      })
      
      const data = await response_api.json()
      if (data.success) {
        setSession((prev) => ({
          ...prev,
          responses: { ...prev.responses, [ideaId]: response },
          currentStep: data.data.nextStep,
        }))
        return true
      }
      throw new Error(data.error || 'Failed to save response')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [session.sessionId, setSession])

  const saveFinalChoice = useCallback(async (finalChoice: FinalChoice) => {
    if (!session.sessionId) return false
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/sessions/${session.sessionId}/final-choice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalChoice),
      })
      
      const data = await response.json()
      if (data.success) {
        setSession((prev) => ({
          ...prev,
          finalChoice,
          currentStep: 8,
        }))
        return true
      }
      throw new Error(data.error || 'Failed to save final choice')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [session.sessionId, setSession])

  const saveFeedback = useCallback(async (feedback: Feedback) => {
    if (!session.sessionId) return false
    
    setIsLoading(true)
    try {
      const response = await fetch(`/api/sessions/${session.sessionId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      })
      
      const data = await response.json()
      if (data.success) {
        setSession((prev) => ({
          ...prev,
          feedback,
          isCompleted: true,
          currentStep: 9,
        }))
        return true
      }
      throw new Error(data.error || 'Failed to save feedback')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [session.sessionId, setSession])

  const goToStep = useCallback((step: number) => {
    setSession((prev) => ({ ...prev, currentStep: step }))
  }, [setSession])

  const resetSession = useCallback(() => {
    setSession(initialSession)
  }, [setSession])

  return {
    session,
    isLoading,
    error,
    isInitialized,
    createSession,
    saveProfile,
    saveResponse,
    saveFinalChoice,
    saveFeedback,
    goToStep,
    resetSession,
  }
}
