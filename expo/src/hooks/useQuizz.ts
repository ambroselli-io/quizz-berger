import useQuizzStore from '~/zustand/quizz';

const useQuizz = () => {
  const quizz = useQuizzStore((s) => s.quizz);
  const quizzForSearch = useQuizzStore((s) => s.quizzForSearch);
  const quizzQuestions = useQuizzStore((s) => s.quizzQuestions);

  return { quizz, quizzForSearch, quizzQuestions };
};

export default useQuizz;
