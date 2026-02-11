import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Loader from '@app/components/Loader';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@app/components/ui/accordion';
import getUserThemes from '@app/utils/getUserThemes';
import useUser from '@app/hooks/useUser';
import { quizz, quizzDownload } from '@app/utils/quizz';
import useUserAnswers from '@app/hooks/useUserAnswers';
import useCandidates from '@app/hooks/useCandidates';
import useFriends from '@app/hooks/useFriends';
import type { Candidate } from '@app/types/quizz';

const API_URL = import.meta.env.DEV ? 'http://localhost:5179' : 'https://api.quizz-du-berger.com';

export default function AllQuestions() {
  const { candidatePseudo } = useParams<{ candidatePseudo?: string }>();
  const forCandidate = !!candidatePseudo;
  const { user } = useUser();
  const { userAnswers } = useUserAnswers();
  const { candidates } = useCandidates();
  const { friends } = useFriends();

  const [candidateAnswers, setCandidatesAnswers] = useState<Candidate | null>(null);
  const [userThemes, setUserThemes] = useState<string[]>([]);

  const userAnswersId = userAnswers.map((a) => a.questionId);

  const [isLoading, setIsLoading] = useState(forCandidate);

  const downloadQuizz = () => {
    const dataStr = 'data:text/text;charset=utf-8,' + encodeURIComponent(quizzDownload);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'quizz-du-berger_election_presidentielle_2027_questions.txt');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  useEffect(() => {
    setUserThemes(getUserThemes(userAnswers));
  }, [userAnswers.length]);

  useEffect(() => {
    if (candidatePseudo) {
      const found = [...candidates, ...friends].find((c) => c.pseudo === candidatePseudo);
      if (found) setCandidatesAnswers(found);
    }
  }, [candidates.length, friends.length, candidatePseudo, candidates, friends]);

  useEffect(() => {
    setIsLoading(forCandidate && !candidateAnswers?.pseudo);
  }, [forCandidate, candidateAnswers?.pseudo]);

  return (
    <>
      <title>Toutes les questions | Le Quizz du Berger</title>

      {/* Mobile: accordion view */}
      <div className="flex flex-col bg-white px-3 py-6 lg:hidden">
        <h1 className="mb-4 text-center font-[Merriweather] text-xl font-bold text-quizz-dark">
          Toutes les questions
        </h1>
        {forCandidate && candidateAnswers?.pseudo && (
          <p className="mb-4 text-center text-sm text-gray-600">
            En rouge : réponses de <strong>{candidateAnswers.pseudo}</strong>
            {user?._id ? ', encadré : vos réponses.' : '.'}
          </p>
        )}
        <Accordion
          type="multiple"
          defaultValue={forCandidate ? quizz.filter((t) => !userThemes.length || userThemes.includes(t._id)).map((t) => t._id) : []}
        >
          {quizz.map((theme, themeIndex) => (
            <AccordionItem key={theme._id} value={theme._id}>
              <AccordionTrigger className="px-2 py-3 text-left text-base font-semibold">
                <span className="flex items-center gap-2 text-left">
                  <span className="inline-block h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: theme.backgroundColor }} />
                  {'ABCDEFGHIJKLMNOPQRST'[themeIndex]} - {theme.fr}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-0">
                <Accordion
                  type="multiple"
                  defaultValue={forCandidate ? theme.questions.filter((q) => !userAnswersId.length || userAnswersId.includes(q._id)).map((q) => q._id) : []}
                >
                  {theme.questions.map((question, questionIndex) => (
                    <AccordionItem key={question._id} value={question._id} className="border-b-0">
                      <AccordionTrigger className="py-2 pl-4 pr-2 text-left text-sm font-medium" style={{ borderLeftWidth: 3, borderLeftColor: theme.backgroundColor }}>
                        {'ABCDEFGHIJKLMNOPQRST'[themeIndex]}{questionIndex + 1} - {question.fr}
                      </AccordionTrigger>
                      <AccordionContent className="pl-5 pr-2">
                        <ol className="list-none space-y-1.5 text-sm">
                          {question.answers.map((answer, answerIndex) => {
                            const isSameAnswer = (a: { themeId: string; questionId: string; answerIndex: number }) =>
                              a.themeId === theme._id && a.questionId === question._id && a.answerIndex === answerIndex;
                            const isUserAnswer = forCandidate && !!userAnswers.find(isSameAnswer);
                            const isCandidateAnswer = forCandidate && !!candidateAnswers?.answers?.find(isSameAnswer);
                            return (
                              <li
                                key={answer}
                                className="rounded px-2 py-1"
                                style={{
                                  borderWidth: isUserAnswer ? 2 : 0,
                                  borderColor: 'black',
                                  borderStyle: 'solid',
                                  color: isCandidateAnswer ? 'red' : 'inherit',
                                }}
                              >
                                {answerIndex + 1}. {answer}
                              </li>
                            );
                          })}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Desktop */}
      <div className="hidden min-h-[600px] justify-center overflow-y-scroll bg-white px-2.5 py-10 lg:flex lg:h-[calc(100vh-80px)] [&_details]:mb-5 [&_details]:w-[1024px] [&_h2]:mt-4 [&_h2]:mb-4 [&_h3]:mt-2.5 [&_h3]:mb-2.5 [&_h3]:ml-2.5 [&_li]:ml-[30px] [&_li]:mb-1 [&_ol]:ml-[30px] [&_ol]:mb-1 [&_ol]:list-none [&_ol]:text-[15px] [&_summary]:mb-5">
        <div className="flex max-w-[1200px] flex-col items-center bg-white">
          <h1 className="mb-5 text-center font-[Merriweather] text-2xl font-bold text-quizz-dark">
            Toutes les questions
          </h1>
          <h3 className="mb-10 text-center text-base font-normal text-quizz-dark [&_a]:cursor-pointer [&_a]:underline [&_span]:cursor-pointer [&_span]:underline">
            {!forCandidate ? (
              <>
                Vous pouvez voir ici toutes les questions, et les télécharger en{' '}
                <span onClick={downloadQuizz}>cliquant ici</span>.<br />
                Si vous avez une remarque à faire, ou une question à ajouter, contactez-nous{'\u00A0'}!
              </>
            ) : (
              <>
                Vous pouvez voir en rouge toutes les réponses de <strong>{candidateAnswers?.pseudo}</strong>
                {user?._id ? ', et en encadré vos propres réponses.' : '.'}
                <br />
                Cliquez{' '}
                <b>
                  <Link to={`/result/${candidateAnswers?.pseudo}`}>ici</Link>
                </b>{' '}
                pour voir le graphique des ses résultats.
              </>
            )}
            <br /><br />
            Les questions/réponses du Quizz ont été réalisées en fonction des programmes de chaque candidat.
            <br />
            Vous pouvez retrouver l'analyse détaillée{' '}
            <a href={`${API_URL}/quizz/download-analyze`} target="_blank" rel="noreferrer">
              en cliquant ici
            </a>
          </h3>
          {quizz.map((theme, index) => (
            <details
              open={forCandidate && (!userThemes.length || userThemes.includes(theme._id))}
              key={theme._id}
            >
              <summary className="cursor-pointer">
                <h3 className="relative inline text-xl font-bold">
                  {'ABCDEFGHIJKLMNOPQRST'[index]} - {theme.fr}
                  <span
                    className="absolute inset-x-0 -bottom-[7px] h-2.5 -skew-x-[18deg]"
                    style={{ backgroundColor: `${theme.backgroundColor}aa` }}
                  />
                </h3>
              </summary>
              <div>
                {theme.questions.map((question, questionIndex) => (
                  <details
                    open={forCandidate && (!userAnswersId.length || userAnswersId.includes(question._id))}
                    key={question._id}
                  >
                    <summary className="ml-5 cursor-pointer">
                      <h4 className="relative inline text-base">
                        {'ABCDEFGHIJKLMNOPQRST'[index]}
                        {questionIndex + 1} - {question.fr}
                        <span
                          className="absolute inset-x-0 -bottom-[3px] h-[5px] skew-x-[18deg]"
                          style={{ backgroundColor: `${theme.backgroundColor}aa` }}
                        />
                      </h4>
                    </summary>
                    <ol>
                      {question.answers.map((answer, answerIndex) => {
                        const isSameAnswer = (a: { themeId: string; questionId: string; answerIndex: number }) =>
                          a.themeId === theme._id && a.questionId === question._id && a.answerIndex === answerIndex;
                        const isUserAnswer = forCandidate && !!userAnswers.find(isSameAnswer);
                        const isCandidateAnswer = forCandidate && !!candidateAnswers?.answers?.find(isSameAnswer);
                        return (
                          <li
                            key={answer}
                            className="inline-block px-2.5"
                            style={{
                              borderWidth: isUserAnswer ? '2px' : '0px',
                              borderColor: 'black',
                              borderStyle: 'solid',
                              color: isCandidateAnswer ? 'red' : 'black',
                            }}
                          >
                            {answerIndex + 1}. {answer}{' '}
                          </li>
                        );
                      })}
                    </ol>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
      <Loader isLoading={isLoading} withBackground size="15vh" />
    </>
  );
}
