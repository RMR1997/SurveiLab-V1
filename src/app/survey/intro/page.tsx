"use client"

import { useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Shield, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useSurveySession } from '@/hooks/use-survey-session'

import { Loader2 } from 'lucide-react'

export default function IntroPage() {
  const router = useRouter()
  const { session, isInitialized } = useSurveySession()

  useEffect(() => {
    // Wait until localStorage is initialized
    if (!isInitialized) return;

    // If there is no active session, navigate back to home with a gentle message instead of a hard redirect to avoid loops
    if (!session.sessionId) {
      toast.error("Sesi tidak ditemukan. Silakan mulai kembali dari halaman utama.")
      router.replace('/');
      return;
    }
  }, [session.sessionId, isInitialized])

  const handleContinue = () => {
    router.push('/survey/profile')
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          <span>Selamat Datang!</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold">
          Mari Berkenalan Terlebih Dahulu
        </h1>
        
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          Terima kasih telah meluangkan waktu untuk membantu kami. Survei ini akan membantu kami menentukan ide startup mana yang paling bermanfaat untuk masyarakat Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: Clock,
            title: "3-5 Menit",
            desc: "Waktu yang dibutuhkan untuk menyelesaikan survei"
          },
          {
            icon: Shield,
            title: "Anonim & Aman",
            desc: "Jawaban Anda sepenuhnya rahasia dan tidak diperjualbelikan"
          },
          {
            icon: Sparkles,
            title: "5 Ide Startup",
            desc: "Nilai konsep dan berikan masukan terbaik Anda"
          }
        ].map((item, index) => (
          <Card key={index} className="border-0 shadow-sm bg-white/70 dark:bg-slate-800/70 backdrop-blur">
            <CardContent className="p-5 sm:p-6 text-center">
              <item.icon className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Apa yang Perlu Anda Lakukan:</h3>
          <ol className="space-y-3 text-sm">
            {[
              "Isi profil singkat tentang diri Anda",
              "Tinjau dan nilai 5 ide startup yang kami ajukan",
              "Pilih 1 ide terbaik menurut Anda",
              "Berikan saran dan masukan tambahan"
            ].map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <p className="text-sm text-muted-foreground">
          Dengan melanjutkan, Anda menyetujui penggunaan data untuk penelitian ini.
        </p>
        <Button 
          size="lg" 
          onClick={handleContinue}
          className="w-full sm:w-auto rounded-xl"
        >
          Lanjutkan
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )
}
