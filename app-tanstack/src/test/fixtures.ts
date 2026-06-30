import candidatesData from '@app/shared/candidates-answers.json';
import type { Candidate, Answer } from '@app/types/quizz';

const allCandidates = candidatesData as unknown as Candidate[];

// Pin one candidate as the "test user". Their own answers feed back as the
// userAnswers in tests, so the algorithm should rank them at 100% on every theme.
// Picking the first candidate alphabetically for stability.
export const pinnedCandidate = allCandidates[0];

export const pinnedUserAnswers: Answer[] = pinnedCandidate.answers.map((a) => ({
  themeId: a.themeId,
  questionId: a.questionId,
  answerIndex: a.answerIndex,
}));

export const allTestCandidates = allCandidates;

// Slim shape returned by /answer/random/for-onboarding for the Home page.
export const slimOnboardingPodium = [
  { pseudos: [pinnedCandidate.pseudo], pictures: [pinnedCandidate.picture], colors: [pinnedCandidate.color], height: 100, percent: 100 },
  { pseudos: ['Other Candidate'], pictures: ['candidates/other.png'], colors: ['#666666'], height: 60, percent: 60 },
];

export const slimOnboardingUser = { pseudo: pinnedCandidate.pseudo, color: pinnedCandidate.color };
