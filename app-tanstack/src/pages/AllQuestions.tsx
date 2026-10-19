import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from '@app/lib/router';
import Loader from '@app/components/Loader';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@app/components/ui/accordion';
import getUserThemes from '@app/utils/getUserThemes';
import useUser from '@app/hooks/useUser';
import { quizz, quizzDownload, quizzQuestionsCount } from '@app/utils/quizz';
import useUserAnswers from '@app/hooks/useUserAnswers';
import useCandidates from '@app/hooks/useCandidates';
import useFriends from '@app/hooks/useFriends';
import type { Candidate, QuizzQuestion, QuizzTheme } from '@app/types/quizz';
import { readableTextColor } from '@app/utils/contrast';

const API_URL = import.meta.env.DEV ? 'http://localhost:5179' : 'https://api.quizz-du-berger.com';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const IMPORTANT_SECTION_ID = 'importantes';
const IMPORTANT_COLOR = '#facc15';

interface Section {
  id: string;
  title: string;
  color?: string;
  questions: { question: QuizzQuestion; theme: QuizzTheme; label: string }[];
}

const themeSections: Section[] = quizz.map((theme, index) => ({
  id: theme._id,
  title: `${LETTERS[index]} - ${theme.fr}`,
  color: theme.backgroundColor,
  questions: theme.questions.map((question, questionIndex) => ({
    question,
    theme,
    label: `${LETTERS[index]}${questionIndex + 1}`,
  })),
}));

export default function AllQuestions() {
  const { candidatePseudo } = useParams<{ candidatePseudo?: string }>();
  const forCandidate = !!candidatePseudo;
  const { user } = useUser();
  const { userAnswers } = useUserAnswers();
  const { candidates } = useCandidates();
  const { friends } = useFriends();
  // Podium links from /result: ?theme={themeId} for a theme podium, ?importantes=1 for the starred one.
  const search = useLocation().search as { theme?: string; importantes?: unknown };
  const themeFilter = themeSections.find((s) => s.id === search?.theme);
  const importantOnly = !themeFilter && Boolean(search?.importantes);

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

  const importantIds = userAnswers.filter((a) => a.isImportant).map((a) => a.questionId).join(',');
  const sections = useMemo(() => {
    if (themeFilter) return [themeFilter];
    const ids = importantIds.split(',');
    const importantSection: Section = {
      id: IMPORTANT_SECTION_ID,
      title: 'Questions importantes pour moi',
      color: IMPORTANT_COLOR,
      questions: themeSections.flatMap((s) => s.questions).filter((q) => ids.includes(q.question._id)),
    };
    if (importantOnly) return [importantSection];
    return importantSection.questions.length ? [importantSection, ...themeSections] : themeSections;
  }, [themeFilter, importantOnly, importantIds]);
  const isFiltered = !!themeFilter || importantOnly;
  const isSectionOpen = (section: Section) =>
    forCandidate && (isFiltered || section.id === IMPORTANT_SECTION_ID || !userThemes.length || userThemes.includes(section.id));
  const isQuestionOpen = (question: QuizzQuestion) =>
    forCandidate && (!userAnswersId.length || userAnswersId.includes(question._id));

  // The candidate view is noindex; only the plain list targets "N questions pour 2027".
  const candidateName = candidateAnswers?.pseudo || candidatePseudo;
  const heading = !forCandidate
    ? `${quizzQuestionsCount} questions pour 2027`
    : themeFilter
      ? `${quizz.find((t) => t._id === themeFilter.id)?.fr} : les réponses de ${candidateName}`
      : importantOnly
        ? `Vos questions importantes : les réponses de ${candidateName}`
        : `Les ${quizzQuestionsCount} questions vues par ${candidateName}`;
  const seeAllLink = forCandidate && isFiltered && (
    <Link to={`/all-questions/${candidatePseudo}`} className="underline">
      Voir toutes les questions
    </Link>
  );
  const emptyImportant = importantOnly && !sections[0].questions.length && (
    <p className="mb-6 text-center text-sm text-gray-600">Vous n'avez marqué aucune question comme importante.</p>
  );

  return (
    <>
      {/* Mobile: accordion view */}
      <div className="flex flex-col bg-white px-3 py-6 lg:hidden">
        <h1 className="mb-4 text-center font-[Merriweather] text-xl font-bold text-quizz-dark">
          {heading}
        </h1>
        {forCandidate && candidateAnswers?.pseudo && (
          <p className="mb-4 text-center text-sm text-gray-600">
            En rouge : réponses de <strong>{candidateAnswers.pseudo}</strong>
            {user?._id ? ', encadré : vos réponses.' : '.'}
          </p>
        )}
        {seeAllLink && <p className="mb-4 text-center text-sm">{seeAllLink}</p>}
        {emptyImportant}
        <Accordion
          key={`${sections.map((section) => section.id).join()}-${userThemes.length}`}
          type="multiple"
          defaultValue={sections.filter(isSectionOpen).map((section) => section.id)}
        >
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="px-2 py-3 text-left text-base font-semibold">
                <span className="flex items-center gap-2 text-left">
                  <span className="inline-block h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: section.color }} />
                  {section.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-0">
                <Accordion
                  type="multiple"
                  defaultValue={section.questions.filter(({ question }) => isQuestionOpen(question)).map(({ question }) => question._id)}
                >
                  {section.questions.map(({ question, theme, label }) => (
                    <AccordionItem key={question._id} value={question._id} className="border-b-0">
                      <AccordionTrigger className="py-2 pl-4 pr-2 text-left text-sm font-medium" style={{ borderLeftWidth: 3, borderLeftColor: theme.backgroundColor }}>
                        {label} - {question.fr}
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
            {heading}
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
                {seeAllLink && (
                  <>
                    <br />
                    {seeAllLink}
                  </>
                )}
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
          {emptyImportant}
          {sections.map((section) => (
            <details open={isSectionOpen(section)} key={section.id}>
              <summary className="cursor-pointer">
                <h3 className="relative inline text-xl font-bold">
                  {section.title}
                  <span
                    className="absolute inset-x-0 -bottom-[7px] h-2.5 -skew-x-[18deg]"
                    style={{ backgroundColor: `${section.color}${readableTextColor(section.color ?? '', 0.67) === '#000000' ? 'aa' : '40'}` }}
                  />
                </h3>
              </summary>
              <div>
                {section.questions.map(({ question, theme, label }) => (
                  <details open={isQuestionOpen(question)} key={question._id}>
                    <summary className="ml-5 cursor-pointer">
                      <h4 className="relative inline text-base">
                        {label} - {question.fr}
                        <span
                          className="absolute inset-x-0 -bottom-[3px] h-[5px] skew-x-[18deg]"
                          style={{ backgroundColor: `${theme.backgroundColor}${readableTextColor(theme.backgroundColor ?? '', 0.67) === '#000000' ? 'aa' : '40'}` }}
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
