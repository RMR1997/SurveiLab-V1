import { SelectOption, LikertLabels } from '@/types/survey'

export const ageRangeOptions: SelectOption[] = [
  { value: 'UNDER_18', label: 'Di bawah 18 tahun' },
  { value: 'AGE_18_24', label: '18-24 tahun' },
  { value: 'AGE_25_34', label: '25-34 tahun' },
  { value: 'AGE_35_44', label: '35-44 tahun' },
  { value: 'AGE_45_54', label: '45-54 tahun' },
  { value: 'AGE_55_64', label: '55-64 tahun' },
  { value: 'ABOVE_65', label: 'Di atas 65 tahun' },
]

export const occupationOptions: SelectOption[] = [
  { value: 'STUDENT', label: 'Pelajar/Mahasiswa' },
  { value: 'EMPLOYEE_PRIVATE', label: 'Karyawan Swasta' },
  { value: 'EMPLOYEE_GOVERNMENT', label: 'PNS/BUMN' },
  { value: 'ENTREPRENEUR', label: 'Wirausaha' },
  { value: 'FREELANCER', label: 'Freelancer' },
  { value: 'UNEMPLOYED', label: 'Belum Bekerja' },
  { value: 'RETIRED', label: 'Pensiun' },
  { value: 'OTHER', label: 'Lainnya' },
]

export const experienceTypeOptions: SelectOption[] = [
  { value: 'PERSONAL', label: 'Saya pernah mengalami', description: 'Anda sendiri yang mengalami masalah ini' },
  { value: 'CLOSE_CONTACT', label: 'Orang terdekat pernah', description: 'Keluarga atau teman dekat Anda mengalaminya' },
  { value: 'HEARD_ONLY', label: 'Pernah mendengar', description: 'Anda tahu tentang masalah ini dari berita atau orang lain' },
  { value: 'NEVER', label: 'Belum pernah', description: 'Tidak familiar dengan masalah ini' },
]

export const usageIntentOptions: SelectOption[] = [
  { value: 'DEFINITELY_YES', label: 'Pasti', description: 'Saya akan langsung mendaftar jika tersedia' },
  { value: 'PROBABLY_YES', label: 'Mungkin', description: 'Saya tertarik dan akan mempertimbangkan' },
  { value: 'NOT_SURE', label: 'Belum yakin', description: 'Perlu informasi lebih lanjut' },
  { value: 'NO', label: 'Tidak', description: 'Ini bukan untuk saya' },
]

export const clarityLevelOptions: SelectOption[] = [
  { value: 'VERY_HELPFUL', label: 'Sangat membantu', description: 'Saya langsung paham konsepnya' },
  { value: 'SOMEWHAT_HELPFUL', label: 'Cukup membantu', description: 'Saya mengerti sebagian besar konsepnya' },
  { value: 'NOT_VERY_HELPFUL', label: 'Kurang membantu', description: 'Masih ada yang membingungkan' },
  { value: 'NOT_HELPFUL', label: 'Tidak membantu', description: 'Sulit memahami konsepnya' },
]

export const likertLabels: Record<string, LikertLabels> = {
  problemSeverity: {
    min: 'Sangat kecil',
    max: 'Sangat besar',
  },
  usefulness: {
    min: 'Tidak bermanfaat',
    max: 'Sangat bermanfaat',
  },
  urgency: {
    min: 'Tidak mendesak',
    max: 'Sangat mendesak',
  },
}

export const techSavvinessOptions = [
  { value: 1, label: 'Sangat rendah' },
  { value: 2, label: 'Rendah' },
  { value: 3, label: 'Sedang' },
  { value: 4, label: 'Tinggi' },
  { value: 5, label: 'Sangat tinggi' },
]
