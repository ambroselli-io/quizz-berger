import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/types/navigation';
import useQuizz from '~/hooks/useQuizz';
import useUser from '~/hooks/useUser';
import useUserAnswers from '~/hooks/useUserAnswers';
import ProgressBar from '~/components/ProgressBar';
import storage from '~/utils/storage';
import { requestAppReviewOnce } from '~/utils/appReview';

export const FEEDBACK_HINT_SEEN_KEY = 'question-feedback-hint-seen';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'Question'>;

export default function QuestionScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { themeId, questionId } = route.params;
  const { quizz } = useQuizz();
  const { user } = useUser();
  const { userAnswers, setAnswer } = useUserAnswers();

  const theme = useMemo(
    () => quizz.find((t) => t._id === themeId) ?? { _id: '', fr: '', backgroundColor: '', questions: [] },
    [themeId, quizz],
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

  // The hint about per-question feedback shows on the second question only,
  // once per install: the first question is for getting the hang of the quiz.
  const [showFeedbackHint, setShowFeedbackHint] = useState(false);
  useEffect(() => {
    if (questionIndex !== 1) {
      setShowFeedbackHint(false);
      return;
    }
    if (storage.getString(FEEDBACK_HINT_SEEN_KEY)) return;
    storage.set(FEEDBACK_HINT_SEEN_KEY, '1');
    setShowFeedbackHint(true);
  }, [questionIndex]);

  const goToNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const nextQuestionId = questions[questionIndex + 1]._id;
      navigation.setParams({ themeId, questionId: nextQuestionId });
    } else {
      navigation.popTo('Themes');
    }
  };

  const goToPreviousQuestion = () => {
    if (questionIndex > 0) {
      const prevQuestionId = questions[questionIndex - 1]._id;
      navigation.setParams({ themeId, questionId: prevQuestionId });
    } else {
      navigation.popTo('Themes');
    }
  };

  const sendAnswer = async (answerIndex: number) => {
    setCurrentAnswerIndex(answerIndex);
    const finishesTheme =
      questionIndex === questions.length - 1 &&
      questions.every((q) => q._id === questionId || userAnswers.some((a) => a.questionId === q._id));
    await setAnswer({
      userId: user?._id ?? '',
      themeId: theme._id,
      questionId,
      answerIndex,
    });
    goToNextQuestion();
    // Let the themes list settle before the OS overlays its review sheet.
    if (finishesTheme) setTimeout(requestAppReviewOnce, 800);
  };

  const openFeedback = () => navigation.navigate('Feedback', { kind: 'question', themeId, questionId });

  if (!question) return null;

  return (
    <View className="flex-1 bg-white">
      {/* Theme header */}
      <View
        className="flex-row items-center justify-between px-4 pb-3 pt-20"
        style={{ backgroundColor: `${theme.backgroundColor}CC` }}
      >
        <Pressable onPress={() => navigation.popTo('Themes')}>
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
        {showFeedbackHint && (
          <View className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-2">
            <Text className="text-xs text-yellow-900">
              Une question vous semble mal posée, ou il manque une réponse ? Vous pouvez donner votre avis sur
              chaque question, avec le lien sous les réponses.
            </Text>
          </View>
        )}

        <Text className="mb-8 text-center text-xl font-bold text-quizz-dark">
          {question.fr}
        </Text>

        {question.help && (
          <Pressable
            onPress={() => Linking.openURL(question.help!)}
            hitSlop={8}
            className="-mt-4 mb-8 items-center"
          >
            <Text className="text-center text-xs text-gray-500">
              Cliquez <Text className="underline">ici</Text> pour en savoir plus
            </Text>
          </Pressable>
        )}

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

        <Pressable onPress={openFeedback} hitSlop={8} className="mt-6 items-center">
          <Text className="text-xs text-gray-500 underline">Un avis sur cette question ?</Text>
        </Pressable>
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
