import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigation from "./TabNavigation";
import StackGroup from "./StackGroup";

const Drawer = createDrawerNavigator();

function DrawerGroup() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="StackGroup" component={StackGroup} />
    </Drawer.Navigator>
  );
}

export default DrawerGroup;
