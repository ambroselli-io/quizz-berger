import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TextInput, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/navigation';
import { normalizeWord } from '~/utils/diacritics';
import getUserThemes from '~/utils/getUserThemes';
import useQuizz from '~/hooks/useQuizz';
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
  const { quizz, quizzForSearch } = useQuizz();
  const { user, mutate } = useUser();
  const { userAnswers } = useUserAnswers();
  const [search, setSearch] = useState('');

  const userThemes = useMemo(() => getUserThemes(userAnswers, quizz), [userAnswers, quizz]);

  const quizzFiltered = useMemo(() => {
    if (!search) return quizz;
    return quizz.filter(filterBySearch(search, quizzForSearch));
  }, [search, quizz, quizzForSearch]);

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

  const initNewUser = async (): Promise<boolean> => {
    if (user?._id) return true;
    const response = await API.post({ path: '/user' });
    if (!response.ok) return false;
    mutate(response.data);
    return true;
  };

  const goToQuizz = async (themeId: string) => {
    if (!(await initNewUser())) {
      Alert.alert(
        'Connexion impossible',
        "Le quiz a besoin d'internet pour enregistrer vos réponses. Vérifiez votre connexion et réessayez.",
      );
      return;
    }
    if (!themeId) return;
    const firstQuestionId = quizz.find((t) => t._id === themeId)?.questions[0]?._id;
    if (firstQuestionId) {
      navigation.navigate('Question', { themeId, questionId: firstQuestionId });
    }
  };

  const importantAnswers = useMemo(() => userAnswers.filter((a) => a.isImportant), [userAnswers]);
  const goToImportantQuestions = () => {
    const first = quizz
      .flatMap((t) => t.questions.map((q) => ({ themeId: t._id, questionId: q._id })))
      .find((q) => importantAnswers.some((a) => a.questionId === q.questionId));
    if (first) navigation.navigate('Question', { ...first, importantOnly: true });
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
    [userAnswers, quizz],
  );

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={shuffledQuizz}
        keyExtractor={(item) => item._id}
        renderItem={renderTheme}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
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
              autoCorrect={false}
              returnKeyType="search"
            />
            {importantAnswers.length > 0 && (
              <Pressable
                onPress={goToImportantQuestions}
                accessibilityRole="button"
                className="mt-4 items-center rounded-lg border-2 px-6 py-4"
                style={{ borderColor: '#facc15', backgroundColor: '#fef9c3', borderCurve: 'continuous' }}
              >
                <Text className="text-sm text-black">★ Questions importantes pour moi</Text>
                <Text className="mt-1 self-end text-[10px] text-black">
                  {importantAnswers.length} question{importantAnswers.length > 1 ? 's' : ''}
                </Text>
              </Pressable>
            )}
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
