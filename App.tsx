import { SafeAreaProvider } from "react-native-safe-area-context";
import { configureAxios } from "./lib/@core/configs/axiosConfig";
import Content from "./src/content";
import { StatusBar } from "expo-status-bar";
import LoadingScreen from "./lib/@core/components/LoadingScreen";
import { Suspense, useEffect, useRef } from "react";
import moment from "moment";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./src/context/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import StackGroup from "./src/content/StackGroup";

moment.locale("tr");
const axiosConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "https://api.gymguru.com.tr",
};
configureAxios(axiosConfig);
export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <NavigationContainer>
            <StackGroup />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
      <Toast />
    </Suspense>
  );
}
