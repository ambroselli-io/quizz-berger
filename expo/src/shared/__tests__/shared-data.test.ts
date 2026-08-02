import expoQuizz from '~/shared/quizz-2027.json';
import expoCandidates from '~/shared/candidates-answers.json';
import apiQuizz from '../../../../api-express/src/shared/quizz-2027.json';
import apiCandidates from '../../../../api-express/src/shared/candidates-answers.json';
import type { QuizzTheme } from '~/types/quizz';

// `src/shared/` is a manual copy of `api-express/src/shared/` — there is no sync
// script. The app now pulls questions from the API at runtime, but this copy is
// still what a fresh install shows before the first sync and what the app falls
// back to offline, so drift means stale questions for new users.
describe('bundled shared data', () => {
  it('matches the API question set', () => {
    expect(expoQuizz).toEqual(apiQuizz);
  });

  it('matches the API candidate answers', () => {
    expect(expoCandidates).toEqual(apiCandidates);
  });
});

const themes = expoQuizz as QuizzTheme[];
const questions = themes.flatMap((theme) => theme.questions);

describe('question set invariants', () => {
  it('has unique theme ids', () => {
    const ids = themes.map((theme) => theme._id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique question ids across all themes', () => {
    const ids = questions.map((question) => question._id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  // The scoring algorithm indexes question.scores[userAnswerIndex][candidateAnswerIndex],
  // so a non-square matrix silently produces undefined scores.
  it('has a square scores matrix for every question', () => {
    const broken = questions
      .filter(
        (question) =>
          question.scores.length !== question.answers.length ||
          question.scores.some((line) => line.length !== question.answers.length),
      )
      .map((question) => question._id);
    expect(broken).toEqual([]);
  });

  it('only lets candidates answer questions that exist', () => {
    const questionIds = new Set(questions.map((question) => question._id));
    const orphans = (apiCandidates as Array<{ pseudo: string; answers: Array<{ questionId: string; answerIndex: number }> }>)
      .flatMap((candidate) => candidate.answers.map((answer) => ({ candidate: candidate.pseudo, ...answer })))
      .filter((answer) => !questionIds.has(answer.questionId));
    expect(orphans).toEqual([]);
  });

  it('only lets candidates pick an answer index that exists', () => {
    const byId = new Map(questions.map((question) => [question._id, question]));
    const outOfRange = (apiCandidates as Array<{ pseudo: string; answers: Array<{ questionId: string; answerIndex: number }> }>)
      .flatMap((candidate) => candidate.answers.map((answer) => ({ candidate: candidate.pseudo, ...answer })))
      .filter((answer) => {
        const question = byId.get(answer.questionId);
        if (!question) return false;
        return answer.answerIndex < 0 || answer.answerIndex >= question.answers.length;
      });
    expect(outOfRange).toEqual([]);
  });
});
