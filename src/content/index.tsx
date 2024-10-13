import { NavigationContainer } from "@react-navigation/native";
import DrawerGroup from "./DrawerGroup";
import { useAuth } from "../context/AuthProvider";
import LoadingScreen from "../../lib/@core/components/LoadingScreen";
import StackGroup from "./StackGroup";

const Content = () => {
  return (
    <NavigationContainer>
      <StackGroup />
    </NavigationContainer>
  );
};

export default Content;
