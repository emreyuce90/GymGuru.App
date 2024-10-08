import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import DrawerGroup from "./DrawerGroup";
import { useAuth } from "../context/AuthProvider";
import { useEffect } from "react";

const Content = () => {
  return (
    <NavigationContainer>
      <DrawerGroup />
    </NavigationContainer>
  );
};

export default Content;
