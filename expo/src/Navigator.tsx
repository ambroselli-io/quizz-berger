import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '~/types/navigation';
import HomeScreen from '~/screens/HomeScreen';
import ThemesScreen from '~/screens/ThemesScreen';
import QuestionScreen from '~/screens/QuestionScreen';
import ResultScreen from '~/screens/ResultScreen';
import LoginScreen from '~/screens/LoginScreen';
import AllQuestionsScreen from '~/screens/AllQuestionsScreen';
import FilterCandidatesScreen from '~/screens/FilterCandidatesScreen';
import ShareScreen from '~/screens/ShareScreen';
import Header from '~/components/Header';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <Header {...props} />,
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
        options={{
          title: 'Choisissez un thème',
          headerBackTitle: 'Accueil',
        }}
      />
      <Stack.Screen
        name="Question"
        component={QuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{
          title: 'Résultats',
          headerBackTitle: 'Thèmes',
        }}
      />
      <Stack.Screen
        name="AllQuestions"
        component={AllQuestionsScreen}
        options={{
          title: 'Toutes les questions',
          headerBackTitle: 'Résultats',
        }}
      />
      <Stack.Screen
        name="FilterCandidates"
        component={FilterCandidatesScreen}
        options={{
          title: 'Filtrer les candidats',
          headerBackTitle: 'Résultats',
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Connexion',
          headerBackTitle: 'Fermer',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Share"
        component={ShareScreen}
        options={{
          title: 'Partager',
          headerBackTitle: 'Fermer',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
}
