import "./global.css";
import { registerRootComponent } from "expo";
import App from "./src/App";
import { setThemePreference } from "@vonovak/react-native-theme-control";

setThemePreference("light"); // 'light', 'dark', or 'system'

registerRootComponent(App);
