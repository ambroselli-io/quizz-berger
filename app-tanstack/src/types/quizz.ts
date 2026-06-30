export interface QuizzQuestion {
  _id: string;
  fr: string;
  answers: string[];
  scores: number[][];
  help?: string;
}

export interface QuizzTheme {
  _id: string;
  fr: string;
  questions: QuizzQuestion[];
  backgroundColor?: string;
}

export interface Answer {
  userId?: string;
  themeId: string;
  questionId: string;
  answerIndex: number;
}

export interface User {
  _id?: string;
  pseudo?: string;
  password?: string;
  isPublic?: boolean;
  isLoggedIn?: boolean;
  friends?: string[];
  roles?: string[];
  color?: string;
  picture?: string;
}

export interface Candidate {
  _id: string;
  pseudo: string;
  picture?: string;
  color?: string;
  answers: Answer[];
  isCandidate?: boolean;
}

export interface ScorePerTheme {
  themeId: string;
  score: number;
  percent: number;
  max: number;
}

export interface PersonScore {
  _id: string;
  pseudo: string;
  picture?: string;
  color?: string;
  scorePerThemes?: ScorePerTheme[];
  total: number;
  totalMax: number;
  isCandidate?: boolean;
}

export interface PodiumStep {
  pseudos: string[];
  pictures: string[];
  colors: string[];
  height: number;
  percent: number;
  total?: number;
  totalMax?: number;
}
