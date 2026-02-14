import React from 'react';
import { View, Text, Pressable, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useUser from '~/hooks/useUser';
import API from '~/services/api';
import QuizzButton from '~/components/QuizzButton';

export default function ShareScreen() {
  const navigation = useNavigation();
  const { user, mutate } = useUser();

  const makePublic = async () => {
    const response = await API.put({ path: '/user', body: { isPublic: true } });
    if (response.ok) mutate(response.data);
  };

  const shareResults = async () => {
    if (!user?.isPublic) {
      await makePublic();
    }
    try {
      await Share.share({
        title: 'Quizz du Berger',
        message: `Découvre mes résultats au Quizz du Berger ! Mon pseudo : ${user?.pseudo}\nhttps://quizz-du-berger.com/result/${user?.pseudo}`,
      });
    } catch (err: any) {
      console.log('Share error:', err);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text
        className="mb-6 text-center text-xl font-bold text-quizz-dark"
        style={{ fontFamily: 'Merriweather_700Bold' }}
      >
        Partagez vos résultats
      </Text>

      <Text className="mb-8 text-center text-sm text-gray-600">
        Partagez votre pseudo avec vos amis pour qu'ils puissent comparer leurs résultats avec les vôtres.
      </Text>

      {user?.pseudo && (
        <View className="mb-8 rounded-lg bg-gray-50 px-6 py-4">
          <Text className="text-center text-sm text-gray-500">Votre pseudo</Text>
          <Text className="text-center text-lg font-bold text-quizz-dark" selectable>
            {user.pseudo}
          </Text>
        </View>
      )}

      <QuizzButton onPress={shareResults}>
        Partager avec mes amis
      </QuizzButton>

      <Pressable className="mt-4" onPress={() => navigation.goBack()}>
        <Text className="text-sm text-gray-500">Fermer</Text>
      </Pressable>
    </View>
  );
}
