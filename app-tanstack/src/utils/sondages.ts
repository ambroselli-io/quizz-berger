/**
 * Read helpers over src/content/sondages-2027.json, refreshed weekly by
 * scripts/fetch-sondages.ts from the MieuxVoter open dataset.
 */

import sondages from '@app/content/sondages-2027.json';

export type PolledCandidate = (typeof sondages.candidates)[number];

const byCandidateSlug = new Map<string, PolledCandidate>(
  sondages.candidates.filter((c) => c.slug !== null).map((c) => [c.slug as string, c]),
);

export const sondagesData = sondages;

/** Null when no published first-round poll tests this candidate. */
export function getPollingForCandidate(candidateSlug: string): PolledCandidate | null {
  return byCandidateSlug.get(candidateSlug) || null;
}

const MONTH_LABELS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

export function formatMonthLong(month: string): string {
  const [year, monthNumber] = month.split('-');
  return `${MONTH_LABELS[Number(monthNumber) - 1]} ${year}`;
}
