import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Quizz du Berger',
  slug: 'quizz-du-berger',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  scheme: 'quizz-du-berger',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#111827',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.ambroselli.quizzduberger',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#111827',
    },
    package: 'com.ambroselli.quizzduberger',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-font'],
});
