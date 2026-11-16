import { describe, expect, it } from 'vitest';
import { findRedirect, redirects } from './redirects.mjs';
import publicQuestionSlugs from '@app/content/public-question-slugs.json';
import { candidateSlugMap, questionSlugMap, themeSlugMap } from './seo-light';

const currentSlugs = new Set(questionSlugMap.map((q) => q.slug));

describe('redirects', () => {
  it('keeps every known question URL alive: still served, or redirected', () => {
    const lost = publicQuestionSlugs.filter(
      (slug) => !currentSlugs.has(slug) && !redirects.has(`/question-politique/${slug}`),
    );
    // A question was reworded or deleted: add its old URL to src/utils/redirects.mjs.
    expect(lost).toEqual([]);
  });

  it('knows every question slug served today', () => {
    const known = new Set(publicQuestionSlugs);
    // New question: add its slug to src/content/public-question-slugs.json.
    expect([...currentSlugs].filter((slug) => !known.has(slug))).toEqual([]);
  });

  it('points every redirect at a page that exists, in one hop', () => {
    const candidates = new Set(candidateSlugMap.map((c) => c.slug));
    const themes = new Set(themeSlugMap.map((t) => t.slug));
    for (const [from, to] of redirects) {
      expect(redirects.has(to), `${from} → ${to} chains`).toBe(false);
      const [, kind, slug] = to.split('/');
      if (kind === 'question-politique') expect(currentSlugs.has(slug), to).toBe(true);
      if (kind === 'candidat') expect(candidates.has(slug), to).toBe(true);
      if (kind === 'theme') expect(themes.has(slug), to).toBe(true);
    }
  });

  it('folds trailing and duplicate slashes, keeps the query string', () => {
    expect(findRedirect('/themes/')).toBe('/themes');
    expect(findRedirect('/themes/?utm_source=x')).toBe('/themes?utm_source=x');
    expect(findRedirect('//')).toBe('/');
    expect(findRedirect('//evil.com/')).toBe('/evil.com');
    expect(findRedirect('/pour-qui-voter-2027/')).toBe('/');
    expect(findRedirect('/question-politique/si-marine-le-pen-etait-elue-quel-serait-votre-sentiment')).toBe(
      '/candidat/marine-le-pen',
    );
    expect(findRedirect('/')).toBeNull();
    expect(findRedirect('/themes')).toBeNull();
    expect(findRedirect('/candidat/marine-le-pen?x=1')).toBeNull();
  });
});
