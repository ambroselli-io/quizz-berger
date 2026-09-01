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
  getCandidateParty,
  themeSlugMap,
  type CandidateSlugEntry,
} from '@app/utils/seo';
import { gagnaitThemeId } from '@app/utils/quizz';
import type { QuizzQuestion } from '@app/types/quizz';

const MAX_SCORE_PER_QUESTION = 5;

// The "gagnait" answers of a candidate are generated from this very proximity, so counting them
// would feed the result back into its own input.
const allQuestions: QuizzQuestion[] = themeSlugMap
  .filter((theme) => theme.themeId !== gagnaitThemeId)
  .flatMap((theme) => theme.questions);

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
    .sort(
      (a, b) =>
        // Equal percentages are common, and file order is a meaningless tiebreak:
        // more identical answers means closer, then alphabetical for full determinism.
        b.percent - a.percent ||
        b.sameAnswers - a.sameAnswers ||
        a.pseudo.localeCompare(b.pseudo, 'fr'),
    );
}

// --- HTML renderers for the blog articles ---
//
// The "{candidat}-droite-ou-gauche" articles used to hard-code these figures as prose.
// Every added question or candidate silently falsified them, twice in production, so
// they are rendered from the data instead. Article template strings call these directly.

/**
 * The ranked list of the closest candidates, as an HTML <ul>.
 * Order, percentages and counts always reflect the current data.
 */
export function proximityListHtml(candidateSlug: string, count = 6): string {
  const items = getCandidateProximityRanking(candidateSlug)
    .slice(0, count)
    .map((other, index) => {
      const party = getCandidateParty(other.slug);
      const label = party ? ` (${party})` : '';
      // "de proximité" spells out the unit once, then the column reads as a list.
      const unit = index === 0 ? ' de proximité' : '';
      return `<li><a href="/candidat/${other.slug}">${other.pseudo}</a>${label} — ${other.percent} %${unit}, ${other.sameAnswers} réponses identiques.</li>`;
    })
    .join('\n');
  return `<ul>\n${items}\n</ul>`;
}

/** A single inline mention: <a href="/candidat/x">Nom</a> (43 %). */
export function proximityLinkHtml(candidateSlug: string, otherSlug: string): string {
  const other = getCandidateProximityRanking(candidateSlug).find((c) => c.slug === otherSlug);
  if (!other) return '';
  return `<a href="/candidat/${other.slug}">${other.pseudo}</a> (${other.percent} %)`;
}

/** The N most distant candidates, closest-of-the-far first, as inline mentions. */
export function furthestLinksHtml(candidateSlug: string, count = 3): string {
  return getCandidateProximityRanking(candidateSlug)
    .slice(-count)
    .reverse()
    .map((other) => proximityLinkHtml(candidateSlug, other.slug))
    .join(', ');
}

/** Percentage between two candidates, for a sentence that needs the bare number. */
export function proximityPercent(candidateSlug: string, otherSlug: string): number {
  return getCandidateProximityRanking(candidateSlug).find((c) => c.slug === otherSlug)?.percent ?? 0;
}

/** Identical answers between two candidates. */
export function proximitySameAnswers(candidateSlug: string, otherSlug: string): number {
  return getCandidateProximityRanking(candidateSlug).find((c) => c.slug === otherSlug)?.sameAnswers ?? 0;
}

/** 1-based position of `otherSlug` in `candidateSlug`'s ranking, rendered "1er" / "8e". */
export function proximityRank(candidateSlug: string, otherSlug: string): string {
  const index = getCandidateProximityRanking(candidateSlug).findIndex((c) => c.slug === otherSlug);
  if (index < 0) return '';
  return index === 0 ? '1er' : `${index + 1}e`;
}
