import { quizz } from './quizz';
import type { QuizzQuestion } from '@app/types/quizz';
import quickQuizzIds from '@app/shared/quick-quizz-ids.json';

// "Quiz rapide" (/quiz-rapide): a short path through the quiz, walked in this order, then the result page.
// Hand-maintained. Picked from production data: the questions users star the most, kept to a subset whose
// candidate ranking correlates at 0.97 with the ranking over the full quiz. The order alternates themes so
// the first questions are the ones people care most about. quick-quizz.test.ts fails when an id disappears.
// The list lives in shared/quick-quizz-ids.json, copied in api-express/src/shared/ for the /stats split.
export const quickQuizzQuestionIds: string[] = quickQuizzIds;

export interface QuizzStep {
  themeId: string;
  questionId: string;
}

export const quickQuizzPath: QuizzStep[] = quickQuizzQuestionIds.flatMap((questionId) => {
  const theme = quizz.find((t) => t.questions.some((q) => q._id === questionId));
  return theme ? [{ themeId: theme._id, questionId }] : [];
});

export const quickQuizzCount = quickQuizzPath.length;

/** Search param carried by /question/{themeId}/{questionId} while walking the quick path. */
export const QUICK_QUIZZ_SEARCH = { rapide: 1 } as const;

export const isInQuickQuizz = (questionId: string | undefined) =>
  quickQuizzPath.some((step) => step.questionId === questionId);

/** The step after `questionId`, or null at the end of the list (time for the result page). */
export const nextQuickQuizzStep = (questionId: string | undefined): QuizzStep | null => {
  const index = quickQuizzPath.findIndex((step) => step.questionId === questionId);
  return quickQuizzPath[index + 1] ?? null;
};

/** The first step not answered yet, or null when every question of the list has an answer. */
export const firstUnansweredQuickQuizzStep = (answers: { questionId: string }[]): QuizzStep | null => {
  const answered = new Set(answers.map((a) => a.questionId));
  return quickQuizzPath.find((step) => !answered.has(step.questionId)) ?? null;
};

export const quickQuizzQuestionUrl = (step: QuizzStep) => `/question/${step.themeId}/${step.questionId}`;

/** The first question of the list, shown answerable on the home page. */
export const quickQuizzFirstQuestion: { themeId: string; question: QuizzQuestion } | null = (() => {
  const step = quickQuizzPath[0];
  const question = quizz.find((t) => t._id === step?.themeId)?.questions.find((q) => q._id === step?.questionId);
  return step && question ? { themeId: step.themeId, question } : null;
})();

/** Search param of /quiz-rapide carrying the answer picked on the home page for the first question. */
export const QUICK_QUIZZ_ANSWER_PARAM = 'reponse';

/**
 * The answer index carried by `?reponse=`, or null when absent or not a valid answer of the first question.
 * The router may hand it over parsed (2) or raw ("2").
 */
export const parseQuickQuizzAnswer = (value: unknown): number | null => {
  const index = typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : value;
  if (typeof index !== 'number' || !Number.isInteger(index) || index < 0) return null;
  return quickQuizzFirstQuestion && index < quickQuizzFirstQuestion.question.answers.length ? index : null;
};
