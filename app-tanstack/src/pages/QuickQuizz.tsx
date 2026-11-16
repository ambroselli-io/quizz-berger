import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from '@app/lib/router';
import API from '@app/services/api';
import useUser from '@app/hooks/useUser';
import Loader from '@app/components/Loader';
import type { Answer } from '@app/types/quizz';
import {
  QUICK_QUIZZ_ANSWER_PARAM,
  QUICK_QUIZZ_SEARCH,
  firstUnansweredQuickQuizzStep,
  parseQuickQuizzAnswer,
  quickQuizzFirstQuestion,
  quickQuizzQuestionUrl,
} from '@app/utils/quick-quizz';

// Not a page: it only starts the quick mode, then hands over to the question the visitor is at.
// With ?reponse=N (an answer picked on the home page), it first records that answer to the first question.
export default function QuickQuizz() {
  const { user, isLoading, mutate } = useUser();
  const navigate = useNavigate();
  const search = useLocation().search as Record<string, unknown> | undefined;
  const homeAnswerIndex = parseQuickQuizzAnswer(search?.[QUICK_QUIZZ_ANSWER_PARAM]);
  const started = useRef(false);

  useEffect(() => {
    if (isLoading || started.current) return;
    started.current = true;
    (async () => {
      let userId = user?._id;
      if (!userId) {
        const response = await API.post({ path: '/user' });
        if (response.ok) {
          mutate(response.data);
          userId = response.data?._id;
        }
      }
      const response = await API.get({ path: '/answer' });
      let answers = (response?.data as Answer[] | undefined) ?? [];
      if (homeAnswerIndex !== null && quickQuizzFirstQuestion) {
        const { themeId, question } = quickQuizzFirstQuestion;
        const alreadyAnswered = answers.some((a) => a.questionId === question._id);
        // Same call as the question page: an existing answer keeps its "important" flag.
        const saved = await API.post({
          path: '/answer',
          body: {
            userId: userId ?? '',
            themeId,
            questionId: question._id,
            answerIndex: homeAnswerIndex,
            ...(alreadyAnswered ? {} : { isImportant: false }),
          },
        });
        // On failure the first question stays unanswered, so the visitor lands on it and can answer again.
        if (saved?.ok && !alreadyAnswered) answers = [...answers, { themeId, questionId: question._id, answerIndex: homeAnswerIndex }];
      }
      const step = firstUnansweredQuickQuizzStep(answers);
      if (!step) return navigate('/result', { replace: true });
      return navigate({ to: quickQuizzQuestionUrl(step), search: QUICK_QUIZZ_SEARCH, replace: true });
    })();
  }, [isLoading, user?._id, mutate, navigate, homeAnswerIndex]);

  return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader isLoading />
    </div>
  );
}
