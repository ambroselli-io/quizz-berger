/**
 * The "{candidat}-droite-ou-gauche" articles used to quote proximity figures as
 * hand-written prose. Adding one question or one candidate silently falsified all of
 * them, twice in production, because nothing conflicts textually and git reports
 * nothing. They now render from `utils/proximity.ts` instead.
 *
 * This guards that decision: it fails if a literal figure creeps back in.
 */

import { describe, expect, it } from 'vitest';
import { articles } from './index';
import {
  getCandidateProximityRanking,
  proximityListHtml,
  proximityLinkHtml,
} from '@app/utils/proximity';
import { candidateSlugMap } from '@app/utils/seo';

/** A ranking bullet written by hand instead of rendered. */
const HARD_CODED_BULLET =
  /<li><a href="\/candidat\/[a-z0-9-]+">[^<]+<\/a>[^—]*— \d+ %[^,]*, \d+ réponses identiques\./;
/** An inline mention written by hand: <a href="/candidat/x">Nom</a> (43 %). */
const HARD_CODED_INLINE = /<a href="\/candidat\/[a-z0-9-]+">[^<]+<\/a> \(\d+ %\)/;

const positioningArticles = articles.filter((a) => a.slug.endsWith('-droite-ou-gauche'));

describe('positioning articles render their proximity figures', () => {
  it('there is at least one such article', () => {
    expect(positioningArticles.length).toBeGreaterThan(0);
  });

  for (const article of positioningArticles) {
    const subjectSlug = article.slug.replace(/-droite-ou-gauche$/, '');

    it(`${article.slug} targets a real candidate`, () => {
      expect(candidateSlugMap.map((c) => c.slug)).toContain(subjectSlug);
    });

    it(`${article.slug} renders its ranking rather than hard-coding it`, () => {
      // The rendered list is present verbatim, so the article really calls the helper.
      expect(article.content).toContain(proximityListHtml(subjectSlug));

      // And nothing outside it looks like a hand-written bullet.
      const outsideList = article.content.replace(proximityListHtml(subjectSlug), '');
      expect(HARD_CODED_BULLET.test(outsideList)).toBe(false);
    });

    it(`${article.slug} renders its inline mentions rather than hard-coding them`, () => {
      const ranking = getCandidateProximityRanking(subjectSlug);
      let remaining = article.content;
      for (const other of ranking) {
        remaining = remaining.split(proximityLinkHtml(subjectSlug, other.slug)).join('');
      }
      // Cross-references to another candidate's ranking are legitimate, so any leftover
      // is only a failure when it matches this article's subject.
      expect(HARD_CODED_INLINE.test(remaining.replace(proximityListHtml(subjectSlug), ''))).toBe(
        false,
      );
    });
  }
});
