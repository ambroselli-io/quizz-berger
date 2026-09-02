import React, { useLayoutEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/types/navigation';
import API from '~/services/api';
import useQuizz from '~/hooks/useQuizz';
import useUser from '~/hooks/useUser';
import useUserAnswers from '~/hooks/useUserAnswers';
import QuizzButton from '~/components/QuizzButton';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'Feedback'>;

const copy = {
  question: {
    title: 'Votre avis sur la question',
    intro:
      "Une formulation ambiguë, une réponse qui manque, une position mal résumée ? Dites-le nous, nous relisons chaque message.",
    placeholder: 'Ce qui ne va pas, ce qui manque, ce que vous proposez…',
    button: 'Envoyer mon avis',
  },
  testimony: {
    title: 'Votre témoignage',
    intro:
      "Qu'est-ce que le Quizz du Berger vous a appris, ou fait découvrir ? Votre témoignage pourra être publié sur le site, avec votre pseudo.",
    placeholder: 'Deux ou trois phrases suffisent…',
    button: 'Envoyer mon témoignage',
  },
} as const;

export default function FeedbackScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { kind, themeId, questionId } = route.params;
  const { quizz } = useQuizz();
  const { user } = useUser();
  const { userAnswers } = useUserAnswers();

  const [pseudo, setPseudo] = useState(user?.pseudo ?? '');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const texts = copy[kind];

  useLayoutEffect(() => {
    navigation.setOptions({ title: texts.title });
  }, [navigation, texts.title]);

  const question = useMemo(() => {
    if (kind !== 'question') return null;
    const theme = quizz.find((t) => t._id === themeId);
    const found = theme?.questions.find((q) => q._id === questionId);
    if (!theme || !found) return null;
    const answerIndex = userAnswers.find((a) => a.questionId === questionId)?.answerIndex;
    return {
      theme: theme.fr,
      fr: found.fr,
      answers: found.answers,
      userAnswer: answerIndex === undefined ? null : found.answers[answerIndex],
    };
  }, [kind, quizz, themeId, questionId, userAnswers]);

  const canSend = message.trim().length > 0 && !isLoading && !isSent;

  const send = async () => {
    if (!canSend) return;
    setIsLoading(true);
    const lines = [
      `De: ${pseudo || '(anonyme)'}`,
      `Email: ${email || '(non renseigné)'}`,
      `Plateforme: app ${Platform.OS}`,
      `Utilisateur: ${user?._id ?? '(inconnu)'}`,
    ];
    if (question) {
      lines.push(
        `Thème: ${question.theme}`,
        `Question: ${questionId}`,
        `Intitulé: ${question.fr}`,
        `Réponses proposées: ${question.answers.join(' | ')}`,
        `Réponse de l'utilisateur: ${question.userAnswer ?? '(pas encore répondu)'}`,
      );
    }
    lines.push('', message.trim());
    const subject =
      kind === 'question'
        ? `[App] Avis sur la question ${questionId}`
        : `[App] Témoignage de ${pseudo || 'un utilisateur'}`;
    const response = await API.post({ path: '/feedback', body: { text: lines.join('\n'), subject } });
    setIsLoading(false);
    if (!response?.ok) {
      Alert.alert('Erreur', response?.error || "Le message n'est pas parti, réessayez dans un instant.");
      return;
    }
    setIsSent(true);
    Alert.alert('Merci !', 'Votre message est bien envoyé.');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 12 }} keyboardShouldPersistTaps="handled">
        <Text className="text-sm text-quizz-dark/80" style={{ fontFamily: 'MerriweatherSans_400Regular' }}>
          {texts.intro}
        </Text>

        {question && (
          <View className="rounded-lg bg-gray-100 px-3 py-2">
            <Text className="text-xs text-gray-500">{question.theme}</Text>
            <Text className="mt-1 text-sm font-semibold text-quizz-dark">{question.fr}</Text>
          </View>
        )}

        <Text className="mt-2 text-sm font-medium text-quizz-dark">Votre message *</Text>
        <TextInput
          className="min-h-[120px] rounded-lg border border-gray-300 px-3 py-2.5 text-base"
          placeholder={texts.placeholder}
          value={message}
          onChangeText={setMessage}
          multiline
          textAlignVertical="top"
          autoFocus
        />

        <Text className="text-sm font-medium text-quizz-dark">Nom / pseudo</Text>
        <TextInput
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-base"
          placeholder="Votre nom ou pseudo"
          value={pseudo}
          onChangeText={setPseudo}
          autoCapitalize="none"
          autoComplete="name"
        />

        <Text className="text-sm font-medium text-quizz-dark">Email (si vous souhaitez une réponse)</Text>
        <TextInput
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-base"
          placeholder="Votre email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />

        <View className="mt-4 items-center">
          <QuizzButton onPress={send} disabled={!canSend}>
            {isLoading ? 'Envoi…' : texts.button}
          </QuizzButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
