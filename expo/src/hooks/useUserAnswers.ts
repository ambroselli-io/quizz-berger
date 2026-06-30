import { useEffect, useCallback } from 'react';
import API from '~/services/api';
import useStore from '~/zustand/store';
import type { Answer } from '~/types/quizz';

const useUserAnswers = () => {
  const userAnswers = useStore((s) => s.userAnswers);
  const setUserAnswers = useStore((s) => s.setUserAnswers);
  const upsertAnswer = useStore((s) => s.upsertAnswer);

  useEffect(() => {
    let active = true;
    const fetchAnswers = async () => {
      const data = await API.get({ path: '/answer' });
      if (active && data?.data) setUserAnswers(data.data);
    };
    fetchAnswers();
    return () => {
      active = false;
    };
  }, [setUserAnswers]);

  const setAnswer = useCallback(
    async (newAnswer: Answer) => {
      const response = await API.post({
        path: '/answer',
        body: newAnswer as unknown as Record<string, unknown>,
      });
      if (response?.ok) upsertAnswer(response.data);
    },
    [upsertAnswer],
  );

  return { userAnswers, setAnswer };
};

export default useUserAnswers;
