// Enums
export type AgeRange = 
  | 'UNDER_18' 
  | 'AGE_18_24' 
  | 'AGE_25_34' 
  | 'AGE_35_44' 
  | 'AGE_45_54' 
  | 'AGE_55_64' 
  | 'ABOVE_65';

export type Occupation = 
  | 'STUDENT' 
  | 'EMPLOYEE_PRIVATE' 
  | 'EMPLOYEE_GOVERNMENT' 
  | 'ENTREPRENEUR' 
  | 'FREELANCER' 
  | 'UNEMPLOYED' 
  | 'RETIRED' 
  | 'OTHER';

export type ExperienceType = 
  | 'PERSONAL' 
  | 'CLOSE_CONTACT' 
  | 'HEARD_ONLY' 
  | 'NEVER';

export type UsageIntent = 
  | 'DEFINITELY_YES' 
  | 'PROBABLY_YES' 
  | 'NOT_SURE' 
  | 'NO';

export type ClarityLevel = 
  | 'VERY_HELPFUL' 
  | 'SOMEWHAT_HELPFUL' 
  | 'NOT_VERY_HELPFUL' 
  | 'NOT_HELPFUL';

// Main types
export interface StartupIdea {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  iconUrl?: string;
  mockupUrl?: string;
  colorPrimary: string;
  sortOrder: number;
  isActive: boolean;
  motivation?: string;
  benefits?: string;
  challenges?: string;
  customQuestion?: string;
  customOptions?: string[];
}

export interface RespondentProfile {
  ageRange: AgeRange;
  occupation: Occupation;
  location: string;
  techSavviness: number;
}

export interface IdeaResponse {
  ideaId: string;
  problemSeverity: number;
  experienceType: ExperienceType;
  usefulness: number;
  usageIntent: UsageIntent;
  urgency: number;
  npsScore: number;
  conceptClarity: ClarityLevel;
  customBehaviorAnswer?: string;
}

export interface FinalChoice {
  firstChoiceId: string;
  secondChoiceId?: string;
  reason: string;
}

export interface Feedback {
  mostImportantFeature: string;
  biggestConcern: string;
  otherIdeas?: string;
}

// Survey session state
export interface SurveySession {
  id: string;
  currentStep: number;
  isCompleted: boolean;
  profile?: RespondentProfile;
  responses: Record<string, IdeaResponse>;
  finalChoice?: FinalChoice;
  feedback?: Feedback;
}

// Survey progress
export interface SurveyProgress {
  currentStep: number;
  totalSteps: number;
  percentage: number;
  currentStepName: string;
}

// Option types for select/radio
export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface LikertLabels {
  min: string;
  max: string;
}
