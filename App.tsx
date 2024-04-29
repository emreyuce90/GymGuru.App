import { configureAxios } from "./lib/@core/configs/axiosConfig";
import Content from "./src/content";

const axiosConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "https://api.gymguru.com.tr",
};

configureAxios(axiosConfig);

export default function App() {
  return <Content />;
}
