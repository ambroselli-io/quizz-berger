/**
 * Candidate-to-candidate political proximity.
 *
 * Reuses the quiz scoring matrix instead of a plain "same answer / different
 * answer" count: `question.scores[a][b]` is how many points (0-5) an answer `b`
 * earns when the reference answer is `a`. The matrix is deliberately asymmetric
 * (it is authored as "user answer" x "candidate answer"), so a candidate pair
 * gets the average of both directions to keep proximity(A, B) === proximity(B, A).
 */

import {
  allComparisonPairs,
  candidateSlugMap,
  themeSlugMap,
  type CandidateSlugEntry,
} from '@app/utils/seo';
import type { QuizzQuestion } from '@app/types/quizz';

const MAX_SCORE_PER_QUESTION = 5;

const allQuestions: QuizzQuestion[] = themeSlugMap.flatMap((theme) => theme.questions);

// Curated pairs are not always alphabetical, so the /comparer slug is looked up
// instead of rebuilt, otherwise the link 404s.
const pairSlugByCandidates = new Map<string, string>(
  allComparisonPairs.map((pair) => [
    [pair.candidate1Slug, pair.candidate2Slug].sort().join('|'),
    pair.slug,
  ]),
);

export interface CandidateProximity {
  slug: string;
  pseudo: string;
  color: string;
  /** 0-100. Share of the maximum score the two candidates reach together. */
  percent: number;
  /** Number of questions where both picked the exact same answer. */
  sameAnswers: number;
  /** Number of questions counted (both answered, and not a mutual "no opinion"). */
  comparedQuestions: number;
  /** Canonical /comparer slug for the pair, alphabetical like allComparisonPairs. */
  pairSlug: string;
}

function answerIndexByQuestion(candidate: CandidateSlugEntry): Map<string, number> {
  const map = new Map<string, number>();
  for (const answer of candidate.answers) map.set(answer.questionId, answer.answerIndex);
  return map;
}

export function getProximityBetween(
  candidate1: CandidateSlugEntry,
  candidate2: CandidateSlugEntry,
): { percent: number; sameAnswers: number; comparedQuestions: number } {
  const indexes1 = answerIndexByQuestion(candidate1);
  const indexes2 = answerIndexByQuestion(candidate2);

  let score = 0;
  let maxScore = 0;
  let sameAnswers = 0;
  let comparedQuestions = 0;

  for (const question of allQuestions) {
    const index1 = indexes1.get(question._id);
    const index2 = indexes2.get(question._id);
    if (index1 === undefined || index2 === undefined) continue;

    const line1 = question.scores[index1];
    const line2 = question.scores[index2];
    if (!line1 || !line2) continue;

    // Both answered "ça ne m'intéresse pas": no political information, skip it.
    if (index1 === index2 && !line1.some(Boolean)) continue;

    score += (line1[index2] + line2[index1]) / 2;
    maxScore += MAX_SCORE_PER_QUESTION;
    comparedQuestions += 1;
    if (index1 === index2) sameAnswers += 1;
  }

  return {
    percent: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
    sameAnswers,
    comparedQuestions,
  };
}

/** Every other candidate, sorted from the closest to the most distant. */
export function getCandidateProximityRanking(candidateSlug: string): CandidateProximity[] {
  const candidate = candidateSlugMap.find((c) => c.slug === candidateSlug);
  if (!candidate) return [];

  return candidateSlugMap
    .filter((other) => other.slug !== candidateSlug)
    .map((other) => {
      const { percent, sameAnswers, comparedQuestions } = getProximityBetween(candidate, other);
      const key = [candidate.slug, other.slug].sort().join('|');
      return {
        slug: other.slug,
        pseudo: other.pseudo,
        color: other.color,
        percent,
        sameAnswers,
        comparedQuestions,
        pairSlug: pairSlugByCandidates.get(key) || `${candidate.slug}-vs-${other.slug}`,
      };
    })
    .sort((a, b) => b.percent - a.percent);
}
