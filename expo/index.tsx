import "./global.css";
import { registerRootComponent } from "expo";
import * as Sentry from "@sentry/react-native";
import App from "./src/App";
import { setThemePreference } from "@vonovak/react-native-theme-control";

setThemePreference("light"); // 'light', 'dark', or 'system'

Sentry.init({
  dsn: "https://d9b98ae5acea179959bbb01eb2e5ad9d@o117731.ingest.us.sentry.io/4512281497501696",
  environment: "production",
  enabled: !__DEV__,
  tracesSampleRate: 0.05,
  ignoreErrors: ["Network request failed", "AbortError: The operation was aborted"],
});

registerRootComponent(Sentry.wrap(App));
