import React, { useMemo } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { QuizzTheme, Answer } from '~/types/quizz';

interface ThemeButtonProps {
  theme: QuizzTheme;
  onPress: () => void;
  userAnswers?: Answer[];
}

const ThemeButton = ({ theme, onPress, userAnswers = [] }: ThemeButtonProps) => {
  const { backgroundColor, fr, _id, questions } = theme;

  const userThemeAnswers = useMemo(
    () => userAnswers?.filter((a) => a.themeId === _id)?.length || 0,
    [userAnswers, _id],
  );

  const progress = questions.length > 0 ? userThemeAnswers / questions.length : 0;

  return (
    <Pressable
      onPress={onPress}
      className="relative overflow-hidden rounded-lg border-2 bg-white px-4 py-3"
      style={{ borderColor: backgroundColor, borderCurve: 'continuous' }}
    >
      {/* Progress fill */}
      <View
        className="absolute left-0 top-0 bottom-0"
        style={{
          width: `${Math.round(progress * 100)}%`,
          backgroundColor: `${backgroundColor}CC`,
        }}
      />
      <Text className="relative text-sm font-medium text-quizz-dark">{fr}</Text>
      <Text className="relative mt-0.5 text-right text-[10px] text-quizz-dark/60">
        {progress ? `${userThemeAnswers} / ${questions.length}` : `${questions.length} questions`}
      </Text>
    </Pressable>
  );
};

export default ThemeButton;
