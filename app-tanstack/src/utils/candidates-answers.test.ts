import { describe, it, expect } from 'vitest';
import candidatesData from '@app/shared/candidates-answers.json';
import quizz from '@app/shared/quizz-2027.json';

/**
 * A question with no answer from a candidate scores 0 against every user, which drags that
 * candidate down silently. It happens when candidates and questions are added on parallel branches.
 */
describe('candidates-answers.json', () => {
  const questions = quizz.flatMap((theme) => theme.questions.map((question) => ({ themeId: theme._id, question })));

  it('has an answer from every candidate to every question', () => {
    const missing = candidatesData.flatMap((candidate) =>
      questions
        .filter(({ question }) => !candidate.answers.some((answer) => answer.questionId === question._id))
        .map(({ question }) => `${candidate.pseudo} → ${question._id}`),
    );
    expect(missing).toEqual([]);
  });

  it('only uses answer indexes that exist', () => {
    const invalid = candidatesData.flatMap((candidate) =>
      candidate.answers
        .filter((answer) => {
          const found = questions.find(({ question }) => question._id === answer.questionId);
          return !found || found.themeId !== answer.themeId || !(answer.answerIndex >= 0 && answer.answerIndex < found.question.answers.length);
        })
        .map((answer) => `${candidate.pseudo} → ${answer.questionId} [${answer.answerIndex}]`),
    );
    expect(invalid).toEqual([]);
  });
});
