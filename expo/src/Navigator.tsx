import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/navigation';
import HomeScreen from '~/screens/HomeScreen';
import ThemesScreen from '~/screens/ThemesScreen';
import QuestionScreen from '~/screens/QuestionScreen';
import ResultScreen from '~/screens/ResultScreen';
import LoginScreen from '~/screens/LoginScreen';
import AllQuestionsScreen from '~/screens/AllQuestionsScreen';
import ShareScreen from '~/screens/ShareScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#111827' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontFamily: 'Merriweather_700Bold' },
        contentStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Themes"
        component={ThemesScreen}
        options={{ title: 'Choisissez un thème' }}
      />
      <Stack.Screen
        name="Question"
        component={QuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ title: 'Résultats' }}
      />
      <Stack.Screen
        name="AllQuestions"
        component={AllQuestionsScreen}
        options={{ title: 'Toutes les questions' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Connexion',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Share"
        component={ShareScreen}
        options={{
          title: 'Partager',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
