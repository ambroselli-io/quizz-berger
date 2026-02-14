import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/types/navigation';
import { quizz, quizzQuestions } from '~/utils/quizz';
import getUserThemes from '~/utils/getUserThemes';
import useUser from '~/hooks/useUser';
import useUserAnswers from '~/hooks/useUserAnswers';
import useCandidates from '~/hooks/useCandidates';
import useFriends from '~/hooks/useFriends';
import { getCandidatesScorePerThemes } from '~/shared/utils/score';
import { getPodium } from '~/shared/utils/podium';
import Podium from '~/components/Podium';
import QuizzButton from '~/components/QuizzButton';
import API from '~/services/api';
import type { Answer, UserAnswerWithScorePerThemeAndMax } from '~/types/quizz';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'Result'>;

export default function ResultScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const userPseudo = route.params?.userPseudo;
  const { user, mutate } = useUser();
  const { userAnswers } = useUserAnswers();
  const { candidates } = useCandidates();
  const { friends, mutateFriends } = useFriends();

  const [publicUser, setPublicUser] = useState<{ pseudo?: string; isPublic?: boolean; friends?: string[] } | null>(null);
  const [publicUserAnswers, setPublicUserAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    if (!userPseudo || userPseudo === user?.pseudo) return;
    API.get({ path: `/user/${userPseudo}` }).then((res) => {
      if (res.ok) setPublicUser(res.data);
    });
    API.get({ path: `/answer/${userPseudo}` }).then((res) => {
      if (res.ok) setPublicUserAnswers(res.data);
    });
  }, [userPseudo, user?.pseudo]);

  const publicPage = useMemo(() => {
    if (!userPseudo) return false;
    if (userPseudo === user?.pseudo) return false;
    if (!publicUser?.isPublic) return false;
    return true;
  }, [userPseudo, user, publicUser]);

  const answersToShow = useMemo(() => {
    if (userPseudo === user?.pseudo) return userAnswers;
    if (publicPage) return publicUserAnswers;
    return userAnswers;
  }, [publicUserAnswers, publicPage, userAnswers, userPseudo, user?.pseudo]);

  const userToShow = useMemo(() => {
    if (!publicPage) return user;
    if (userPseudo === user?.pseudo) return user;
    return publicUser;
  }, [user, publicUser, publicPage, userPseudo]);

  const selectedThemes = useMemo(() => getUserThemes(answersToShow), [answersToShow]);

  const title = useMemo(() => {
    if (!publicPage && !userToShow?.pseudo) return 'Voici vos résultats';
    const name = (userToShow?.pseudo?.charAt(0).toUpperCase() ?? '') + (userToShow?.pseudo?.slice(1) ?? '');
    if (!publicPage) return `${name}, voici vos résultats`;
    return `Voici les résultats de ${name}`;
  }, [publicPage, userToShow]);

  const allCandidatePseudos = useMemo(() => candidates.map((c) => c.pseudo), [candidates]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  useEffect(() => {
    if (allCandidatePseudos.length) setSelectedCandidates(allCandidatePseudos);
  }, [allCandidatePseudos]);

  const candidatesScorePerThemes = useMemo(
    () =>
      getCandidatesScorePerThemes(
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)),
        candidates.map((c) => ({
          ...c,
          _id: (c as any).id ?? c._id,
          id: (c as any).id ?? c._id,
          answers: c.answers.filter((a: Answer) => selectedThemes.includes(a.themeId)),
        })) as any,
        quizzQuestions,
      ),
    [answersToShow, selectedThemes, candidates],
  );

  const friendsScorePerThemes = useMemo(
    () =>
      getCandidatesScorePerThemes(
        answersToShow.filter((a) => selectedThemes.includes(a.themeId)),
        friends.map((f) => ({
          ...f,
          _id: (f as any).id ?? f._id,
          id: (f as any).id ?? f._id,
          answers: f.answers.filter((a: Answer) => selectedThemes.includes(a.themeId)),
        })) as any,
        quizzQuestions,
      ),
    [answersToShow, selectedThemes, friends],
  );

  const filteredPersons: UserAnswerWithScorePerThemeAndMax[] = useMemo(
    () => [
      ...candidatesScorePerThemes.filter((c) => selectedCandidates.includes(c.pseudo)),
      ...friendsScorePerThemes,
    ],
    [candidatesScorePerThemes, friendsScorePerThemes, selectedCandidates],
  );

  const podiumsPerTheme = useMemo(
    () =>
      selectedThemes.map((themeId) => ({
        themeId,
        personsScore: filteredPersons.map((c) => ({
          id: c.id,
          pseudo: c.pseudo,
          picture: c.picture,
          color: c.color,
          total: c.scorePerThemes?.find((score) => themeId === score.themeId)?.percent ?? 0,
          totalMax: 100,
        })),
      })),
    [selectedThemes, filteredPersons],
  );

  const showSaveButton = !publicPage && !userToShow?.pseudo;

  if (!answersToShow.length) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#111827" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="px-4 pt-4">
        <Text
          className="mb-2 text-2xl font-bold text-quizz-dark"
          style={{ fontFamily: 'Merriweather_700Bold' }}
        >
          {title}
        </Text>
        <Text className="mb-4 rounded-md bg-amber-50 px-3 py-1.5 text-xs text-amber-800">
          Appuyez sur le nom d'un candidat pour voir ses réponses
        </Text>
      </View>

      {/* Main podium */}
      <View className="h-[350px]">
        <Podium podiumised={getPodium(filteredPersons)} />
      </View>

      {/* Action buttons */}
      {!publicPage && (
        <View className="mt-4 flex-row flex-wrap gap-2 px-4">
          {showSaveButton && (
            <Pressable
              onPress={() => navigation.navigate('Login')}
              className="flex-row items-center rounded-lg border-2 border-yellow-400 bg-yellow-400 px-4 py-2.5"
            >
              <Text className="text-sm font-semibold text-black">Enregistrer</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => {
              if (!userToShow?.pseudo) navigation.navigate('Login');
              else navigation.navigate('Share');
            }}
            className="flex-row items-center rounded-lg border-2 border-gray-800 bg-white px-4 py-2.5"
          >
            <Text className="text-sm font-medium text-gray-800">Partager</Text>
          </Pressable>
        </View>
      )}

      {/* Per-theme podiums */}
      <View className="mt-8 px-4">
        <Text
          className="mb-4 text-2xl font-bold text-quizz-dark"
          style={{ fontFamily: 'Merriweather_700Bold' }}
        >
          Thème par thème
        </Text>
      </View>
      {podiumsPerTheme.map(({ personsScore, themeId }) => (
        <View key={themeId} className="h-[300px]">
          <Podium
            podiumised={getPodium(personsScore)}
            title={quizz.find((t) => t._id === themeId)?.fr}
          />
        </View>
      ))}
    </ScrollView>
  );
}
