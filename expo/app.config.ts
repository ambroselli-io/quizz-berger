import { ExpoConfig, ConfigContext } from "expo/config";

const version = "1.2.0";
const buildNumber = "8";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Quizz du Berger",
  slug: "quizz-du-berger",
  version,
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "quizz-du-berger",
  assetBundlePatterns: ["**/*"],
  userInterfaceStyle: "light",
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.ambroselli.quizzduberger",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      CFBundleDevelopmentRegion: "fr",
      CFBundleLocalizations: ["fr"]
    },
    buildNumber
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#F3CE49"
    },
    package: "com.ambroselli.quizzduberger",
    versionCode: Number(buildNumber)
  },
  web: {
    favicon: "./assets/favicon.png"
  },
  plugins: [
    "expo-font",
    "expo-image",
    "expo-status-bar",
    "@vonovak/react-native-theme-control",
    // Source maps / dSYM upload at build time; the token comes from SENTRY_AUTH_TOKEN or ~/.sentryclirc.
    ["@sentry/react-native", { organization: "arnaud-ambroselli", project: "quizz-du-berger-expo" }],
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
  updates: {
    url: "https://u.expo.dev/3df55bb5-7cc9-47ab-838b-0529193778fc"
  },
  runtimeVersion: {
    policy: "appVersion"
  },
  extra: {
    eas: {
      projectId: "3df55bb5-7cc9-47ab-838b-0529193778fc"
    }
  }
});
