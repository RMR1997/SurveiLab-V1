import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format number with Indonesian locale
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}

// Format percentage
export function formatPercent(num: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num / 100)
}

// Calculate weighted score for idea ranking
export function calculateIdeaScore(responses: {
  problemSeverity: number
  usefulness: number
  urgency: number
  npsScore: number
  usageIntent: string
  conceptClarity: string
}): number {
  const intentScores: Record<string, number> = {
    'DEFINITELY_YES': 5,
    'PROBABLY_YES': 4,
    'NOT_SURE': 2.5,
    'NO': 1,
  }
  
  const clarityScores: Record<string, number> = {
    'VERY_HELPFUL': 5,
    'SOMEWHAT_HELPFUL': 3.75,
    'NOT_VERY_HELPFUL': 2.5,
    'NOT_HELPFUL': 1,
  }

  // Weighted calculation (max score: 5.0)
  const weights = {
    problemSeverity: 0.20,
    usefulness: 0.20,
    urgency: 0.15,
    nps: 0.15, // normalized from 0-10
    intent: 0.15,
    clarity: 0.15,
  }

  const npsNormalized = responses.npsScore / 2 // 0-10 to 0-5
  const intentScore = intentScores[responses.usageIntent] || 2.5
  const clarityScore = clarityScores[responses.conceptClarity] || 2.5

  return (
    responses.problemSeverity * weights.problemSeverity +
    responses.usefulness * weights.usefulness +
    responses.urgency * weights.urgency +
    npsNormalized * weights.nps +
    intentScore * weights.intent +
    clarityScore * weights.clarity
  )
}

// Calculate NPS category
export function getNPSCategory(score: number): 'promoter' | 'passive' | 'detractor' {
  if (score >= 9) return 'promoter'
  if (score >= 7) return 'passive'
  return 'detractor'
}

// Generate session ID
export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Age range label mapping
export const ageRangeLabels: Record<string, string> = {
  'UNDER_18': 'Di bawah 18 tahun',
  'AGE_18_24': '18-24 tahun',
  'AGE_25_34': '25-34 tahun',
  'AGE_35_44': '35-44 tahun',
  'AGE_45_54': '45-54 tahun',
  'AGE_55_64': '55-64 tahun',
  'ABOVE_65': 'Di atas 65 tahun',
}

// Occupation label mapping
export const occupationLabels: Record<string, string> = {
  'STUDENT': 'Pelajar/Mahasiswa',
  'EMPLOYEE_PRIVATE': 'Karyawan Swasta',
  'EMPLOYEE_GOVERNMENT': 'PNS/BUMN',
  'ENTREPRENEUR': 'Wirausaha',
  'FREELANCER': 'Freelancer',
  'UNEMPLOYED': 'Belum Bekerja',
  'RETIRED': 'Pensiun',
  'OTHER': 'Lainnya',
}

// Experience type label mapping
export const experienceLabels: Record<string, string> = {
  'PERSONAL': 'Saya pernah mengalami',
  'CLOSE_CONTACT': 'Orang terdekat pernah',
  'HEARD_ONLY': 'Pernah mendengar',
  'NEVER': 'Belum pernah',
}

// Usage intent label mapping
export const usageIntentLabels: Record<string, string> = {
  'DEFINITELY_YES': 'Pasti akan menggunakan',
  'PROBABLY_YES': 'Mungkin akan menggunakan',
  'NOT_SURE': 'Belum yakin',
  'NO': 'Tidak akan menggunakan',
}

// Clarity level label mapping
export const clarityLabels: Record<string, string> = {
  'VERY_HELPFUL': 'Sangat membantu',
  'SOMEWHAT_HELPFUL': 'Cukup membantu',
  'NOT_VERY_HELPFUL': 'Kurang membantu',
  'NOT_HELPFUL': 'Tidak membantu',
}
