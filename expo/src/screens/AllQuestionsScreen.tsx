import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/types/navigation';
import { quizz } from '~/utils/quizz';
import getUserThemes from '~/utils/getUserThemes';
import useUser from '~/hooks/useUser';
import useUserAnswers from '~/hooks/useUserAnswers';
import useCandidates from '~/hooks/useCandidates';
import useFriends from '~/hooks/useFriends';
import type { Candidate } from '~/types/quizz';

type Route = RouteProp<RootStackParamList, 'AllQuestions'>;

export default function AllQuestionsScreen() {
  const route = useRoute<Route>();
  const candidatePseudo = route.params?.candidatePseudo;
  const forCandidate = !!candidatePseudo;
  const { user } = useUser();
  const { userAnswers } = useUserAnswers();
  const { candidates } = useCandidates();
  const { friends } = useFriends();

  const [candidateAnswers, setCandidateAnswers] = useState<Candidate | null>(null);
  const userThemes = useMemo(() => getUserThemes(userAnswers), [userAnswers]);
  const isLoading = forCandidate && !candidateAnswers?.pseudo;

  useEffect(() => {
    if (candidatePseudo) {
      const found = [...candidates, ...friends].find((c) => c.pseudo === candidatePseudo);
      if (found) setCandidateAnswers(found);
    }
  }, [candidates, friends, candidatePseudo]);

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

      {quizz.map((theme, themeIndex) => (
        <View key={theme._id} className="mb-6">
          <View className="mb-2 flex-row items-center gap-2">
            <View
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: theme.backgroundColor }}
            />
            <Text className="text-base font-bold text-quizz-dark">
              {'ABCDEFGHIJKLMNOPQRST'[themeIndex]} - {theme.fr}
            </Text>
          </View>

          {theme.questions.map((question, questionIndex) => (
            <View key={question._id} className="mb-3 ml-4">
              <Text
                className="mb-1 text-sm font-medium text-quizz-dark"
                style={{ borderLeftWidth: 3, borderLeftColor: theme.backgroundColor, paddingLeft: 8 }}
              >
                {'ABCDEFGHIJKLMNOPQRST'[themeIndex]}{questionIndex + 1} - {question.fr}
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
