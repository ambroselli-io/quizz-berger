import { describe, it, expect } from 'vitest';
import rawQuizz from '~/shared/quizz-2027.json';
import type { QuizzTheme } from '@app/types/quizz';
import {
  quickQuizzQuestionIds,
  quickQuizzPath,
  quickQuizzCount,
  isInQuickQuizz,
  nextQuickQuizzStep,
  firstUnansweredQuickQuizzStep,
  quickQuizzQuestionUrl,
  quickQuizzFirstQuestion,
  parseQuickQuizzAnswer,
} from './quick-quizz';

const themeOf = new Map(
  (rawQuizz as QuizzTheme[]).flatMap((theme) => theme.questions.map((q) => [q._id, theme._id] as const)),
);

describe('quick quizz list', () => {
  it('is not empty', () => {
    expect(quickQuizzQuestionIds.length).toBeGreaterThan(0);
  });

  it('only lists questions that exist in quizz-2027.json', () => {
    const missing = quickQuizzQuestionIds.filter((id) => !themeOf.has(id));
    expect(missing, 'renamed or removed question: update src/utils/quick-quizz.ts').toEqual([]);
  });

  it('has no duplicate', () => {
    expect(new Set(quickQuizzQuestionIds).size).toBe(quickQuizzQuestionIds.length);
  });

  it('keeps the list order and resolves each question to its theme', () => {
    expect(quickQuizzPath.map((s) => s.questionId)).toEqual(quickQuizzQuestionIds);
    for (const step of quickQuizzPath) expect(step.themeId).toBe(themeOf.get(step.questionId));
    expect(quickQuizzCount).toBe(quickQuizzQuestionIds.length);
  });
});

describe('quick quizz navigation', () => {
  const [first, second] = quickQuizzPath;
  const last = quickQuizzPath[quickQuizzPath.length - 1];

  it('goes to the next question of the list, across themes', () => {
    expect(nextQuickQuizzStep(first.questionId)).toEqual(second);
  });

  it('ends after the last question', () => {
    expect(nextQuickQuizzStep(last.questionId)).toBeNull();
  });

  it('knows which questions belong to the list', () => {
    expect(isInQuickQuizz(first.questionId)).toBe(true);
    expect(isInQuickQuizz('not-a-question')).toBe(false);
    expect(isInQuickQuizz(undefined)).toBe(false);
  });

  it('starts at the first question when nothing is answered', () => {
    expect(firstUnansweredQuickQuizzStep([])).toEqual(first);
  });

  it('resumes at the first unanswered question, ignoring answers outside the list', () => {
    const answers = [{ questionId: first.questionId }, { questionId: 'question-outside-the-list' }];
    expect(firstUnansweredQuickQuizzStep(answers)).toEqual(second);
  });

  it('fills a gap left earlier in the list before going further', () => {
    const answers = quickQuizzPath.filter((s) => s !== second).map((s) => ({ questionId: s.questionId }));
    expect(firstUnansweredQuickQuizzStep(answers)).toEqual(second);
  });

  it('returns null once every question of the list is answered', () => {
    expect(firstUnansweredQuickQuizzStep(quickQuizzPath)).toBeNull();
  });

  it('builds the question URL', () => {
    expect(quickQuizzQuestionUrl(first)).toBe(`/question/${first.themeId}/${first.questionId}`);
  });
});

describe('answer picked on the home page (?reponse=)', () => {
  const answersCount = quickQuizzFirstQuestion?.question.answers.length ?? 0;

  it('exposes the first question of the list', () => {
    expect(quickQuizzFirstQuestion?.question._id).toBe(quickQuizzQuestionIds[0]);
    expect(quickQuizzFirstQuestion?.themeId).toBe(themeOf.get(quickQuizzQuestionIds[0]));
    expect(answersCount).toBeGreaterThan(1);
  });

  it('accepts every answer index of the first question, parsed or raw', () => {
    for (let index = 0; index < answersCount; index++) {
      expect(parseQuickQuizzAnswer(index)).toBe(index);
      expect(parseQuickQuizzAnswer(String(index))).toBe(index);
    }
  });

  it('rejects an absent or out-of-range index', () => {
    expect(parseQuickQuizzAnswer(undefined)).toBeNull();
    expect(parseQuickQuizzAnswer(null)).toBeNull();
    expect(parseQuickQuizzAnswer(answersCount)).toBeNull();
    expect(parseQuickQuizzAnswer(String(answersCount))).toBeNull();
    expect(parseQuickQuizzAnswer(-1)).toBeNull();
    expect(parseQuickQuizzAnswer('-1')).toBeNull();
  });

  it('rejects anything that is not a whole number', () => {
    for (const value of [1.5, '1.5', '', ' 1', '1a', 'abc', NaN, Infinity, true, [1], { index: 1 }]) {
      expect(parseQuickQuizzAnswer(value)).toBeNull();
    }
  });
});
