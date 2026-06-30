import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Quizz du Berger",
  slug: "quizz-du-berger",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "quizz-du-berger",
  assetBundlePatterns: ["**/*"],
  userInterfaceStyle: "light",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ambroselli.quizzduberger",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#F3CE49"
    },
    package: "com.ambroselli.quizzduberger"
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  plugins: [
    "expo-font",
    "expo-image",
    "expo-status-bar",
    "@vonovak/react-native-theme-control",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#000000",
        image: "./assets/splash.png",
        imageHeight: 150,
        imageWidth: 150,
        resizeMode: "contain"
      }
    ]
  ],
  extra: {
    eas: {
      projectId: "3df55bb5-7cc9-47ab-838b-0529193778fc"
    },
    updates: {
      url: "https://u.expo.dev/3df55bb5-7cc9-47ab-838b-0529193778fc"
    },
    runtimeVersion: {
      policy: "appVersion"
    }
  }
});
