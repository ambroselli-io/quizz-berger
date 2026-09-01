import {
  bundledThemes,
  enrichThemes,
  flattenQuestions,
  formatQuizzForSearch,
  isValidQuizz,
} from '~/utils/quizz';
import type { QuizzTheme } from '~/types/quizz';

const makeQuestion = (overrides: Record<string, unknown> = {}) => ({
  _id: 'q1',
  fr: 'Une question ?',
  answers: ['Oui', 'Non'],
  scores: [
    [5, 0],
    [0, 5],
  ],
  ...overrides,
});

const makeTheme = (overrides: Record<string, unknown> = {}) => ({
  _id: 't1',
  fr: 'Un thème',
  questions: [makeQuestion()],
  ...overrides,
});

describe('isValidQuizz', () => {
  it('accepts a well-formed quizz', () => {
    expect(isValidQuizz([makeTheme()])).toBe(true);
  });

  it('accepts the quizz bundled with the app', () => {
    expect(isValidQuizz(bundledThemes)).toBe(true);
  });

  // `theme-et-si-un-autre-gagnait-2027` shipped with no question for months.
  // Rejecting such a theme would make the validator refuse the whole payload,
  // so the app would never pick up a new question.
  it('accepts a theme that holds no question', () => {
    expect(isValidQuizz([makeTheme({ questions: [] })])).toBe(true);
  });

  it.each([
    ['not an array', { themes: [] }],
    ['an empty array', []],
    ['null', null],
    ['a theme without _id', [makeTheme({ _id: undefined })]],
    ['a theme whose questions are not an array', [makeTheme({ questions: undefined })]],
    ['a question without answers', [makeTheme({ questions: [makeQuestion({ answers: [] })] })]],
    [
      'a question whose scores matrix has too few lines',
      [makeTheme({ questions: [makeQuestion({ scores: [[5, 0]] })] })],
    ],
    [
      'a question whose scores matrix is not square',
      [makeTheme({ questions: [makeQuestion({ scores: [[5, 0, 1], [0, 5, 1]] })] })],
    ],
    [
      'a question whose scores are not numbers',
      [makeTheme({ questions: [makeQuestion({ scores: [['5', '0'], ['0', '5']] })] })],
    ],
  ])('rejects %s', (_label, payload) => {
    expect(isValidQuizz(payload)).toBe(false);
  });
});

describe('enrichThemes', () => {
  it('gives every theme a background color', () => {
    const themes = enrichThemes(bundledThemes);
    expect(themes).toHaveLength(bundledThemes.length);
    expect(themes.every((theme) => !!theme.backgroundColor)).toBe(true);
  });

  it('keeps assigning colors past the end of the palette', () => {
    const many = Array.from({ length: 40 }, (_, i) => makeTheme({ _id: `t${i}` })) as QuizzTheme[];
    expect(enrichThemes(many).every((theme) => !!theme.backgroundColor)).toBe(true);
  });
});

describe('formatQuizzForSearch', () => {
  const themes = [
    makeTheme({ _id: 'police', fr: 'Sécurité', questions: [makeQuestion({ fr: 'Les rodéos motorisés ?' })] }),
    makeTheme({ _id: 'sante', fr: 'Santé', questions: [makeQuestion({ fr: "L'hôpital public ?" })] }),
  ] as QuizzTheme[];

  it('produces one searchable entry per theme, in the same order', () => {
    expect(formatQuizzForSearch(themes)).toHaveLength(2);
  });

  it('indexes theme titles, questions and answers without diacritics', () => {
    const [police] = formatQuizzForSearch(themes);
    expect(police).toContain('securite');
    expect(police).toContain('rodeos');
    expect(police).toContain('oui');
  });
});

describe('flattenQuestions', () => {
  it('returns every question across themes', () => {
    const expected = bundledThemes.reduce((count, theme) => count + theme.questions.length, 0);
    expect(flattenQuestions(bundledThemes)).toHaveLength(expected);
  });
});
