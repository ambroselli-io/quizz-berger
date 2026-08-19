/**
 * The "{candidat}-droite-ou-gauche" articles quote proximity figures as hand-written
 * prose. Adding a question or changing a candidate answer moves those numbers, and
 * nothing else in the build would notice.
 *
 * This parses the ranking list of each article and checks every percentage, every
 * identical-answer count and the ORDER against the live computation. A failure means
 * the data moved: recompute and rewrite the figures in the article, do not relax it.
 */

import { describe, expect, it } from 'vitest';
import { articles } from './index';
import { getCandidateProximityRanking } from '@app/utils/proximity';

/** <li><a href="/candidat/gerald-darmanin">Gérald Darmanin</a> — 91 % de proximité, 107 réponses identiques.</li> */
const BULLET =
  /<li><a href="\/candidat\/([a-z0-9-]+)">[^<]+<\/a>[^—]*— (\d+) %(?:[^,]*), (\d+) réponses identiques\./g;

/** Inline prose mention: <a href="/candidat/bruno-retailleau">Bruno Retailleau</a> (43 %). */
const INLINE = /<a href="\/candidat\/([a-z0-9-]+)">[^<]+<\/a> \((\d+) %\)/g;

const positioningArticles = articles.filter((a) => a.slug.endsWith('-droite-ou-gauche'));

describe('proximity figures quoted in the "droite ou gauche" articles', () => {
  it('has at least one such article', () => {
    expect(positioningArticles.length).toBeGreaterThan(0);
  });

  for (const article of positioningArticles) {
    const subjectSlug = article.slug.replace(/-droite-ou-gauche$/, '');

    it(`${article.slug} matches the live ranking`, () => {
      const ranking = getCandidateProximityRanking(subjectSlug);
      expect(ranking.length).toBeGreaterThan(0);

      const quoted = [...article.content.matchAll(BULLET)].map((m) => ({
        slug: m[1],
        percent: Number(m[2]),
        sameAnswers: Number(m[3]),
      }));
      expect(quoted.length).toBeGreaterThan(0);

      const expected = ranking.slice(0, quoted.length).map((c) => ({
        slug: c.slug,
        percent: c.percent,
        sameAnswers: c.sameAnswers,
      }));

      // Compared as arrays so the order is checked too, not only the values.
      expect(quoted).toEqual(expected);
    });

    it(`${article.slug} quotes correct percentages in its prose links`, () => {
      const bySlug = new Map(
        getCandidateProximityRanking(subjectSlug).map((c) => [c.slug, c.percent]),
      );

      // Inline mentions outside the ranking list: <a href="/candidat/x">Nom</a> (43 %).
      // These sit in the "les plus éloignés" sentences and drift just as easily.
      const inline = [...article.content.matchAll(INLINE)].map((m) => ({
        slug: m[1],
        percent: Number(m[2]),
      }));

      for (const mention of inline) {
        expect(
          { slug: mention.slug, percent: mention.percent },
          `inline mention of ${mention.slug} in ${article.slug}`,
        ).toEqual({ slug: mention.slug, percent: bySlug.get(mention.slug) });
      }
    });
  }
});
