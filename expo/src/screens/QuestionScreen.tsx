import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/types/navigation';
import { quizz } from '~/utils/quizz';
import useUser from '~/hooks/useUser';
import useUserAnswers from '~/hooks/useUserAnswers';
import ProgressBar from '~/components/ProgressBar';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'Question'>;

export default function QuestionScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { themeId, questionId } = route.params;
  const { user } = useUser();
  const { userAnswers, setAnswer } = useUserAnswers();

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

  const userThemes = useMemo(
    () => [...userAnswers.reduce((themes: Set<string>, answer) => themes.add(answer.themeId), new Set<string>())],
    [userAnswers],
  );
  const showResultsButton = userThemes.length > 0;

  const goToNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const nextQuestionId = questions[questionIndex + 1]._id;
      navigation.setParams({ themeId, questionId: nextQuestionId });
    } else {
      navigation.navigate('Themes');
    }
  };

  const goToPreviousQuestion = () => {
    if (questionIndex > 0) {
      const prevQuestionId = questions[questionIndex - 1]._id;
      navigation.setParams({ themeId, questionId: prevQuestionId });
    } else {
      navigation.navigate('Themes');
    }
  };

  const sendAnswer = async (answerIndex: number) => {
    setCurrentAnswerIndex(answerIndex);
    await setAnswer({
      userId: user?._id ?? '',
      themeId: theme._id,
      questionId,
      answerIndex,
    });
    goToNextQuestion();
  };

  if (!question) return null;

  return (
    <View className="flex-1 bg-white">
      {/* Theme header */}
      <View
        className="flex-row items-center justify-between px-4 pb-3 pt-14"
        style={{ backgroundColor: `${theme.backgroundColor}CC` }}
      >
        <Pressable onPress={() => navigation.navigate('Themes')}>
          <Text className="text-sm">‹ Thèmes</Text>
        </Pressable>
        <Text
          className="flex-1 text-center text-base font-bold"
          style={{ fontFamily: 'Merriweather_700Bold' }}
          numberOfLines={1}
        >
          {theme.fr}
        </Text>
        {showResultsButton ? (
          <Pressable onPress={() => navigation.navigate('Result', undefined)}>
            <Text className="text-sm">Résultats ›</Text>
          </Pressable>
        ) : (
          <View className="w-16" />
        )}
      </View>

      {/* Question content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        <Text className="mb-8 text-center text-xl font-bold text-quizz-dark">
          {question.fr}
        </Text>

        <View className="gap-3">
          {question.answers.map((answer, index) => {
            const isSelected = currentAnswerIndex === index;
            return (
              <Pressable
                key={index}
                onPress={() => sendAnswer(index)}
                className="min-h-[56px] justify-center rounded-lg border border-gray-200 px-4 py-3"
                style={{
                  backgroundColor: isSelected ? '#111827' : '#ffffff',
                }}
              >
                <Text
                  className="text-sm"
                  style={{ color: isSelected ? '#ffffff' : '#000000' }}
                >
                  {answer}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom navigation bar */}
      <View
        className="absolute bottom-0 left-0 right-0 flex-row items-center bg-white px-4 pb-8 pt-3 shadow-sm"
        style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 3 }}
      >
        <Pressable onPress={goToPreviousQuestion} className="px-4 py-2">
          <Text className="text-2xl text-quizz-dark">‹</Text>
        </Pressable>
        <View className="mx-2 flex-1">
          <ProgressBar progress={(questionIndex + 1) / questions.length} />
        </View>
        <Pressable onPress={goToNextQuestion} className="px-4 py-2">
          <Text className="text-2xl text-quizz-dark">›</Text>
        </Pressable>
      </View>
    </View>
  );
}
