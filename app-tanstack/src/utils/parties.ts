/**
 * Party-level view over the candidate data.
 *
 * `candidates-answers.json` knows nothing about parties — the mapping lives in
 * `content/parties.ts`. Everything here is derived: a party's positions are its
 * candidates' answers, and party-to-party proximity reuses `getProximityBetween`
 * so the numbers on /parti stay consistent with those on /candidat and /comparer.
 */

import { parties, type Party } from '@app/content/parties';
import {
  candidateSlugMap,
  themeSlugMap,
  getQuestionSlugById,
  getCanonicalPairSlug,
  type CandidateSlugEntry,
  type ThemeSlugEntry,
} from '@app/utils/seo';
import { getProximityBetween } from '@app/utils/proximity';
import type { QuizzQuestion } from '@app/types/quizz';

export interface PartyEntry extends Party {
  candidates: CandidateSlugEntry[];
}

function resolve(party: Party): PartyEntry {
  const candidates = party.candidateSlugs
    .map((slug) => candidateSlugMap.find((c) => c.slug === slug))
    .filter((c): c is CandidateSlugEntry => Boolean(c));
  return { ...party, candidates };
}

export const partyList: PartyEntry[] = parties.map(resolve).filter((p) => p.candidates.length > 0);

export const partiesCount = partyList.length;

export function getPartyBySlug(slug: string): PartyEntry | undefined {
  return partyList.find((p) => p.slug === slug);
}

export function getPartyForCandidate(candidateSlug: string): PartyEntry | undefined {
  return partyList.find((p) => p.candidateSlugs.includes(candidateSlug));
}

/** Roster members who belong to no party of the registry (one-person movements, sans étiquette). */
export const unaffiliatedCandidates: CandidateSlugEntry[] = candidateSlugMap.filter(
  (c) => !getPartyForCandidate(c.slug),
);

// --- Themes that get their own /parti/{slug}/{theme} page ---

/**
 * Curated from the Google autocomplete tail of "programme {parti} 2027" ("... retraite",
 * "... immigration", "... pouvoir d'achat"). Deliberately not every theme: the site already
 * lost ~300 pairwise /comparer pages to "Crawled - currently not indexed" in July 2026, so
 * only themes people actually append to a party name get a page.
 */
const PARTY_THEME_LABELS: Record<string, { seo: string; prose: string }> = {
  // `seo` is the word people actually append to a party name in Google ("programme RN 2027
  // retraite"); `prose` is the same theme written as a French noun phrase for the sentences.
  'theme-travail-chomage-retraite-2027': {
    seo: 'retraites, travail et chômage',
    prose: 'les retraites, le travail et le chômage',
  },
  'theme-2027-immigration': { seo: 'immigration', prose: "l'immigration" },
  'theme-2027-police': {
    seo: 'sécurité, police et justice',
    prose: 'la sécurité, la police et la justice',
  },
  'theme-2027-sante': { seo: 'santé', prose: 'la santé' },
  'theme-2027-fiscal': { seo: 'impôts et fiscalité', prose: 'les impôts et la fiscalité' },
  'theme-2027-pouvoir-achat': { seo: "pouvoir d'achat", prose: "le pouvoir d'achat" },
  'theme-2027-climat': {
    seo: 'climat, énergie et écologie',
    prose: "le climat, l'énergie et l'écologie",
  },
  'theme-2027-economie': { seo: 'économie et industrie', prose: "l'économie et l'industrie" },
  'theme-2027-logement': { seo: 'logement', prose: 'le logement' },
  'theme-union-europeenne-2027': { seo: 'Europe', prose: "l'Union européenne" },
};

export const partyThemes: ThemeSlugEntry[] = Object.keys(PARTY_THEME_LABELS)
  .map((id) => themeSlugMap.find((t) => t.themeId === id))
  .filter((t): t is ThemeSlugEntry => Boolean(t));

export function themeSeoLabel(theme: ThemeSlugEntry): string {
  return PARTY_THEME_LABELS[theme.themeId]?.seo || theme.fr.toLowerCase();
}

export function themeProseLabel(theme: ThemeSlugEntry): string {
  return PARTY_THEME_LABELS[theme.themeId]?.prose || theme.fr.toLowerCase();
}

// --- French wording helpers ---

/** "Éric Zemmour" -> "d'Éric Zemmour", "Marine Le Pen" -> "de Marine Le Pen". */
export function deName(name: string): string {
  const first = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')[0]?.toLowerCase() || '';
  return 'aeiou'.includes(first) ? `d'${name}` : `de ${name}`;
}

/** Upper-cases the first letter so "le RN" can start a sentence or a heading. */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** "Marine Le Pen, Jordan Bardella" -> "de Marine Le Pen et de Jordan Bardella". */
export function deNameList(names: string[]): string {
  const parts = names.map(deName);
  if (parts.length <= 1) return parts[0] || '';
  return `${parts.slice(0, -1).join(', ')} et ${parts[parts.length - 1]}`;
}

export function partyHasThemePage(party: PartyEntry, themeSlug: string): boolean {
  return Boolean(party.hasThemePages) && partyThemes.some((t) => t.slug === themeSlug);
}

/** Every (party, theme) couple that must exist as a page — used by the sitemap. */
export const partyThemePages: Array<{ party: PartyEntry; theme: ThemeSlugEntry }> = partyList
  .filter((p) => p.hasThemePages)
  .flatMap((party) => partyThemes.map((theme) => ({ party, theme })));

// --- Positions ---

export interface PartyAnswer {
  candidate: CandidateSlugEntry;
  answerIndex: number;
  answerText: string;
}

export interface PartyQuestionPosition {
  question: QuizzQuestion;
  questionSlug?: string;
  answers: PartyAnswer[];
  /** True when every candidate of the party picked the same answer. */
  unanimous: boolean;
  /** Candidates outside the party who picked the same answer as the party's first candidate. */
  sharedWith: CandidateSlugEntry[];
}

function answerIndexOf(candidate: CandidateSlugEntry, questionId: string): number | undefined {
  return candidate.answers.find((a) => a.questionId === questionId)?.answerIndex;
}

export function getPartyPositions(
  party: PartyEntry,
  questions: QuizzQuestion[],
): PartyQuestionPosition[] {
  return questions.map((question) => {
    const answers: PartyAnswer[] = [];
    for (const candidate of party.candidates) {
      const answerIndex = answerIndexOf(candidate, question._id);
      if (answerIndex === undefined) continue;
      const answerText = question.answers[answerIndex];
      if (!answerText) continue;
      answers.push({ candidate, answerIndex, answerText });
    }

    const unanimous = answers.length > 1 && answers.every((a) => a.answerIndex === answers[0].answerIndex);

    const reference = answers[0]?.answerIndex;
    const sharedWith =
      reference === undefined
        ? []
        : candidateSlugMap.filter(
            (c) =>
              !party.candidateSlugs.includes(c.slug) &&
              answerIndexOf(c, question._id) === reference,
          );

    return {
      question,
      questionSlug: getQuestionSlugById(question._id),
      answers,
      unanimous,
      sharedWith,
    };
  });
}

// --- Party to party proximity ---

export interface PartyProximity {
  slug: string;
  name: string;
  shortName: string;
  color: string;
  /** 0-100, averaged over every candidate pair across the two parties. */
  percent: number;
}

/** A party's colour is its first candidate's, so the charts stay consistent with /candidat. */
export function partyColor(party: PartyEntry): string {
  return party.candidates[0]?.color || '#0D1B2A';
}

function averageProximity(a: PartyEntry, b: PartyEntry): number {
  let total = 0;
  let pairs = 0;
  for (const c1 of a.candidates) {
    for (const c2 of b.candidates) {
      if (c1.slug === c2.slug) continue;
      total += getProximityBetween(c1, c2).percent;
      pairs += 1;
    }
  }
  return pairs > 0 ? Math.round(total / pairs) : 0;
}

export function getPartyProximityRanking(partySlug: string): PartyProximity[] {
  const party = getPartyBySlug(partySlug);
  if (!party) return [];

  return partyList
    .filter((other) => other.slug !== partySlug)
    .map((other) => ({
      slug: other.slug,
      name: other.name,
      shortName: other.shortName,
      color: partyColor(other),
      percent: averageProximity(party, other),
    }))
    .sort((a, b) => b.percent - a.percent || a.name.localeCompare(b.name, 'fr'));
}

export interface PartyCohesionPair {
  candidate1: CandidateSlugEntry;
  candidate2: CandidateSlugEntry;
  percent: number;
  sameAnswers: number;
  comparedQuestions: number;
  pairSlug: string;
}

/** Pairwise proximity inside a party. Empty for the parties with a single candidate. */
export function getPartyCohesion(party: PartyEntry): PartyCohesionPair[] {
  const pairs: PartyCohesionPair[] = [];
  for (let i = 0; i < party.candidates.length; i++) {
    for (let j = i + 1; j < party.candidates.length; j++) {
      const candidate1 = party.candidates[i];
      const candidate2 = party.candidates[j];
      const { percent, sameAnswers, comparedQuestions } = getProximityBetween(candidate1, candidate2);
      pairs.push({
        candidate1,
        candidate2,
        percent,
        sameAnswers,
        comparedQuestions,
        pairSlug: getCanonicalPairSlug(candidate1.slug, candidate2.slug),
      });
    }
  }
  return pairs.sort((a, b) => b.percent - a.percent);
}
