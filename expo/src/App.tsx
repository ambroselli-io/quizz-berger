import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
import storage from './utils/storage';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [storageReady, setStorageReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Merriweather_300Light,
    Merriweather_400Regular,
    Merriweather_700Bold,
    MerriweatherSans_300Light,
    MerriweatherSans_400Regular,
    MerriweatherSans_700Bold,
  });

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
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
