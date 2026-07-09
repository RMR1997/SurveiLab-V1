"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, Lightbulb, Users, BarChart3, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { useSurveySession } from '@/hooks/use-survey-session'
import { getAllIdeas } from '@/data/ideas'

export default function LandingPage() {
  const router = useRouter()
  const { session, createSession, resetSession } = useSurveySession()
  const ideas = getAllIdeas()

  useEffect(() => {
    // Reset session on landing page to start fresh
    if (session.sessionId && !session.isCompleted) {
      // Optionally restore or reset based on your needs
    }
  }, [])

  const handleStart = async () => {
    resetSession()
    const sessionId = await createSession()
    if (sessionId) {
      router.push('/survey/intro')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <Container size="large" className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Platform Validasi Ide No. 1 di Indonesia</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            Bantu Kami Memilih{' '}
            <span className="text-gradient">Startup Terbaik</span>
            <br className="hidden sm:block" />
            untuk Indonesia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Kami punya 5 ide startup yang ingin membantu masyarakat Indonesia. 
            Pendapat Anda sangat berharga untuk menentukan ide mana yang akan kami wujudkan terlebih dahulu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              onClick={handleStart}
              className="text-lg px-8 h-14 rounded-xl gradient-btn group"
            >
              Mulai Survey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-sm text-muted-foreground">
              ⏱️ Hanya 3-5 menit • Tidak ada jawaban salah
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Lightbulb, title: "5 Ide Startup", desc: "Konsep yang telah dikembangkan" },
              { icon: Users, title: "Untuk Masyarakat", desc: "Solusi nyata permasalahan Indonesia" },
              { icon: BarChart3, title: "Data-Driven", desc: "Keputusan berdasarkan pendapat Anda" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
              >
                <feature.icon className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Ideas Preview Section */}
      <section className="py-16 bg-white/50 dark:bg-slate-900/50">
        <Container size="large">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Apa yang Akan Anda Nilai?
            </h2>
            <p className="text-muted-foreground">
              5 platform inovatif yang siap membantu berbagai segmen masyarakat
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: idea.colorPrimary }}
                >
                  {idea.name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg mb-2">{idea.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{idea.tagline}</p>
                <p className="text-xs text-muted-foreground/70 line-clamp-2">
                  {idea.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Keresahan Section */}
      <section className="py-16">
        <Container size="large">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-medium mb-4">
              <span>❤️</span>
              <span>Cerita di Balik Platform Ini</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Kenapa Gue Bikin Semua Ini?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bukan sekadar ide bisnis — ini keresahan nyata yang gue lihat dan rasakan sendiri di sekitar gue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ideas.filter(idea => idea.motivation).map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-border/50 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ backgroundColor: idea.colorPrimary }}
                  >
                    {idea.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold">{idea.name}</h3>
                    <p className="text-xs text-muted-foreground">{idea.tagline}</p>
                  </div>
                </div>

                {idea.motivation && (
                  <div className="flex gap-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                    <span className="flex-shrink-0">❤️</span>
                    <div>
                      <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">Keresahan</p>
                      <p className="text-xs text-rose-700/80 dark:text-rose-300/80 leading-relaxed">{idea.motivation}</p>
                    </div>
                  </div>
                )}

                {idea.benefits && (
                  <div className="flex gap-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                    <span className="flex-shrink-0">📈</span>
                    <div>
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Potensi</p>
                      <p className="text-xs text-emerald-700/80 dark:text-emerald-300/80 leading-relaxed">{idea.benefits}</p>
                    </div>
                  </div>
                )}

                {idea.challenges && (
                  <div className="flex gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                    <span className="flex-shrink-0">⚠️</span>
                    <div>
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Tantangan</p>
                      <p className="text-xs text-amber-700/80 dark:text-amber-300/80 leading-relaxed">{idea.challenges}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container size="small" className="text-center">
          <h2 className="text-2xl font-bold mb-4">Siap untuk Membantu?</h2>
          <p className="text-muted-foreground mb-6">
            Setiap pendapat Anda sangat berarti untuk masa depan startup Indonesia.
          </p>
          <Button size="lg" onClick={handleStart} className="rounded-xl px-8">
            Mulai Survey Sekarang
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
                <Container className="text-center text-sm text-muted-foreground">
          <p>© 2024 SurveiLab. Built with care for Indonesia.</p>
          <nav className="mt-2 flex justify-center space-x-4">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </nav>
        </Container>
      </footer>
    </div>
  )
}
