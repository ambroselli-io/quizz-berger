import { Answer, User } from "@prisma/client";

export type PrismaAnswer = Answer;

export type FriendAnswer = {
  id: User["id"];
  pseudo: User["pseudo"];
  isCandidate: User["isCandidate"];
  themes: User["themes"];
  answers: Array<Answer>;
};

export type StaticAnswer = {
  themeId: string;
  questionId: string;
  answerIndex: number;
};

export type CandidateAnswer = {
  id: string;
  pseudo: string;
  picture: string;
  color: string;
  isCandidate: boolean;
  themes: Array<string>;
  answers: Array<StaticAnswer>;
};

export type UserAnswerWithScoreLine = Answer & {
  scoreLine: Array<number>;
};

export type UserAnswerWithScore = UserAnswerWithScoreLine & {
  score: number;
};

export type UserAnswerWithScorePerTheme = {
  themeId: string;
  score: number;
  numberOfAnswers: number;
};

export type UserAnswerWithScorePerThemeAndMax = CandidateAnswer & {
  scorePerThemes: Array<{
    themeId: string;
    score: number;
    percent: number;
    max: number;
  }>;
  total: number;
  totalMax: number;
};

export type MinimalUserAnswerWithScorePerThemeAndMax = {
  id: UserAnswerWithScorePerThemeAndMax["id"];
  pseudo: UserAnswerWithScorePerThemeAndMax["pseudo"];
  picture: UserAnswerWithScorePerThemeAndMax["picture"];
  color: UserAnswerWithScorePerThemeAndMax["color"];
  total: UserAnswerWithScorePerThemeAndMax["total"];
  totalMax: UserAnswerWithScorePerThemeAndMax["totalMax"];
};

export type PodiumData = MinimalUserAnswerWithScorePerThemeAndMax & {
  pseudos: Array<MinimalUserAnswerWithScorePerThemeAndMax["pseudo"]>;
  pictures: Array<MinimalUserAnswerWithScorePerThemeAndMax["picture"]>;
  colors: Array<MinimalUserAnswerWithScorePerThemeAndMax["color"]>;
};

export type PodiumDataWithPercentAndHeightAndHighest = PodiumData & {
  highest: number;
  percent: number;
  height: number;
};
