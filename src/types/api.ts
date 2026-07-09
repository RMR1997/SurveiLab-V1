// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Session API
export interface CreateSessionResponse {
  sessionId: string;
  currentStep: number;
}

export interface GetSessionResponse {
  session: {
    id: string;
    currentStep: number;
    isCompleted: boolean;
    profile: {
      ageRange: string;
      occupation: string;
      location: string;
      techSavviness: number;
    } | null;
    responses: Array<{
      ideaId: string;
      problemSeverity: number;
      experienceType: string;
      usefulness: number;
      usageIntent: string;
      urgency: number;
      npsScore: number;
      conceptClarity: string;
    }>;
    finalChoice: {
      firstChoiceId: string;
      secondChoiceId: string | null;
      reason: string;
    } | null;
    feedback: {
      mostImportantFeature: string;
      biggestConcern: string;
      otherIdeas: string | null;
    } | null;
  };
}

// Analytics types
export interface DashboardMetrics {
  totalResponses: number;
  completionRate: number;
  avgCompletionTime: number;
  ideaRankings: IdeaRanking[];
  demographics: DemographicsData;
  hourlyResponses: HourlyDataPoint[];
}

export interface IdeaRanking {
  ideaId: string;
  ideaName: string;
  problemSeverity: number;
  usefulness: number;
  urgency: number;
  nps: number;
  finalChoiceCount: number;
  finalChoicePercentage: number;
  compositeScore: number;
}

export interface DemographicsData {
  byAge: Record<string, number>;
  byOccupation: Record<string, number>;
  byLocation: Record<string, number>;
}

export interface HourlyDataPoint {
  hour: string;
  count: number;
}

export interface ExportData {
  sessions: ExportedSession[];
  generatedAt: string;
}

export interface ExportedSession {
  sessionId: string;
  createdAt: string;
  completedAt: string | null;
  profile: {
    ageRange: string;
    occupation: string;
    location: string;
    techSavviness: number;
  } | null;
  ideaResponses: Array<{
    ideaName: string;
    problemSeverity: number;
    experienceType: string;
    usefulness: number;
    usageIntent: string;
    urgency: number;
    npsScore: number;
    conceptClarity: string;
  }>;
  finalChoice: {
    firstChoice: string;
    secondChoice: string | null;
    reason: string;
  } | null;
  feedback: {
    mostImportantFeature: string;
    biggestConcern: string;
    otherIdeas: string | null;
  } | null;
}
