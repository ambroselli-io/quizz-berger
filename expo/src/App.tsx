import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Merriweather_400Regular,
  Merriweather_700Bold,
  Merriweather_300Light,
} from '@expo-google-fonts/merriweather';
import {
  MerriweatherSans_300Light,
  MerriweatherSans_400Regular,
  MerriweatherSans_700Bold,
} from '@expo-google-fonts/merriweather-sans';
import Navigator from './Navigator';
import BottomTabBar from './components/BottomTabBar';
import type { RootStackParamList } from './types/navigation';
import useSyncQuizz from './hooks/useSyncQuizz';
import storage from './utils/storage';

SplashScreen.preventAutoHideAsync();

const navigationRef = createNavigationContainerRef<RootStackParamList>();

export default function App() {
  const [storageReady, setStorageReady] = useState(false);
  const [routeName, setRouteName] = useState<keyof RootStackParamList>();
  const syncRouteName = () => setRouteName(navigationRef.getCurrentRoute()?.name);
  const [fontsLoaded] = useFonts({
    Merriweather_300Light,
    Merriweather_400Regular,
    Merriweather_700Bold,
    MerriweatherSans_300Light,
    MerriweatherSans_400Regular,
    MerriweatherSans_700Bold,
  });

  useSyncQuizz();

  useEffect(() => {
    storage.init().then(() => setStorageReady(true));
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && storageReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, storageReady]);

  if (!fontsLoaded || !storageReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer ref={navigationRef} onReady={syncRouteName} onStateChange={syncRouteName}>
        <View style={{ flex: 1 }}>
          <Navigator />
          <BottomTabBar navigation={navigationRef} routeName={routeName} />
        </View>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
