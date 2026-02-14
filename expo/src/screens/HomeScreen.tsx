import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/navigation';
import API from '~/services/api';
import QuizzButton from '~/components/QuizzButton';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const [countUsers, setCountUsers] = useState(207569);
  const [countAnswers, setCountAnswers] = useState(9721827);

  useEffect(() => {
    API.get({ path: '/public/count' }).then((res) => {
      if (res.data) {
        setCountUsers((res.data.countUsers || 0) + 207569);
        setCountAnswers((res.data.countAnswers || 0) + 9721827);
      }
    });
  }, []);

  return (
    <ScrollView className="flex-1 bg-quizz-dark">
      {/* Hero */}
      <View className="min-h-[600px] items-center justify-center px-5 py-16">
        <Text
          className="mb-8 text-center text-4xl font-bold text-white"
          style={{ fontFamily: 'Merriweather_700Bold' }}
        >
          QUI est mon candidat{'\u00A0'}idéal{'\u00A0'}?
        </Text>

        <QuizzButton onPress={() => navigation.navigate('Themes')}>
          Répondre au Quizz
        </QuizzButton>

        <Text
          className="mt-10 px-4 text-center text-base leading-8 text-white/80"
          style={{ fontFamily: 'MerriweatherSans_300Light' }}
        >
          Répondez de façon <Text className="font-bold text-white">anonyme</Text> au
          Quizz{'\u00A0'}du{'\u00A0'}Berger pour connaître le ou les candidats
          <Text className="font-bold text-white"> de l'élection présidentielle de 2027</Text> qui
          se rapprochent le plus de vos idées, et
          <Text className="font-bold text-white"> faites{'\u00A0'}votre{'\u00A0'}choix{'\u00A0'}!</Text>
        </Text>

        <Pressable className="mt-8" onPress={() => navigation.navigate('Login')}>
          <Text
            className="text-center text-sm text-white/70"
            style={{ fontFamily: 'MerriweatherSans_400Regular' }}
          >
            Vous avez enregistré vos résultats ?{' '}
            <Text className="font-bold text-white/90">Connectez-vous</Text>
          </Text>
        </Pressable>
      </View>

      {/* How it works */}
      <View className="items-center bg-white px-5 py-16">
        <Text
          className="mb-10 text-center text-2xl font-bold text-quizz-dark"
          style={{ fontFamily: 'Merriweather_700Bold' }}
        >
          Comment ça marche ?
        </Text>

        {/* Step 1 */}
        <View className="mb-10 items-center">
          <View className="mb-3 h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
            <Text className="font-bold text-quizz-dark">1</Text>
          </View>
          <Text className="text-center text-base text-quizz-dark">
            Répondez aux questions que vous voulez
          </Text>
        </View>

        {/* Step 2 */}
        <View className="mb-10 items-center">
          <View className="mb-3 h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
            <Text className="font-bold text-quizz-dark">2</Text>
          </View>
          <Text className="text-center text-base text-quizz-dark">
            Comparez votre pensée à celle des candidats
          </Text>
          <Text className="mt-2 px-6 text-center text-xs text-quizz-dark/60">
            Le classement général est une chose, celui thème par thème vous aidera à mieux choisir votre candidat.
          </Text>
        </View>

        {/* Step 3 */}
        <View className="mb-10 items-center">
          <View className="mb-3 h-8 w-8 items-center justify-center rounded-full bg-yellow-400">
            <Text className="font-bold text-quizz-dark">3</Text>
          </View>
          <Text className="text-center text-base text-quizz-dark">
            Confrontez vos convictions avec vos amis !
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View className="items-center bg-quizz-dark px-5 py-16">
        <Text
          className="text-center text-2xl font-bold text-white"
          style={{ fontFamily: 'Merriweather_700Bold' }}
        >
          {Intl.NumberFormat('fr').format(countUsers)} quizz effectués
        </Text>
        <Text
          className="mt-4 text-center text-2xl font-bold text-white"
          style={{ fontFamily: 'Merriweather_700Bold' }}
        >
          {Intl.NumberFormat('fr').format(countAnswers)} réponses données
        </Text>
      </View>
    </ScrollView>
  );
}
