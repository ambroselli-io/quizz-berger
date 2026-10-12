import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '~/types/navigation';
import API from '~/services/api';
import useUser from '~/hooks/useUser';
import QuizzButton from '~/components/QuizzButton';
import CandidateAvatar from '~/components/CandidateAvatar';
import candidatesAnswers from '~/shared/candidates-answers.json';
import { sendChatMessage, type Chat, type DonationInfo } from '~/services/chat';
import {
  AI_DISCLAIMER,
  CANDIDATE_DISCLAIMER,
  DONATION_URL,
  SUPPORTER_PERKS,
  formatCost,
  getChatMode,
} from '~/utils/chatModes';

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'Chat'>;

const font = (name: string) => ({ fontFamily: name });

const DonationModal = ({
  isVisible,
  donation,
  onClose,
}: {
  isVisible: boolean;
  donation: DonationInfo | null;
  onClose: () => void;
}) => {
  const [step, setStep] = useState<'ask' | 'claim' | 'sent'>('ask');
  const [tipeeePseudo, setTipeeePseudo] = useState('');
  const [amount, setAmount] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const close = () => {
    setStep('ask');
    setError('');
    onClose();
  };

  const submit = async () => {
    if (!tipeeePseudo.trim() || !amount.trim()) {
      setError('Indique ton pseudo Tipeee et le montant de ton don.');
      return;
    }
    setIsSending(true);
    setError('');
    const res = await API.post({ path: '/supporter/claim', body: { tipeeePseudo, amount } });
    setIsSending(false);
    if (!res?.ok) {
      setError(res?.error ?? "Ta déclaration n'a pas pu être envoyée, réessaie dans quelques instants.");
      return;
    }
    setStep('sent');
  };

  const paragraph = (text: string) => (
    <Text className="text-base leading-6" style={font('MerriweatherSans_400Regular')}>
      {text}
    </Text>
  );

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={close}>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View className="flex-1 justify-end bg-black/60">
          <View className="gap-4 rounded-t-3xl bg-white p-6 pb-10">
            <Text className="text-center text-xl text-quizz-dark" style={font('Merriweather_700Bold')}>
              Un petit coup de main ?
            </Text>
            {step === 'ask' && (
              <>
                {donation &&
                  paragraph(
                    donation.previousChatsCount === 1
                      ? `Ta première discussion avec l'IA m'a coûté ${formatCost(donation.previousCostEur)}.`
                      : `Tes ${donation.previousChatsCount} discussions avec l'IA m'ont coûté ${formatCost(donation.previousCostEur)} en tout.`,
                  )}
                {paragraph(
                  "Je fais le Quizz du Berger tout seul. Il est gratuit et sans publicité, mais chaque message envoyé à l'IA m'est facturé.",
                )}
                {paragraph(
                  `Certains donnent, d'autres non, et c'est très bien comme ça. Mais si tu en as les moyens, un don sur Tipeee m'aiderait à rentrer dans mes frais. En échange : ${SUPPORTER_PERKS}`,
                )}
                {!!DONATION_URL && (
                  <QuizzButton onPress={() => Linking.openURL(DONATION_URL)}>Faire un don sur Tipeee</QuizzButton>
                )}
                <Pressable onPress={() => setStep('claim')} className="items-center rounded-full border-2 border-quizz-yellow px-6 py-3">
                  <Text className="text-base" style={font('MerriweatherSans_700Bold')}>
                    J'ai fait un don
                  </Text>
                </Pressable>
                <Pressable onPress={close} className="items-center rounded-full border-2 border-gray-200 px-6 py-3">
                  <Text className="text-base" style={font('MerriweatherSans_700Bold')}>
                    Continuer sans donner
                  </Text>
                </Pressable>
              </>
            )}
            {step === 'claim' && (
              <>
                {paragraph("Dis-moi sous quel pseudo tu as donné sur Tipeee : je vérifie, puis j'active ton accès.")}
                <TextInput
                  className="rounded-lg border border-gray-300 px-3 py-2.5 text-base"
                  placeholder="Ton pseudo sur Tipeee"
                  value={tipeeePseudo}
                  onChangeText={setTipeeePseudo}
                  autoCapitalize="none"
                  maxLength={100}
                />
                <TextInput
                  className="rounded-lg border border-gray-300 px-3 py-2.5 text-base"
                  placeholder="Le montant (ex. : 5 €, ou 2 € par mois)"
                  value={amount}
                  onChangeText={setAmount}
                  maxLength={20}
                />
                {!!error && <Text className="text-sm text-red-600">{error}</Text>}
                <QuizzButton onPress={submit} disabled={isSending}>
                  Envoyer
                </QuizzButton>
              </>
            )}
            {step === 'sent' && (
              <>
                {paragraph(
                  "Merci beaucoup ! Je vérifie ton don sur Tipeee et j'active ton accès dans les prochains jours. Tu n'as rien d'autre à faire.",
                )}
                <QuizzButton onPress={close}>Continuer la discussion</QuizzButton>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default function ChatScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Route>();
  const chatMode = getChatMode(params.mode);
  const isConvaincre = chatMode.mode === 'convaincre';
  const { user, isLoading } = useUser();
  const hasAccount = !!user.isLoggedIn && !!user.pseudo;

  const [candidateId, setCandidateId] = useState<string | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [donation, setDonation] = useState<DonationInfo | null>(null);
  const [showDonation, setShowDonation] = useState(false);
  const [error, setError] = useState('');
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  // chatId: an existing conversation picked up again from the list.
  const [isResuming, setIsResuming] = useState(!!params.chatId);
  const startedRef = useRef(!!params.chatId);
  const scrollRef = useRef<ScrollView>(null);

  const candidate = candidatesAnswers.find((c) => c.id === candidateId);

  useLayoutEffect(() => {
    navigation.setOptions({ title: candidate ? candidate.pseudo : chatMode.title });
  }, [navigation, candidate, chatMode.title]);

  useEffect(() => {
    if (!params.chatId || !hasAccount) return;
    API.get({ path: `/chat/${params.chatId}` }).then((res) => {
      if (res?.ok) {
        setChat(res.data);
        setCandidateId(res.data.candidateId);
      } else {
        setError(res?.error ?? 'Discussion introuvable');
      }
      setIsResuming(false);
    });
  }, [params.chatId, hasAccount]);

  const remove = () => {
    if (!chat) return;
    Alert.alert('Supprimer', 'Supprimer définitivement cette discussion ?', [
      { text: 'Annuler', style: 'cancel' },
      {
        text: 'Supprimer',
        style: 'destructive',
        onPress: async () => {
          const res = await API.delete({ path: `/chat/${chat.id}` });
          if (res?.ok) navigation.goBack();
          else setError(res?.error ?? "La discussion n'a pas pu être supprimée.");
        },
      },
    ]);
  };

  const startChat = async () => {
    setError('');
    setChat(null);
    const res = await API.post({ path: '/chat', body: { mode: chatMode.mode, candidateId } });
    if (!res?.ok) {
      setError(res?.error ?? 'Impossible de lancer la discussion, réessaie dans quelques instants.');
      return;
    }
    setChat(res.data);
    if (res.donation?.previousChatsCount > 0) {
      setDonation(res.donation);
      setShowDonation(true);
    }
  };

  useEffect(() => {
    if (!hasAccount || (isConvaincre && !candidateId) || startedRef.current) return;
    startedRef.current = true;
    startChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAccount, candidateId]);

  const restart = (resetCandidate: boolean) => {
    setChat(null);
    setError('');
    if (resetCandidate) {
      // The effect starts the next chat once a candidate is picked.
      startedRef.current = false;
      setCandidateId(null);
    } else {
      startChat();
    }
  };

  const send = async () => {
    const text = input.trim();
    if (!text || isSending || !chat) return;
    const before = chat.messages;
    const withUser = [...before, { role: 'user' as const, content: text }];
    setInput('');
    setError('');
    setIsSending(true);
    setChat((c) => c && { ...c, messages: [...withUser, { role: 'assistant', content: '' }] });
    const res = await sendChatMessage(chat.id, text, (reply) =>
      setChat((c) => c && { ...c, messages: [...withUser, { role: 'assistant', content: reply }] }),
    );
    if (res.ok) {
      const fresh = await API.get({ path: `/chat/${chat.id}` });
      if (fresh?.ok) setChat((c) => c && { ...c, costEur: fresh.data.costEur });
    } else {
      setChat((c) => c && { ...c, messages: before });
      setInput(text);
      setError(res.error);
    }
    setIsSending(false);
  };

  const disclaimer = (
    <Text className="rounded-lg bg-yellow-50 p-3 text-sm leading-5 text-gray-800" style={font('MerriweatherSans_400Regular')}>
      {AI_DISCLAIMER}
      {isConvaincre && ` ${CANDIDATE_DISCLAIMER}`}
    </Text>
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
      </View>
    );
  }

  if (!hasAccount) {
    return (
      <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 20, gap: 16 }}>
        <Text className="text-base leading-6" style={font('MerriweatherSans_400Regular')}>
          {chatMode.description}
        </Text>
        {disclaimer}
        <Text className="text-base leading-6" style={font('MerriweatherSans_400Regular')}>
          Chaque message envoyé à l'IA nous coûte de l'argent : pour discuter, il te faut un compte. Un pseudo et un mot
          de passe suffisent.
        </Text>
        <QuizzButton onPress={() => navigation.navigate('Login')}>Créer un compte ou se connecter</QuizzButton>
      </ScrollView>
    );
  }

  if (isConvaincre && !candidateId && !isResuming) {
    return (
      <ScrollView className="flex-1 bg-white" contentContainerStyle={{ padding: 20, gap: 12 }}>
        <Text className="text-xl text-quizz-dark" style={font('Merriweather_700Bold')}>
          Quel candidat veux-tu convaincre ?
        </Text>
        {disclaimer}
        {candidatesAnswers.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => setCandidateId(c.id)}
            className="flex-row items-center gap-3 rounded-xl border-2 border-gray-200 p-2 active:border-quizz-yellow"
          >
            <CandidateAvatar picture={c.picture} color={c.color} size={40} />
            <Text className="text-base" style={font('MerriweatherSans_400Regular')}>
              {c.pseudo}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    );
  }

  const userMessagesCount = chat?.messages.filter((m) => m.role === 'user').length ?? 0;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{ padding: 16, gap: 12 }}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {disclaimer}
        {chat?.messages.map((message, index) => (
          <View
            key={index}
            className={`flex-row items-end gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {message.role === 'assistant' && candidate && (
              <CandidateAvatar picture={candidate.picture} color={candidate.color} size={28} />
            )}
            <View
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${message.role === 'user' ? 'bg-quizz-dark' : 'bg-gray-100'}`}
            >
              <Text
                className={`text-base leading-6 ${message.role === 'user' ? 'text-white' : 'text-gray-900'}`}
                style={font('MerriweatherSans_400Regular')}
              >
                {message.content || '…'}
              </Text>
            </View>
          </View>
        ))}
        {!chat && !error && <ActivityIndicator />}
        {!!error && (
          <Text className="text-center text-sm text-red-600" style={font('MerriweatherSans_400Regular')}>
            {error}
          </Text>
        )}
        {chat && (
          <View className="gap-2">
            {userMessagesCount > 0 && (
              <Text className="text-xs text-gray-500" style={font('MerriweatherSans_400Regular')}>
                Cette discussion a coûté {formatCost(chat.costEur)} au Quizz du Berger.
              </Text>
            )}
            <View className="flex-row gap-4">
              <Pressable onPress={() => setShowDonation(true)} hitSlop={8}>
                <Text className="text-xs text-gray-500 underline">Faire un don</Text>
              </Pressable>
              {isConvaincre && (
                <Pressable onPress={() => restart(true)} hitSlop={8}>
                  <Text className="text-xs text-gray-500 underline">Changer de candidat</Text>
                </Pressable>
              )}
              <Pressable onPress={() => restart(false)} hitSlop={8}>
                <Text className="text-xs text-gray-500 underline">Nouvelle discussion</Text>
              </Pressable>
              {userMessagesCount > 0 && (
                <Pressable onPress={remove} hitSlop={8}>
                  <Text className="text-xs text-gray-500 underline">Supprimer</Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      </ScrollView>
      {chat && (
        <View className="flex-row items-end gap-2 border-t border-gray-200 bg-white p-3 pb-8">
          <TextInput
            className="max-h-32 flex-1 rounded-xl border border-gray-300 px-3 py-2.5 text-base"
            placeholder="Écris ton message…"
            value={input}
            onChangeText={setInput}
            maxLength={2000}
            multiline
            textAlignVertical="top"
          />
          <Pressable
            onPress={send}
            disabled={isSending || !input.trim()}
            className={`rounded-xl bg-quizz-yellow px-4 py-3 ${isSending || !input.trim() ? 'opacity-50' : ''}`}
          >
            <Text className="text-base text-quizz-dark" style={font('MerriweatherSans_700Bold')}>
              Envoyer
            </Text>
          </Pressable>
        </View>
      )}
      <DonationModal isVisible={showDonation} donation={donation} onClose={() => setShowDonation(false)} />
    </KeyboardAvoidingView>
  );
}
