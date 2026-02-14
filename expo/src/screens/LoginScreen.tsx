import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/navigation';
import API from '~/services/api';
import useUser from '~/hooks/useUser';
import QuizzButton from '~/components/QuizzButton';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const { user, mutate } = useUser();
  const [isSignUp, setIsSignUp] = useState(!user?._id);
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const response = await API.post({ path: '/user/login', body: { pseudo, password } });
    setIsLoading(false);
    if (!response?.ok) {
      return Alert.alert('Erreur', response.error || 'Erreur de connexion');
    }
    mutate(response.data);
    navigation.goBack();
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    let response;
    if (user?._id) {
      response = await API.put({ path: '/user', body: { pseudo, password, passwordConfirm, isPublic } });
    } else {
      response = await API.post({ path: '/user/signup', body: { pseudo, password, passwordConfirm, isPublic } });
    }
    setIsLoading(false);
    if (!response?.ok) {
      return Alert.alert('Erreur', response.error || "Erreur d'inscription");
    }
    mutate(response.data);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }}>
        {/* Toggle */}
        <View className="mb-4 flex-row rounded-lg bg-gray-100 p-1">
          <Pressable
            onPress={() => setIsSignUp(false)}
            className={`flex-1 items-center rounded-md py-2.5 ${!isSignUp ? 'bg-white' : ''}`}
          >
            <Text className={`text-sm font-medium ${!isSignUp ? 'text-quizz-dark' : 'text-gray-500'}`}>
              Connexion
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setIsSignUp(true)}
            className={`flex-1 items-center rounded-md py-2.5 ${isSignUp ? 'bg-white' : ''}`}
          >
            <Text className={`text-sm font-medium ${isSignUp ? 'text-quizz-dark' : 'text-gray-500'}`}>
              Inscription
            </Text>
          </Pressable>
        </View>

        <Text className="text-sm font-medium text-quizz-dark">Pseudo</Text>
        <TextInput
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-base"
          placeholder="Votre pseudo"
          autoCapitalize="none"
          autoComplete="username"
          value={pseudo}
          onChangeText={setPseudo}
        />

        <Text className="text-sm font-medium text-quizz-dark">Mot de passe</Text>
        <TextInput
          className="rounded-lg border border-gray-300 px-3 py-2.5 text-base"
          placeholder="Votre mot de passe"
          secureTextEntry
          autoComplete={isSignUp ? 'new-password' : 'password'}
          value={password}
          onChangeText={setPassword}
        />

        {isSignUp && (
          <>
            <Text className="text-sm font-medium text-quizz-dark">Confirmation</Text>
            <TextInput
              className="rounded-lg border border-gray-300 px-3 py-2.5 text-base"
              placeholder="Confirmez votre mot de passe"
              secureTextEntry
              autoComplete="new-password"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
            <Pressable
              className="flex-row items-center gap-2"
              onPress={() => setIsPublic(!isPublic)}
            >
              <View
                className={`h-5 w-5 items-center justify-center rounded border ${
                  isPublic ? 'border-quizz-dark bg-quizz-dark' : 'border-gray-300 bg-white'
                }`}
              >
                {isPublic && <Text className="text-xs text-white">✓</Text>}
              </View>
              <Text className="flex-1 text-sm text-quizz-dark">
                Permettre le partage à mes amis, si je leur transmet mon pseudo
              </Text>
            </Pressable>
          </>
        )}

        <QuizzButton
          onPress={isSignUp ? handleSignUp : handleLogin}
          disabled={isLoading}
        >
          {isLoading
            ? isSignUp ? 'Inscription...' : 'Connexion...'
            : isSignUp ? "S'inscrire" : 'Se connecter'}
        </QuizzButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
