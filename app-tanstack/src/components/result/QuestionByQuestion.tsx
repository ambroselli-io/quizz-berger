import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from '@app/lib/router';
import { quizz } from '@app/utils/quizz';
import { isInQuickQuizz } from '@app/utils/quick-quizz';
import { Avatar } from '@app/components/result/VerticalPodium';
import type { Answer, QuizzQuestion, QuizzTheme } from '@app/types/quizz';

export interface QuestionPerson {
  pseudo: string;
  picture?: string | null;
  color?: string | null;
  answers: Array<Pick<Answer, 'questionId' | 'answerIndex'>>;
}

interface QuestionByQuestionProps {
  answers: Array<Pick<Answer, 'questionId' | 'answerIndex'>>;
  persons: QuestionPerson[];
}

const FIRST_COUNT = 1;
const STEP = 5;
// From "nothing in common" (0) to "same answer" (5).
const SCORE_COLORS = ['#dc2626', '#f97316', '#f59e0b', '#a3c94a', '#4ade80', '#16a34a'];

const shortName = (pseudo: string) => {
  const space = pseudo.indexOf(' ');
  if (space < 1) return pseudo;
  return `${pseudo[0]}. ${pseudo.slice(space + 1)}`;
};

const points = (score: number) => `${score > 0 ? '+' : ''}${score} pt${score > 1 ? 's' : ''}`;

const ScoreCircle = ({ score }: { score: number }) => (
  <span
    className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[3px] bg-white text-sm font-bold"
    style={{ borderColor: SCORE_COLORS[score] ?? '#9ca3af', color: SCORE_COLORS[score] ?? '#6b7280' }}
  >
    {score}
  </span>
);

const PersonList = ({ persons }: { persons: QuestionPerson[] }) => (
  <ul className="flex flex-col gap-2 max-lg:flex-row max-lg:flex-wrap max-lg:gap-x-3">
    {persons.map((p) => (
      <li key={p.pseudo} className="flex items-center gap-2">
        <Avatar picture={p.picture} color={p.color} size={32} />
        <Link
          to={`/all-questions/${p.pseudo}`}
          className="text-sm text-gray-800 no-underline hover:underline"
          title={p.pseudo}
        >
          {shortName(p.pseudo)}
        </Link>
      </li>
    ))}
  </ul>
);

interface CardProps {
  number: number;
  question: QuizzQuestion;
  theme: QuizzTheme;
  userAnswerIndex: number;
  personsPerAnswer: QuestionPerson[][];
}

const QuestionCard = ({ number, question, theme, userAnswerIndex, personsPerAnswer }: CardProps) => {
  const [open, setOpen] = useState(true);
  const scores = question.scores[userAnswerIndex] ?? [];
  const columns = { gridTemplateColumns: `repeat(${question.answers.length}, minmax(0, 1fr))` };

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 max-lg:p-4">
      <header className="flex items-start gap-3">
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {question.help?.startsWith('http') && (
              <a
                href={question.help}
                target="_blank"
                rel="noreferrer"
                title="En savoir plus"
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-gray-700 text-sm font-bold text-gray-700 no-underline"
              >
                ?
              </a>
            )}
            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-sm font-semibold text-gray-500">Q{number}</span>
            {isInQuickQuizz(question._id) && (
              <span className="rounded-full bg-yellow-100 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-yellow-800">
                Quiz rapide
              </span>
            )}
            <span className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-quizz-dark">
              {theme.fr}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-quizz-dark">{question.fr}</h3>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Replier' : 'Déplier'}
          className="cursor-pointer rounded-md border-none bg-transparent p-1 text-gray-500"
        >
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </header>
      {open && (
        <>
          <div className="mt-5 grid gap-x-3 max-lg:hidden" style={columns}>
            {question.answers.map((_, i) => (
              <div key={`you-${i}`} className="flex h-9 items-end justify-center">
                {i === userAnswerIndex && (
                  <span className="rounded-full bg-quizz-dark px-3 py-1 text-sm font-semibold text-white">▾ Vous</span>
                )}
              </div>
            ))}
            {question.answers.map((_, i) => (
              <div key={`pts-${i}`} className="mt-2 text-center text-sm font-bold text-quizz-dark">
                {points(scores[i] ?? 0)}
              </div>
            ))}
            {question.answers.map((answer, i) => (
              <div key={`txt-${i}`} className="mt-1 flex items-end justify-center text-center text-sm text-gray-600">
                {answer}
              </div>
            ))}
            {question.answers.map((_, i) => (
              <div key={`dot-${i}`} className="relative mt-3 flex justify-center">
                <span
                  className="absolute top-1/2 h-0.5 bg-gray-200"
                  style={{ left: i === 0 ? '50%' : '-0.75rem', right: i === question.answers.length - 1 ? '50%' : '-0.75rem' }}
                />
                <ScoreCircle score={scores[i] ?? 0} />
              </div>
            ))}
            {question.answers.map((_, i) => (
              <div key={`persons-${i}`} className="mt-4 min-w-0">
                <PersonList persons={personsPerAnswer[i]} />
              </div>
            ))}
          </div>
          <ol className="mt-4 flex flex-col gap-4 lg:hidden">
            {question.answers.map((answer, i) => (
              <li key={i} className={`rounded-xl p-3 ${i === userAnswerIndex ? 'bg-gray-100' : ''}`}>
                <div className="flex items-center gap-3">
                  <ScoreCircle score={scores[i] ?? 0} />
                  <div className="flex-1 text-sm text-gray-700">
                    {i === userAnswerIndex && (
                      <span className="mr-2 rounded-full bg-quizz-dark px-2 py-0.5 text-xs font-semibold text-white">Vous</span>
                    )}
                    {answer}
                  </div>
                  <span className="shrink-0 text-sm font-bold text-quizz-dark">{points(scores[i] ?? 0)}</span>
                </div>
                {personsPerAnswer[i].length > 0 && (
                  <div className="mt-3 pl-14">
                    <PersonList persons={personsPerAnswer[i]} />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </>
      )}
    </article>
  );
};

const QuestionByQuestion = ({ answers, persons }: QuestionByQuestionProps) => {
  const [visible, setVisible] = useState(FIRST_COUNT);

  const items = useMemo(() => {
    const userAnswers = new Map(answers.map((a) => [a.questionId, a.answerIndex]));
    const personAnswers = persons.map((p) => ({
      person: p,
      byQuestion: new Map(p.answers.map((a) => [a.questionId, a.answerIndex])),
    }));
    return quizz.flatMap((theme) =>
      theme.questions
        .filter((question) => userAnswers.has(question._id))
        .map((question) => ({
          theme,
          question,
          userAnswerIndex: userAnswers.get(question._id)!,
          personsPerAnswer: question.answers.map((_, i) =>
            personAnswers.filter(({ byQuestion }) => byQuestion.get(question._id) === i).map(({ person }) => person),
          ),
        })),
    );
  }, [answers, persons]);

  if (!items.length) return null;

  return (
    <div>
      <h2 className="mb-1 font-[Merriweather] text-2xl font-bold text-quizz-dark">Question par question</h2>
      <p className="mb-4 text-sm text-gray-600">
        Pour chaque question, les points que rapporte chaque réponse par rapport à la vôtre, et qui l'a choisie.
      </p>
      <div className="flex flex-col gap-4">
        {items.slice(0, visible).map((item, index) => (
          <QuestionCard key={item.question._id} number={index + 1} {...item} />
        ))}
      </div>
      {items.length > visible && (
        <button
          type="button"
          onClick={() => setVisible((v) => v + STEP)}
          className="mx-auto mt-4 flex cursor-pointer items-center gap-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Voir plus ({items.length - visible} question{items.length - visible > 1 ? 's' : ''} restante{items.length - visible > 1 ? 's' : ''}) <ChevronDown size={16} />
        </button>
      )}
    </div>
  );
};

export default QuestionByQuestion;
