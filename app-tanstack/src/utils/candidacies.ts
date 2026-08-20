/**
 * Derived view over `content/candidacies.ts`.
 *
 * The content file holds the facts (who declared, who gave up, when, with which press link);
 * everything the pages need — the month-by-month timeline, the counts, the join with the quiz
 * roster — is computed here so the content file stays a list of facts.
 */

import { candidacies, type Candidacy, type CandidacyEvent, type CandidacyStatus } from '@app/content/candidacies';
import { candidateSlugMap, type CandidateSlugEntry } from '@app/utils/seo';
import { getPartyForCandidate } from '@app/utils/parties';

export type { Candidacy, CandidacyEvent, CandidacyStatus, CandidacySource } from '@app/content/candidacies';

export interface CandidacyEntry extends Candidacy {
  candidate: CandidateSlugEntry;
  /** The declaration or withdrawal that decides where the person sits on the timeline. */
  lastEvent?: CandidacyEvent;
}

function resolve(candidacy: Candidacy): CandidacyEntry | null {
  const candidate = candidateSlugMap.find((c) => c.slug === candidacy.slug);
  if (!candidate) return null;
  const dated = [...candidacy.events].sort((a, b) => a.date.localeCompare(b.date));
  return { ...candidacy, events: dated, candidate, lastEvent: dated[dated.length - 1] };
}

export const candidacyList: CandidacyEntry[] = candidacies
  .map(resolve)
  .filter((c): c is CandidacyEntry => Boolean(c));

/**
 * A candidate of the quiz without an entry here would silently disappear from the tracker,
 * and an entry whose slug drifted would silently vanish too. Both are worth a loud failure
 * in dev and in the test suite rather than a hole in the page.
 */
export const missingCandidacies: string[] = candidateSlugMap
  .filter((c) => !candidacies.some((entry) => entry.slug === c.slug))
  .map((c) => c.slug);

export const unknownCandidacySlugs: string[] = candidacies
  .filter((entry) => !candidateSlugMap.some((c) => c.slug === entry.slug))
  .map((entry) => entry.slug);

export function getCandidacyBySlug(slug: string): CandidacyEntry | undefined {
  return candidacyList.find((c) => c.slug === slug);
}

export function getCandidacyStatus(slug: string): CandidacyStatus | undefined {
  return candidacyList.find((c) => c.slug === slug)?.status;
}

export const declaredCandidacies = candidacyList.filter((c) => c.status === 'declared');
export const withdrawnCandidacies = candidacyList.filter((c) => c.status === 'withdrawn');
export const potentialCandidacies = candidacyList.filter((c) => c.status === 'potential');

export const declaredCount = declaredCandidacies.length;
export const withdrawnCount = withdrawnCandidacies.length;
export const potentialCount = potentialCandidacies.length;

// --- Timeline ---

export interface TimelineItem {
  candidacy: CandidacyEntry;
  event: CandidacyEvent;
  /** "CANDIDAT" or "OUT" — the tag shown next to the name. */
  tag: 'CANDIDAT' | 'OUT' | 'ÉTAPE';
}

export interface TimelineMonth {
  /** "2026-07" */
  key: string;
  /** "juillet 2026" */
  label: string;
  items: TimelineItem[];
}

const MONTHS = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
];

export function formatEventDate(date: string): string {
  const [year, month, day] = date.split('-');
  const monthLabel = MONTHS[Number(month) - 1] || '';
  if (!day) return `${monthLabel} ${year}`;
  const dayLabel = Number(day) === 1 ? '1er' : String(Number(day));
  return `${dayLabel} ${monthLabel} ${year}`;
}

export function formatMonth(key: string): string {
  const [year, month] = key.split('-');
  return `${MONTHS[Number(month) - 1] || ''} ${year}`;
}

function tagOf(event: CandidacyEvent): TimelineItem['tag'] {
  if (event.type === 'declaration') return 'CANDIDAT';
  if (event.type === 'withdrawal') return 'OUT';
  return 'ÉTAPE';
}

/**
 * Every declaration and every withdrawal, newest month first. `step` events (a support, a court
 * ruling, the end of the primary) stay on the candidate page: putting them on the hub timeline
 * would drown the two things people come to read, who entered and who left.
 */
export const timelineByMonth: TimelineMonth[] = (() => {
  const items: TimelineItem[] = [];
  for (const candidacy of candidacyList) {
    for (const event of candidacy.events) {
      if (event.type === 'step') continue;
      items.push({ candidacy, event, tag: tagOf(event) });
    }
  }
  items.sort((a, b) => b.event.date.localeCompare(a.event.date) || a.candidacy.candidate.pseudo.localeCompare(b.candidacy.candidate.pseudo));

  const months: TimelineMonth[] = [];
  for (const item of items) {
    const key = item.event.date.slice(0, 7);
    let month = months[months.length - 1];
    if (!month || month.key !== key) {
      month = { key, label: formatMonth(key), items: [] };
      months.push(month);
    }
    month.items.push(item);
  }
  return months;
})();

/** The most recent movement, for the hub intro and the home page teaser. */
export const latestTimelineItem: TimelineItem | undefined = timelineByMonth[0]?.items[0];

/** Party or movement to display next to a name: the registry first, the content file otherwise. */
export function movementLabel(candidacy: CandidacyEntry): string {
  return getPartyForCandidate(candidacy.slug)?.name || candidacy.movement;
}
