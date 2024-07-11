import { SafeAreaProvider } from "react-native-safe-area-context";
import { configureAxios } from "./lib/@core/configs/axiosConfig";
import Content from "./src/content";
import { StatusBar } from "expo-status-bar";
import LoadingScreen from "./lib/@core/components/LoadingScreen";
import { Suspense } from "react";
import "fast-text-encoding";
import moment from "moment";
import Toast from "react-native-toast-message";

moment.locale("tr");
const axiosConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "https://api.gymguru.com.tr",
};

configureAxios(axiosConfig);

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Content />
      </SafeAreaProvider>
      <Toast />
    </Suspense>
  );
}
