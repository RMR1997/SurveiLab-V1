"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, ArrowLeft, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useSurveySession } from '@/hooks/use-survey-session'
import { feedbackSchema } from '@/lib/validation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { getAllIdeas } from '@/data/ideas'

export default function FeedbackPage() {
  const router = useRouter()
  const { session, isInitialized, saveFeedback, goToStep } = useSurveySession()

  const ideas = getAllIdeas()
  const chosenIdea = ideas.find(i => i.id === session.finalChoice?.firstChoiceId)
  const chosenIdeaName = chosenIdea?.name || 'platform pilihan Anda'
  const chosenIdeaId = chosenIdea?.id || ''

  const getChallengeQuestion = (ideaId: string, ideaName: string) => {
    const challengePrompts: Record<string, string> = {
      '1': `Menurut Anda, apa tantangan atau risiko terbesar yang perlu diantisipasi oleh ${ideaName} (misalnya: masalah logistik pengiriman, jaminan kesegaran barang, atau sistem pembayaran aman)?`,
      '2': `Menurut Anda, apa tantangan atau risiko terbesar yang perlu diantisipasi oleh ${ideaName} (misalnya: keamanan/keselamatan mahasiswa, komitmen kehadiran pekerja, atau kualitas hasil kerja harian)?`,
      '3': `Menurut Anda, apa tantangan atau risiko terbesar yang perlu diantisipasi oleh ${ideaName} (misalnya: risiko hukum UU ITE bagi pelapor, maraknya laporan palsu/spam, atau tanggapan dari pemerintah terkait)?`,
      '4': `Menurut Anda, apa tantangan atau risiko terbesar yang perlu diantisipasi oleh ${ideaName} (misalnya: perubahan aturan kepabeanan negara tujuan, jaminan standar mutu produk lokal, atau kendala bahasa dengan buyer asing)?`,
      '5': `Menurut Anda, apa tantangan atau risiko terbesar yang perlu diantisipasi oleh ${ideaName} (misalnya: perubahan syarat visa/beasiswa yang mendadak, kesulitan memahami istilah dokumen hukum, atau pembaharuan data berkala)?`,
    }
    return challengePrompts[ideaId] || `Menurut Anda, apa tantangan atau risiko terbesar yang perlu diantisipasi oleh platform ${ideaName}?`
  }
  
  const [formData, setFormData] = useState({
    mostImportantFeature: '',
    biggestConcern: '',
    otherIdeas: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Tunggu sampai localStorage selesai di-load
    if (!isInitialized) return
    
    if (!session.sessionId) {
      router.push('/')
      return
    }
    if (8 > session.currentStep) {
      goToStep(8)
    }
  }, [session.sessionId, isInitialized])

  const handleSubmit = async () => {
    const result = feedbackSchema.safeParse(formData)
    if (!result.success) {
      const error = result.error.errors[0]
      toast.error(error.message)
      return
    }

    setIsSubmitting(true)
    const success = await saveFeedback({
      mostImportantFeature: result.data.mostImportantFeature,
      biggestConcern: result.data.biggestConcern,
      otherIdeas: result.data.otherIdeas,
    })
    setIsSubmitting(false)
    
    if (success) {
      router.push('/survey/thank-you')
    } else {
      toast.error('Gagal menyimpan. Silakan coba lagi.')
    }
  }

  const handleBack = () => {
    router.push('/survey/final-choice')
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
            <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Masukan Tambahan</h1>
            <p className="text-muted-foreground">
              Pendapat Anda sangat berharga untuk pengembangan platform ini
            </p>
          </div>

          <div className="space-y-6">
            {/* Most Important Feature */}
            <div className="space-y-2">
              <Label htmlFor="mostImportantFeature">
                Solusi utama apa yang wajib ada di <span className="font-semibold text-primary">{chosenIdeaName}</span> agar masalah Anda benar-benar teratasi? <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="mostImportantFeature"
                value={formData.mostImportantFeature}
                onChange={(e) => setFormData({ ...formData, mostImportantFeature: e.target.value })}
                placeholder="Fitur atau fungsionalitas apa yang wajib ada?"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.mostImportantFeature.length}/500
              </p>
            </div>

            {/* Biggest Concern */}
            <div className="space-y-2">
              <Label htmlFor="biggestConcern">
                {getChallengeQuestion(chosenIdeaId, chosenIdeaName)} <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="biggestConcern"
                value={formData.biggestConcern}
                onChange={(e) => setFormData({ ...formData, biggestConcern: e.target.value })}
                placeholder="Apa yang perlu diperhatikan atau risiko yang mungkin terjadi?"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.biggestConcern.length}/500
              </p>
            </div>

            {/* Other Ideas */}
            <div className="space-y-2">
              <Label htmlFor="otherIdeas">
                Punya ide platform digital lain yang menurut Anda sangat mendesak untuk Indonesia saat ini? Bagikan dengan kami! (Opsional)
              </Label>
              <Textarea
                id="otherIdeas"
                value={formData.otherIdeas}
                onChange={(e) => setFormData({ ...formData, otherIdeas: e.target.value })}
                placeholder="Ceritakan ide startup lain yang ingin Anda lihat diwujudkan..."
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground text-right">
                {formData.otherIdeas.length}/500
              </p>
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
              {isSubmitting ? 'Mengirim...' : 'Kirim Jawaban'}
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
