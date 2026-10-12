import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, ScrollView, Linking, Alert, Keyboard, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParamList } from '~/types/navigation';
import useUser from '~/hooks/useUser';
import useStore from '~/zustand/store';

type IconName = React.ComponentProps<typeof Feather>['name'];

const WEB_URL = 'https://www.quizz-du-berger.com';
const ACTIVE = '#eab308';
const INACTIVE = '#6b7280';

// Full-screen flows and modals draw their own chrome.
const HIDDEN_ON: (keyof RootStackParamList)[] = ['Question', 'Login', 'Share', 'Feedback'];

const Tab = ({ label, icon, active, onPress }: { label: string; icon: IconName; active: boolean; onPress: () => void }) => (
  <Pressable onPress={onPress} className="flex-1 items-center gap-0.5 pt-1.5" accessibilityRole="button" accessibilityLabel={label}>
    <Feather name={icon} size={22} color={active ? ACTIVE : INACTIVE} />
    <Text className="text-[10px]" style={{ color: active ? ACTIVE : INACTIVE, fontFamily: 'MerriweatherSans_400Regular' }}>
      {label}
    </Text>
  </Pressable>
);

const MoreItem = ({ label, icon, onPress }: { label: string; icon: IconName; onPress: () => void }) => (
  <Pressable onPress={onPress} className="flex-row items-center gap-3 rounded-lg px-4 py-3 active:bg-gray-100">
    <Feather name={icon} size={20} color="#374151" />
    <Text className="text-base text-gray-700" style={{ fontFamily: 'MerriweatherSans_400Regular' }}>
      {label}
    </Text>
  </Pressable>
);

// Lives outside the stack navigator, so it gets the container ref and the current route from App.
export default function BottomTabBar({
  navigation,
  routeName,
}: {
  navigation: NavigationContainerRefWithCurrent<RootStackParamList>;
  routeName?: keyof RootStackParamList;
}) {
  const insets = useSafeAreaInsets();
  const { user, logout } = useUser();
  const [moreOpen, setMoreOpen] = useState(false);
  const [keyboardShown, setKeyboardShown] = useState(false);

  // Android resizes the window (adjustResize), which would lift the bar above the keyboard. On iOS the
  // keyboard simply covers it: hiding it there would resize the screen under a KeyboardAvoidingView
  // after it has computed its padding, leaving a gap above the keyboard.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardShown(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardShown(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  if (!routeName || HIDDEN_ON.includes(routeName) || keyboardShown) return null;

  const onLogout = () => {
    const hasPseudo = !!user?.pseudo;
    Alert.alert(
      hasPseudo ? 'Déconnexion' : 'Recommencer',
      hasPseudo ? 'Voulez-vous vous déconnecter ?' : 'Voulez-vous vraiment effacer vos réponses et recommencer à zéro ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: hasPseudo ? 'Se déconnecter' : 'Recommencer',
          style: 'destructive',
          onPress: async () => {
            await logout();
            useStore.getState().setUserAnswers([]);
            useStore.getState().setHiddenCandidates([]);
            navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
          },
        },
      ],
    );
  };

  const go = (action: () => void) => () => {
    setMoreOpen(false);
    action();
  };
  const openWeb = (path: string) => go(() => Linking.openURL(`${WEB_URL}${path}`));

  return (
    <>
      <View
        className="flex-row border-t border-gray-200 bg-white"
        style={{ height: 64 + insets.bottom, paddingBottom: insets.bottom }}
      >
        <Tab label="IA" icon="message-circle" active={routeName === 'ChatModes' || routeName === 'Chat'} onPress={() => navigation.navigate('ChatModes')} />
        <Tab label="Quizz" icon="play" active={routeName === 'Themes'} onPress={() => navigation.navigate('Themes')} />
        <Tab label="Contact" icon="mail" active={false} onPress={() => navigation.navigate('Feedback', { kind: 'contact' })} />
        {user?.isLoggedIn ? (
          <Tab label={user?.pseudo ? 'Déconnexion' : 'Recommencer'} icon="log-out" active={false} onPress={onLogout} />
        ) : (
          <Tab label="Connexion" icon="log-in" active={false} onPress={() => navigation.navigate('Login')} />
        )}
        <Tab label="Plus" icon="more-horizontal" active={moreOpen} onPress={() => setMoreOpen(true)} />
      </View>

      <Modal visible={moreOpen} transparent animationType="slide" onRequestClose={() => setMoreOpen(false)}>
        <Pressable className="flex-1 bg-black/50" onPress={() => setMoreOpen(false)} />
        <View className="max-h-[85%] rounded-t-2xl bg-white" style={{ paddingBottom: insets.bottom }}>
          <Pressable onPress={() => setMoreOpen(false)} hitSlop={8} className="absolute right-3 top-3 z-10 p-2" accessibilityLabel="Fermer">
            <Feather name="x" size={24} color="#374151" />
          </Pressable>
          <ScrollView contentContainerStyle={{ paddingVertical: 8, paddingHorizontal: 8 }}>
            <MoreItem label="Toutes les questions" icon="list" onPress={go(() => navigation.navigate('AllQuestions', undefined))} />
            {user?.isLoggedIn && (
              <MoreItem label="Mes résultats" icon="bar-chart-2" onPress={go(() => navigation.navigate('Result', undefined))} />
            )}
            <MoreItem label="Soutenir le projet" icon="heart" onPress={openWeb('/soutenir')} />
            <MoreItem label="Statistiques" icon="trending-up" onPress={openWeb('/stats')} />
            <MoreItem label="Tous les candidats" icon="user" onPress={openWeb('/candidats')} />
            <MoreItem label="Tous les sujets" icon="layers" onPress={openWeb('/sujets')} />
            <MoreItem label="Comparer les candidats" icon="repeat" onPress={openWeb('/comparer')} />
            <MoreItem label="Blog" icon="book-open" onPress={openWeb('/blog')} />
            <MoreItem label="Mentions légales" icon="file-text" onPress={openWeb('/confidentialite')} />
            <MoreItem label="Qui sommes-nous ?" icon="users" onPress={openWeb('/qui-sommes-nous')} />
            <MoreItem label="Open-source" icon="github" onPress={go(() => Linking.openURL('https://github.com/ambroselli-io/quizz-berger'))} />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}
