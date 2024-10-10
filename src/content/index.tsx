import { NavigationContainer } from "@react-navigation/native";
import DrawerGroup from "./DrawerGroup";
import { useAuth } from "../context/AuthProvider";
import LoadingScreen from "../../lib/@core/components/LoadingScreen";

const Content = () => {
  return (
    <NavigationContainer>
      <DrawerGroup />
    </NavigationContainer>
  );
};

export default Content;
