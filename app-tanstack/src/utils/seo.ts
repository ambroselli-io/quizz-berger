import candidatesData from '~/shared/candidates-answers.json';
import { candidateSlugMap as lightCandidateSlugMap, quizz, type CandidateSlugEntry as LightCandidateSlugEntry } from './seo-light';

export * from './seo-light';

// --- Candidates with their answers ---

export interface CandidateSlugEntry extends LightCandidateSlugEntry {
  answers: Array<{ themeId: string; questionId: string; answerIndex: number }>;
}

const answersById = new Map(candidatesData.map((c) => [c.id, c.answers]));

export const candidateSlugMap: CandidateSlugEntry[] = lightCandidateSlugMap.map((c) => ({
  ...c,
  answers: answersById.get(c.id) ?? [],
}));

export function getCandidateBySlug(slug: string): CandidateSlugEntry | undefined {
  return candidateSlugMap.find((c) => c.slug === slug);
}

// --- Helper: how many candidates picked each answer of a question ---

/**
 * Counts, per answer index, how many candidates chose it. Lets an article quote a
 * split ("14 des 26 répondent que...") without hard-coding a number that goes stale
 * the next time a candidate answer is corrected.
 */
export function getAnswerDistribution(questionId: string): number[] {
  const question = quizz.flatMap((t) => t.questions).find((q) => q._id === questionId);
  if (!question) return [];
  const counts = new Array<number>(question.answers.length).fill(0);
  for (const candidate of candidateSlugMap) {
    const answer = candidate.answers.find((a) => a.questionId === questionId);
    if (answer && counts[answer.answerIndex] !== undefined) counts[answer.answerIndex] += 1;
  }
  return counts;
}

// --- Helper: get candidate answer text for a question ---

export function getCandidateAnswerForQuestion(
  candidateAnswers: Array<{ themeId: string; questionId: string; answerIndex: number }>,
  questionId: string,
  questionAnswers: string[],
): string | null {
  const answer = candidateAnswers.find((a) => a.questionId === questionId);
  if (answer === undefined) return null;
  return questionAnswers[answer.answerIndex] || null;
}

export { candidatesData };
