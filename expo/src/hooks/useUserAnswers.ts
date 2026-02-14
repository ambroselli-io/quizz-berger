import { useEffect, useState, useCallback } from 'react';
import API from '~/services/api';
import type { Answer } from '~/types/quizz';

const useUserAnswers = () => {
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      const data = await API.get({ path: '/answer' });
      if (data?.data) setUserAnswers(data.data);
    };
    fetchAnswers();
  }, []);

  const setAnswer = useCallback(async (newAnswer: Answer) => {
    const response = await API.post({
      path: '/answer',
      body: newAnswer as unknown as Record<string, unknown>,
    });
    if (response?.ok) {
      setUserAnswers((prev) => {
        const existing = prev.findIndex((a) => a.questionId === newAnswer.questionId);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = response.data;
          return updated;
        }
        return [...prev, response.data];
      });
    }
  }, []);

  return { userAnswers, setAnswer };
};

export default useUserAnswers;
