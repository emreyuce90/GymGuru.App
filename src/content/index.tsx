import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import DrawerGroup from "./DrawerGroup";

const Content = () => {
  return (
    <NavigationContainer>
      <DrawerGroup />
    </NavigationContainer>
  );
};

export default Content;
