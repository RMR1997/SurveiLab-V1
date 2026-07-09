"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Heart, RotateCcw, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useSurveySession } from '@/hooks/use-survey-session'

export default function ThankYouPage() {
  const router = useRouter()
  const { session } = useSurveySession()

  useEffect(() => {
    // Optionally track completion
  }, [])

  const handleRestart = () => {
    // Clear session but keep completed flag
    router.push('/')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SurveiLab',
          text: 'Saya baru saja membantu menentukan startup terbaik untuk Indonesia. Ikut berpendapat yuk!',
          url: window.location.origin,
        })
      } catch (err) {
        // User cancelled
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin)
      alert('Link disalin ke clipboard!')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <Card className="border-0 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl text-center max-w-lg w-full">
        <CardContent className="p-10">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-bold mb-4">Terima Kasih!</h1>
            <p className="text-muted-foreground text-lg mb-2">
              Pendapat Anda sangat berharga bagi kami.
            </p>
            <p className="text-muted-foreground">
              Data yang Anda berikan akan membantu kami menentukan ide startup terbaik yang akan diwujudkan untuk masyarakat Indonesia.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <div className="p-4 rounded-xl bg-primary/5 dark:bg-primary/10 mb-8">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-medium">Kontribusi Anda Membuat Perbedaan</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={handleShare}
                className="rounded-xl gap-2"
              >
                <Share2 className="w-4 h-4" />
                Bagikan Survey
              </Button>
              <Button
                onClick={handleRestart}
                className="rounded-xl gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Mulai Lagi
              </Button>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-muted-foreground mt-8"
          >
            SurveiLab © 2024
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
