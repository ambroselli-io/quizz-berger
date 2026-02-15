import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { quizz } from '@app/utils/quizz';
import useUser from '@app/hooks/useUser';
import useUserAnswers from '@app/hooks/useUserAnswers';

export default function Question() {
  useUser({ redirectOnLoggedOut: '/' });
  const { userAnswers, setAnswer } = useUserAnswers();
  const navigate = useNavigate();
  const { themeId, questionId } = useParams<{ themeId: string; questionId: string }>();

  const theme = useMemo(
    () => quizz.find((t) => t._id === themeId) ?? { _id: '', fr: '', backgroundColor: '', questions: [] },
    [themeId],
  );
  const questions = theme.questions;

  const questionIndex = useMemo(
    () => questions.findIndex((q) => q._id === questionId),
    [questions, questionId],
  );
  const question = questions[questionIndex];

  const [currentAnswerIndex, setCurrentAnswerIndex] = useState<number | undefined>(
    userAnswers.find((a) => a.questionId === questionId)?.answerIndex,
  );

  useEffect(() => {
    setCurrentAnswerIndex(userAnswers.find((a) => a.questionId === questionId)?.answerIndex);
  }, [questionId, userAnswers]);

  const [showHelp, setShowHelp] = useState(!!question?.help);
  useEffect(() => {
    setShowHelp(!!question?.help);
  }, [question]);

  const userThemes = useMemo(
    () => [
      ...userAnswers.reduce((themes: Set<string>, answer) => themes.add(answer.themeId), new Set<string>()),
    ],
    [userAnswers],
  );
  const showResultsButton = userThemes.length > 0;

  const goToNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const nextQuestionId = questions[questionIndex + 1]._id;
      return navigate(`/question/${themeId}/${nextQuestionId}`);
    }
    return navigate('/themes');
  };

  const goToPreviousQuestion = () => {
    if (questionIndex > 0) {
      const previousQuestionId = questions[questionIndex - 1]._id;
      return navigate(`/question/${themeId}/${previousQuestionId}`);
    }
    return navigate('/themes');
  };

  const goToResults = () => navigate('/result');
  const goToThemes = () => navigate('/themes');

  const { user } = useUser();
  const sendAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const answerIndex = Number((e.target as HTMLElement).getAttribute('data-index'));
    await setAnswer({
      userId: user?._id ?? '',
      themeId: theme._id,
      questionId: questionId ?? '',
      answerIndex,
    });
    goToNextQuestion();
  };

  useEffect(() => {
    if (questionId) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questionId]);

  return (
    <>
      <title>{`${question?.fr} - ${theme.fr} | Le Quizz du Berger`}</title>

      {/* Theme header */}
      <div
        className="flex h-20 items-center justify-center px-5 max-lg:h-auto max-lg:min-h-[90px] max-lg:flex-col max-lg:justify-evenly max-lg:px-4"
        style={{ backgroundColor: `${theme.backgroundColor}CC` }}
      >
        <div className="flex w-full max-w-[1024px] items-center justify-between">
          <button className="cursor-pointer border-none bg-transparent text-sm" onClick={goToThemes}>
            ‹ Retour aux thèmes
          </button>
          <h2 className="text-center font-[Merriweather] text-xl font-bold max-lg:hidden">{theme.fr}</h2>
          <button
            className="cursor-pointer border-none bg-transparent text-sm"
            onClick={goToResults}
            style={{ opacity: showResultsButton ? 1 : 0 }}
          >
            Voir les résultats ›
          </button>
        </div>
        <h2 className="text-center font-[Merriweather] text-lg font-bold lg:hidden">{theme.fr}</h2>
      </div>

      {/* Question */}
      <div
        key={questionId}
        className="flex flex-col items-center justify-center bg-white px-5 pb-28 pt-10 max-lg:px-2.5 max-lg:pb-24"
      >
        <h2 className="mb-10 text-center text-2xl font-bold">{question?.fr}</h2>
        {showHelp && question?.help && (
          <a
            href={question.help}
            target="_blank"
            rel="noreferrer"
            className="-mt-[30px] mb-10 text-center text-xs font-normal"
          >
            Cliquez <strong className="underline">ici</strong> pour en savoir plus
          </a>
        )}
        <div className="flex max-w-[1020px] flex-col items-center gap-4 font-sans">
          {question?.answers.map((answer, index) => (
            <button
              key={index}
              data-index={index}
              onClick={sendAnswer}
              className="w-[500px] cursor-pointer rounded-lg border border-gray-200 px-2.5 py-2.5 text-base tracking-[0.01rem] max-lg:w-[300px]"
              style={{
                backgroundColor: currentAnswerIndex === index ? '#111827' : '#ffffff',
                color: currentAnswerIndex === index ? '#ffffff' : 'black',
                minHeight: '60px',
              }}
            >
              {answer}
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="fixed bottom-0 left-0 flex h-20 w-screen items-center justify-center bg-white shadow-[0px_-2px_3px_#ddddddcc] max-lg:h-[11vh] max-lg:max-h-20 max-lg:min-h-[50px]">
          <div className="flex h-full w-full max-w-[1024px] items-center justify-between max-lg:px-2.5">
            <button
              onClick={goToPreviousQuestion}
              className="mr-12 h-[17px] min-w-[19px] cursor-pointer border-none bg-white bg-[url('/left-arrow.svg')] bg-cover bg-no-repeat max-lg:mr-2.5"
            />
            <div className="mx-1 h-1 w-full rounded-lg bg-gray-100">
              <div
                className="h-1 rounded-lg bg-quizz-dark"
                style={{ width: `${(questionIndex / questions.length) * 100}%` }}
              />
            </div>
            <button
              onClick={goToNextQuestion}
              className="ml-12 h-[17px] min-w-[19px] cursor-pointer border-none bg-white bg-[url('/right-arrow.svg')] bg-cover bg-no-repeat max-lg:ml-2.5"
            />
          </div>
        </div>
      </div>
    </>
  );
}
