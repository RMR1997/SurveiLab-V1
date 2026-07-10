"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { useSurveySession } from '@/hooks/use-survey-session'
import { ageRangeOptions, occupationOptions, provinceOptions } from '@/data/questions'
import { ProfileInput, profileSchema } from '@/lib/validation'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { session, isInitialized, saveProfile } = useSurveySession()
  
  const [formData, setFormData] = useState<Partial<ProfileInput>>({
    ageRange: undefined,
    occupation: undefined,
    location: '',
    techSavviness: 3,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Tunggu sampai localStorage selesai di-load
    if (!isInitialized) return
    
    if (!session.sessionId) {
      router.push('/')
      return
    }
  }, [session.sessionId, isInitialized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const result = profileSchema.safeParse(formData)
    if (!result.success) {
      const error = result.error.errors[0]
      toast.error(error.message)
      return
    }

    setIsSubmitting(true)
    const success = await saveProfile(result.data)
    setIsSubmitting(false)
    
    if (success) {
      router.push('/survey/concept/produsen-nusantara')
    } else {
      toast.error('Gagal menyimpan profil. Silakan coba lagi.')
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl">
        <CardContent className="p-5 sm:p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <User className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Profil Responden</h1>
            <p className="text-muted-foreground">
              Ceritakan sedikit tentang diri Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age Range */}
            <div className="space-y-2">
              <Label htmlFor="ageRange">Rentang Usia</Label>
              <Select
                value={formData.ageRange}
                onValueChange={(value) => setFormData({ ...formData, ageRange: value as any })}
              >
                <SelectTrigger id="ageRange">
                  <SelectValue placeholder="Pilih rentang usia" />
                </SelectTrigger>
                <SelectContent>
                  {ageRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label htmlFor="occupation">Pekerjaan</Label>
              <Select
                value={formData.occupation}
                onValueChange={(value) => setFormData({ ...formData, occupation: value as any })}
              >
                <SelectTrigger id="occupation">
                  <SelectValue placeholder="Pilih pekerjaan" />
                </SelectTrigger>
                <SelectContent>
                  {occupationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Domisili (Provinsi)</Label>
              <Select
                value={formData.location}
                onValueChange={(value) => setFormData({ ...formData, location: value })}
              >
                <SelectTrigger id="location">
                  <SelectValue placeholder="Pilih provinsi domisili" />
                </SelectTrigger>
                <SelectContent>
                  {provinceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tech Savviness */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Tingkat Penggunaan Teknologi</Label>
                <span className="text-sm font-medium text-primary">
                  {formData.techSavviness}/5
                </span>
              </div>
              <Slider
                value={[formData.techSavviness || 3]}
                onValueChange={([value]) => setFormData({ ...formData, techSavviness: value })}
                min={1}
                max={5}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Sangat rendah</span>
                <span>Sangat tinggi</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Menyimpan...' : 'Lanjutkan'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
