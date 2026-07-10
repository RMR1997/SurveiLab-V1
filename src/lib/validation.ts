import { z } from 'zod'

// Profile Validation
export const profileSchema = z.object({
  ageRange: z.enum([
    'UNDER_18', 
    'AGE_18_24', 
    'AGE_25_34', 
    'AGE_35_44', 
    'AGE_45_54', 
    'AGE_55_64', 
    'ABOVE_65'
  ], {
    required_error: 'Pilih rentang usia Anda',
  }),
  occupation: z.enum([
    'STUDENT', 
    'EMPLOYEE_PRIVATE', 
    'EMPLOYEE_GOVERNMENT', 
    'ENTREPRENEUR', 
    'FREELANCER', 
    'UNEMPLOYED', 
    'RETIRED', 
    'OTHER'
  ], {
    required_error: 'Pilih pekerjaan Anda',
  }),
  location: z.string().min(2, 'Masukkan domisili Anda').max(100, 'Maksimal 100 karakter'),
  techSavviness: z.number().min(1).max(5, 'Pilih level 1-5'),
})

// Idea Response Validation
export const ideaResponseSchema = z.object({
  ideaId: z.string().min(1, 'ID ide tidak valid'),
  problemSeverity: z.number().min(1).max(5, 'Pilih skala 1-5'),
  experienceType: z.enum([
    'PERSONAL', 
    'CLOSE_CONTACT', 
    'HEARD_ONLY', 
    'NEVER'
  ], {
    required_error: 'Pilih salah satu opsi',
  }),
  usefulness: z.number().min(1).max(5, 'Pilih skala 1-5'),
  usageIntent: z.enum([
    'DEFINITELY_YES', 
    'PROBABLY_YES', 
    'NOT_SURE', 
    'NO'
  ], {
    required_error: 'Pilih niat penggunaan',
  }),
  urgency: z.number().min(1).max(5, 'Pilih skala 1-5'),
  npsScore: z.number().min(0).max(10, 'Pilih skala 0-10'),
  conceptClarity: z.enum([
    'VERY_HELPFUL', 
    'SOMEWHAT_HELPFUL', 
    'NOT_VERY_HELPFUL', 
    'NOT_HELPFUL'
  ], {
    required_error: 'Pilih tingkat kejelasan',
  }),
  customBehaviorAnswer: z.string().optional(),
})

// Final Choice Validation
export const finalChoiceSchema = z.object({
  firstChoiceId: z.string().min(1, 'Pilih ide terbaik menurut Anda'),
  secondChoiceId: z.string().optional(),
  reason: z.string()
    .min(10, 'Berikan alasan minimal 10 karakter')
    .max(500, 'Maksimal 500 karakter'),
})

// Feedback Validation
export const feedbackSchema = z.object({
  mostImportantFeature: z.string()
    .min(10, 'Minimal 10 karakter')
    .max(500, 'Maksimal 500 karakter'),
  biggestConcern: z.string()
    .min(10, 'Minimal 10 karakter')
    .max(500, 'Maksimal 500 karakter'),
  otherIdeas: z.string().max(500, 'Maksimal 500 karakter').optional(),
})

// Types
export type ProfileInput = z.infer<typeof profileSchema>
export type IdeaResponseInput = z.infer<typeof ideaResponseSchema>
export type FinalChoiceInput = z.infer<typeof finalChoiceSchema>
export type FeedbackInput = z.infer<typeof feedbackSchema>
