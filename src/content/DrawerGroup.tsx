import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigation from "./TabNavigation";

const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{
          title: "Home",
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerGroup;
