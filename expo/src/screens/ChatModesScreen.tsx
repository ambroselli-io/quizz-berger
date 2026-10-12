import React, { useCallback, useState } from 'react';
import { ScrollView, Text, Pressable, View, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/navigation';
import API from '~/services/api';
import useUser from '~/hooks/useUser';
import candidatesAnswers from '~/shared/candidates-answers.json';
import type { ChatSummary } from '~/services/chat';
import { AI_DISCLAIMER, chatModes, getChatMode } from '~/utils/chatModes';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ChatModesScreen() {
  const navigation = useNavigation<Nav>();
  const { user } = useUser();
  const hasAccount = !!user.isLoggedIn && !!user.pseudo;
  const [chats, setChats] = useState<ChatSummary[]>([]);

  // Refreshed on every return to this screen: a conversation may have been started or deleted meanwhile.
  useFocusEffect(
    useCallback(() => {
      if (!hasAccount) return;
      API.get({ path: '/chat' }).then((res) => {
        if (res?.ok) setChats(res.data);
      });
    }, [hasAccount]),
  );

  const remove = (chatId: string) => {
    Alert.alert('Supprimer', 'Supprimer définitivement cette discussion ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          const res = await API.delete({ path: `/chat/${chatId}` });
          if (res?.ok) setChats((list) => list.filter((c) => c.id !== chatId));
        },
      },
    ]);
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 20, gap: 16 }}>
      <Text className="text-base leading-6 text-quizz-dark" style={{ fontFamily: 'MerriweatherSans_400Regular' }}>
        Une IA qui n'a pas le droit de te dire pour qui voter, ni si tes idées sont bonnes ou mauvaises. Tu n'es pas un
        mouton : elle est là pour t'aider à réfléchir, pas pour penser à ta place.
      </Text>
      {chatModes.map((chatMode) => (
        <Pressable
          key={chatMode.mode}
          onPress={() => navigation.navigate('Chat', { mode: chatMode.mode })}
          className="rounded-2xl border-2 border-gray-200 p-5 active:border-quizz-yellow"
        >
          <Text className="mb-2 text-xl text-quizz-dark" style={{ fontFamily: 'Merriweather_700Bold' }}>
            {chatMode.title}
          </Text>
          <Text className="text-base leading-6 text-gray-700" style={{ fontFamily: 'MerriweatherSans_400Regular' }}>
            {chatMode.description}
          </Text>
        </Pressable>
      ))}
      {chats.length > 0 && (
        <View className="gap-2">
          <Text className="mt-4 text-xl text-quizz-dark" style={{ fontFamily: 'Merriweather_700Bold' }}>
            Tes discussions
          </Text>
          {chats.map((chat) => {
            const candidate = candidatesAnswers.find((c) => c.id === chat.candidateId);
            return (
              <View key={chat.id} className="flex-row items-start gap-3 rounded-xl border border-gray-200 p-3">
                <Pressable
                  className="flex-1"
                  onPress={() => navigation.navigate('Chat', { mode: chat.mode, chatId: chat.id })}
                >
                  <Text className="text-sm text-quizz-dark" style={{ fontFamily: 'MerriweatherSans_700Bold' }}>
                    {getChatMode(chat.mode).title}
                    {candidate ? ` : ${candidate.pseudo}` : ''}
                  </Text>
                  <Text numberOfLines={1} className="text-sm text-gray-600" style={{ fontFamily: 'MerriweatherSans_400Regular' }}>
                    {chat.preview}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    {new Date(chat.updatedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                  </Text>
                </Pressable>
                <Pressable onPress={() => remove(chat.id)} hitSlop={8}>
                  <Text className="text-xs text-gray-500 underline">Supprimer</Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}
      <Text className="text-center text-sm text-gray-500" style={{ fontFamily: 'MerriweatherSans_400Regular' }}>
        {AI_DISCLAIMER}
      </Text>
    </ScrollView>
  );
}
