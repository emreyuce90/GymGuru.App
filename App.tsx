import { SafeAreaProvider } from "react-native-safe-area-context";
import { configureAxios } from "./lib/@core/configs/axiosConfig";
import Content from "./src/content";
import { StatusBar } from "expo-status-bar";

const axiosConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "https://api.gymguru.com.tr",
};

configureAxios(axiosConfig);

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Content />
    </SafeAreaProvider>
  );
}
