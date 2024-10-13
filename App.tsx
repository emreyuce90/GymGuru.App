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

export default function App() {
  const navigationRef = useRef(null);
  useEffect(() => {
    const axiosConfig = {
      baseURL: process.env.EXPO_PUBLIC_API_URL ?? "https://api.gymguru.com.tr",
    };

    const interval = setInterval(() => {
      if (navigationRef.current) {
        clearInterval(interval);
        configureAxios(axiosConfig, navigationRef);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <NavigationContainer ref={navigationRef}>
            <StackGroup />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
      <Toast />
    </Suspense>
  );
}
