import { useMemo, useState, useEffect } from 'react';
import type { QuizzTheme, Answer } from '@app/types/quizz';

interface ThemeButtonProps {
  theme: QuizzTheme;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswers?: Answer[];
}

const ThemeButton = ({ theme, onClick, userAnswers = [] }: ThemeButtonProps) => {
  const { backgroundColor, fr, _id, questions } = theme;

  const userThemeAnswers = useMemo(
    () => userAnswers?.filter((a) => a.themeId === _id)?.length || 0,
    [userAnswers, _id],
  );

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(userThemeAnswers / questions.length);
  }, [userThemeAnswers, questions]);

  return (
    <button
      data-themeid={_id}
      onClick={onClick}
      className="relative flex w-[250px] cursor-pointer flex-col items-center overflow-hidden rounded-lg border-2 bg-white px-6 py-4 text-sm"
      style={{ borderColor: backgroundColor }}
    >
      <div
        className="absolute left-0 top-0 h-full"
        style={{ width: `${Math.round(progress * 100)}%`, backgroundColor: `${backgroundColor}CC` }}
      />
      <span className="relative z-10">{fr}</span>
      <span className="relative z-10 mt-1 ml-auto text-[0.65em] text-black">
        {progress ? `${userThemeAnswers} / ${questions.length}` : `${questions.length} questions`}
      </span>
    </button>
  );
};

export default ThemeButton;
