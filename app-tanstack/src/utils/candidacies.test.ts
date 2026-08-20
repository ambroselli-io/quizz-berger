import { describe, it, expect } from 'vitest';
import candidatesData from '@app/shared/candidates-answers.json';
import {
  candidacyList,
  missingCandidacies,
  unknownCandidacySlugs,
  timelineByMonth,
  withdrawnCandidacies,
  formatEventDate,
} from '@app/utils/candidacies';

/**
 * The tracker is a claim about reality with dates and press links in it. These checks catch the
 * two ways it rots: a candidate added to the quiz without an entry here (a hole in the page), and
 * a `withdrawn` flag that disagrees with the status shown to the reader.
 */
describe('candidacies', () => {
  it('covers every candidate of the quiz, and nobody else', () => {
    expect(missingCandidacies).toEqual([]);
    expect(unknownCandidacySlugs).toEqual([]);
  });

  it('agrees with the withdrawn flag of candidates-answers.json', () => {
    const flagged = candidatesData
      .filter((c) => (c as { withdrawn?: boolean }).withdrawn)
      .map((c) => c.pseudo)
      .sort();
    const listed = withdrawnCandidacies.map((c) => c.candidate.pseudo).sort();
    expect(listed).toEqual(flagged);
  });

  it('dates every event and sources it', () => {
    for (const candidacy of candidacyList) {
      for (const event of candidacy.events) {
        expect(event.date, `${candidacy.slug}: bad date "${event.date}"`).toMatch(
          /^\d{4}-\d{2}(-\d{2})?$/,
        );
        expect(event.sources.length, `${candidacy.slug}: event without source`).toBeGreaterThan(0);
        for (const source of event.sources) {
          expect(source.url, `${candidacy.slug}: bad source url`).toMatch(/^https:\/\//);
        }
      }
    }
  });

  it('gives every withdrawn candidate a dated withdrawal', () => {
    for (const candidacy of withdrawnCandidacies) {
      expect(
        candidacy.events.some((e) => e.type === 'withdrawal'),
        `${candidacy.slug} is withdrawn without a withdrawal event`,
      ).toBe(true);
    }
  });

  it('sorts the timeline from the most recent month to the oldest', () => {
    const keys = timelineByMonth.map((m) => m.key);
    expect(keys).toEqual([...keys].sort().reverse());
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('writes French dates', () => {
    expect(formatEventDate('2026-08-17')).toBe('17 août 2026');
    expect(formatEventDate('2025-04-01')).toBe('1er avril 2025');
    expect(formatEventDate('2025-03')).toBe('mars 2025');
  });
});
