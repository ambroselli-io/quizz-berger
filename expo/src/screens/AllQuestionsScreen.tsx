import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/navigation';
import getUserThemes from '~/utils/getUserThemes';
import useQuizz from '~/hooks/useQuizz';
import useUser from '~/hooks/useUser';
import useUserAnswers from '~/hooks/useUserAnswers';
import useCandidates from '~/hooks/useCandidates';
import useFriends from '~/hooks/useFriends';
import type { Candidate, QuizzQuestion, QuizzTheme } from '~/types/quizz';

type Route = RouteProp<RootStackParamList, 'AllQuestions'>;

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface Section {
  id: string;
  title: string;
  color?: string;
  questions: { question: QuizzQuestion; theme: QuizzTheme; label: string }[];
}

export default function AllQuestionsScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'AllQuestions'>>();
  const candidatePseudo = route.params?.candidatePseudo;
  const themeFilterId = route.params?.themeId;
  const importantOnly = !themeFilterId && !!route.params?.importantOnly;
  const forCandidate = !!candidatePseudo;
  const { quizz } = useQuizz();
  const { user } = useUser();
  const { userAnswers } = useUserAnswers();
  const { candidates } = useCandidates();
  const { friends } = useFriends();

  const [candidateAnswers, setCandidateAnswers] = useState<Candidate | null>(null);
  const userThemes = useMemo(() => getUserThemes(userAnswers, quizz), [userAnswers, quizz]);
  const isLoading = forCandidate && !candidateAnswers?.pseudo;

  useEffect(() => {
    if (candidatePseudo) {
      const found = [...candidates, ...friends].find((c) => c.pseudo === candidatePseudo);
      if (found) setCandidateAnswers(found);
    }
  }, [candidates, friends, candidatePseudo]);

  const sections = useMemo(() => {
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
    const themeSection = themeSections.find((section) => section.id === themeFilterId);
    if (themeSection) return [themeSection];
    const importantIds = userAnswers.filter((a) => a.isImportant).map((a) => a.questionId);
    const importantSection: Section = {
      id: 'importantes',
      title: '★ Questions importantes pour moi',
      color: '#facc15',
      questions: themeSections.flatMap((section) => section.questions).filter((q) => importantIds.includes(q.question._id)),
    };
    if (importantOnly) return [importantSection];
    return importantSection.questions.length ? [importantSection, ...themeSections] : themeSections;
  }, [quizz, userAnswers, themeFilterId, importantOnly]);
  const isFiltered = sections.length === 1;

  const filterTitle = themeFilterId
    ? quizz.find((t) => t._id === themeFilterId)?.fr
    : importantOnly
      ? 'Vos questions importantes'
      : 'Toutes les questions';
  useEffect(() => {
    navigation.setOptions({ title: filterTitle });
  }, [navigation, filterTitle]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      {forCandidate && candidateAnswers?.pseudo && (
        <Text className="mb-4 text-center text-sm text-gray-600">
          En rouge : réponses de <Text className="font-bold">{candidateAnswers.pseudo}</Text>
          {user?._id ? ', encadré : vos réponses.' : '.'}
        </Text>
      )}

      {forCandidate && isFiltered && (
        <Pressable
          onPress={() => navigation.setParams({ themeId: undefined, importantOnly: undefined })}
          hitSlop={8}
          className="mb-4 items-center"
        >
          <Text className="text-sm text-blue-700 underline">Voir toutes les questions</Text>
        </Pressable>
      )}

      {importantOnly && !sections[0].questions.length && (
        <Text className="mb-4 text-center text-sm text-gray-600">
          Vous n'avez marqué aucune question comme importante.
        </Text>
      )}

      {sections.map((section) => (
        <View key={section.id} className="mb-6">
          <View className="mb-2 flex-row items-center gap-2">
            <View
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: section.color }}
            />
            <Text className="text-base font-bold text-quizz-dark">{section.title}</Text>
          </View>

          {section.questions.map(({ question, theme, label }) => (
            <View key={question._id} className="mb-3 ml-4">
              <Text
                className="mb-1 text-sm font-medium text-quizz-dark"
                style={{ borderLeftWidth: 3, borderLeftColor: theme.backgroundColor, paddingLeft: 8 }}
              >
                {label} - {question.fr}
              </Text>
              <View className="ml-4 gap-1">
                {question.answers.map((answer, answerIndex) => {
                  const isSameAnswer = (a: { themeId: string; questionId: string; answerIndex: number }) =>
                    a.themeId === theme._id && a.questionId === question._id && a.answerIndex === answerIndex;
                  const isUserAnswer = forCandidate && !!userAnswers.find(isSameAnswer);
                  const isCandidateAnswer = forCandidate && !!candidateAnswers?.answers?.find(isSameAnswer);
                  return (
                    <Text
                      key={answerIndex}
                      className="rounded px-2 py-0.5 text-xs"
                      style={{
                        borderWidth: isUserAnswer ? 2 : 0,
                        borderColor: 'black',
                        color: isCandidateAnswer ? 'red' : '#374151',
                      }}
                    >
                      {answerIndex + 1}. {answer}
                    </Text>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
