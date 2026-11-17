import quickQuizzIds from '~/shared/quick-quizz-ids.json';

// The web's "quiz rapide" list (app-tanstack/src/utils/quick-quizz.ts), copied in src/shared/.
// The app has no quick path itself, but a user who did it on the web logs in here with those answers.
const quickQuizzIdSet = new Set<string>(quickQuizzIds);

export const isInQuickQuizz = (questionId: string | undefined) => !!questionId && quickQuizzIdSet.has(questionId);
