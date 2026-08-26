import { describe, expect, it } from 'vitest';
import { questionSlugMap } from './seo';

// Google cuts a result title around 60 characters. These pages exist to answer a question,
// so the part that says "the candidates answer" must survive the cut, not fall past it.
const TITLE_MAX = 60;

describe('question page titles', () => {
  it('every authored title fits in the SERP budget', () => {
    const authored = questionSlugMap.filter((q) => q.seoTitle !== q.fr);
    const tooLong = authored
      .filter((q) => q.seoTitle.length > TITLE_MAX)
      .map((q) => `${q.questionId} (${q.seoTitle.length}): ${q.seoTitle}`);
    expect(tooLong).toEqual([]);
  });

  // The questions nobody searches yet keep their raw text. That is deliberate: appending a
  // promise Google never displays only pushes the searched words closer to the cut.
  it('a question without an authored title carries no suffix', () => {
    const withSuffix = questionSlugMap
      .filter((q) => q.seoTitle !== q.fr && q.seoTitle.startsWith(q.fr))
      .map((q) => q.questionId);
    expect(withSuffix).toEqual([]);
  });

  it('no two question pages share a title', () => {
    const seen = new Map<string, string>();
    const duplicates: string[] = [];
    for (const q of questionSlugMap) {
      const previous = seen.get(q.seoTitle);
      if (previous) duplicates.push(`${previous} + ${q.questionId}: ${q.seoTitle}`);
      else seen.set(q.seoTitle, q.questionId);
    }
    expect(duplicates).toEqual([]);
  });
});
