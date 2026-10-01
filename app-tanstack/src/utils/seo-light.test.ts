import { describe, it, expect } from 'vitest';
import candidatesData from '@app/shared/candidates-answers.json';
import candidatesLight from '@app/content/candidates-light.json';
import * as seoLight from './seo-light';
import * as seo from './seo';

describe('seo-light', () => {
  it('candidates-light.json matches candidates-answers.json (run `npm run generate-candidates-light`)', () => {
    expect(candidatesLight).toEqual(candidatesData.map(({ id, pseudo, picture, color }) => ({ id, pseudo, picture, color })));
  });

  it('utils/seo adds the answers to the same candidates, in the same order', () => {
    expect(seo.candidateSlugMap.map(({ answers: _answers, ...light }) => light)).toEqual(seoLight.candidateSlugMap);
    expect(seo.candidateSlugMap.every((c) => c.answers.length > 0)).toBe(true);
    expect(seo.candidatesCount).toBe(candidatesData.length);
  });
});
