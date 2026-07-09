"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Trophy, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useSurveySession } from '@/hooks/use-survey-session'
import { getAllIdeas } from '@/data/ideas'
import { finalChoiceSchema } from '@/lib/validation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function FinalChoicePage() {
  const router = useRouter()
  const { session, isInitialized, saveFinalChoice, goToStep } = useSurveySession()
  const ideas = getAllIdeas()
  
  const [formData, setFormData] = useState({
    firstChoiceId: '',
    secondChoiceId: '',
    reason: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Tunggu sampai localStorage selesai di-load
    if (!isInitialized) return
    
    if (!session.sessionId) {
      router.push('/')
      return
    }
    if (7 > session.currentStep) {
      goToStep(7)
    }
  }, [session.sessionId, isInitialized])

  const handleSubmit = async () => {
    const result = finalChoiceSchema.safeParse(formData)
    if (!result.success) {
      const error = result.error.errors[0]
      toast.error(error.message)
      return
    }

    setIsSubmitting(true)
    const success = await saveFinalChoice({
      firstChoiceId: result.data.firstChoiceId,
      secondChoiceId: result.data.secondChoiceId || undefined,
      reason: result.data.reason,
    })
    setIsSubmitting(false)
    
    if (success) {
      router.push('/survey/feedback')
    } else {
      toast.error('Gagal menyimpan. Silakan coba lagi.')
    }
  }

  const handleBack = () => {
    const lastIdea = ideas[ideas.length - 1]
    router.push(`/survey/concept/${lastIdea.slug}`)
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-7 h-7 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Pilih Ide Terbaik</h1>
            <p className="text-muted-foreground">
              Jika hanya SATU platform yang akan diwujudkan tahun ini, mana yang paling ingin Anda lihat hadir?
            </p>
          </div>

          <div className="space-y-8">
            {/* First Choice */}
            <div className="space-y-4">
              <Label className="text-base font-medium">
                Pilihan Utama Anda <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                value={formData.firstChoiceId}
                onValueChange={(value) => setFormData({ ...formData, firstChoiceId: value })}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {ideas.map((idea) => (
                  <label
                    key={idea.id}
                    className="flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5"
                  >
                    <RadioGroupItem value={idea.id} id={idea.id} />
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: idea.colorPrimary }}
                      >
                        {idea.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium block">{idea.name}</span>
                        <span className="text-xs text-muted-foreground">{idea.tagline}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason">
                Alasan Memilih <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Mengapa Anda memilih platform tersebut?"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.reason.length}/500
              </p>
            </div>

            {/* Second Choice */}
            <div className="space-y-2">
              <Label htmlFor="secondChoice">Pilihan Kedua (Opsional)</Label>
              <Select
                value={formData.secondChoiceId}
                onValueChange={(value) => setFormData({ ...formData, secondChoiceId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pilihan kedua" />
                </SelectTrigger>
                <SelectContent>
                  {ideas
                    .filter((idea) => idea.id !== formData.firstChoiceId)
                    .map((idea) => (
                      <SelectItem key={idea.id} value={idea.id}>
                        {idea.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8">
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="gap-2 rounded-xl"
            >
              {isSubmitting ? 'Menyimpan...' : 'Lanjutkan'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
