import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/navigation';
import { quizz, quizzForSearch } from '~/utils/quizz';
import { normalizeWord } from '~/utils/diacritics';
import getUserThemes from '~/utils/getUserThemes';
import useUser from '~/hooks/useUser';
import useUserAnswers from '~/hooks/useUserAnswers';
import API from '~/services/api';
import ThemeButton from '~/components/ThemeButton';
import QuizzButton from '~/components/QuizzButton';
import type { QuizzTheme } from '~/types/quizz';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const filterBySearch =
  (search: string, searchIndex: string[]) =>
  (_theme: unknown, index: number) => {
    if (!search) return true;
    return searchIndex[index].includes(normalizeWord(search));
  };

export default function ThemesScreen() {
  const navigation = useNavigation<Nav>();
  const { user, mutate } = useUser();
  const { userAnswers } = useUserAnswers();
  const [search, setSearch] = useState('');

  const userThemes = useMemo(() => getUserThemes(userAnswers), [userAnswers]);

  const quizzFiltered = useMemo(() => {
    if (!search) return quizz;
    return quizz.filter(filterBySearch(search, quizzForSearch));
  }, [search]);

  const shuffledQuizz = useMemo(() => {
    const hour = new Date().getHours();
    return [...quizzFiltered].sort((t1, t2) => {
      const t1onlyLetter = t1.fr.split(' ').join('');
      const t2onlyLetter = t2.fr.split(' ').join('');
      const letter1 = t1onlyLetter[Math.min(hour, t1onlyLetter.length - 1)];
      const letter2 = t2onlyLetter[Math.min(hour, t2onlyLetter.length - 1)];
      return letter1 > letter2 ? -1 : 1;
    });
  }, [quizzFiltered]);

  const initNewUser = async () => {
    if (user?._id) return;
    const response = await API.post({ path: '/user' });
    if (response.ok) mutate(response.data);
  };

  const goToQuizz = async (themeId: string) => {
    await initNewUser();
    if (!themeId) return;
    const firstQuestionId = quizz.find((t) => t._id === themeId)?.questions[0]?._id;
    if (firstQuestionId) {
      navigation.navigate('Question', { themeId, questionId: firstQuestionId });
    }
  };

  const goToResults = () => {
    if (!userThemes.length) return;
    navigation.navigate('Result', undefined);
  };

  const hasAnswers = userThemes.length > 0;

  const renderTheme = useCallback(
    ({ item }: { item: QuizzTheme }) => (
      <ThemeButton
        theme={item}
        userAnswers={userAnswers}
        onPress={() => goToQuizz(item._id)}
      />
    ),
    [userAnswers],
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={shuffledQuizz}
        keyExtractor={(item) => item._id}
        renderItem={renderTheme}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        ListHeaderComponent={
          <View className="mb-4">
            <Text
              className="mb-2 text-center text-sm text-quizz-dark/70"
              style={{ fontFamily: 'MerriweatherSans_400Regular' }}
            >
              {!hasAnswers
                ? 'Répondez au quiz, thème après thème, en commençant par celui qui vous tient le plus à coeur.'
                : 'Répondez aux autres questions pour approfondir votre pensée politique.'}
            </Text>
            <TextInput
              className="mt-2 rounded-lg border border-gray-300 px-3 py-2.5 text-base"
              placeholder="Recherchez par mot-clé"
              autoComplete="off"
              value={search}
              onChangeText={setSearch}
              clearButtonMode="while-editing"
            />
          </View>
        }
        ListFooterComponent={
          <View className="mt-4 items-center pb-8">
            <QuizzButton onPress={goToResults} disabled={!hasAnswers}>
              {hasAnswers ? 'Voir les résultats' : 'Choisissez votre 1er thème'}
            </QuizzButton>
          </View>
        }
      />
    </View>
  );
}
