import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import { ProgrammeDetail, MovementDetail } from "../screens";

function StackGroup() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabGroup"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MovementDetail" component={MovementDetail} />
      <Stack.Screen name="ProgrammeDetail" component={ProgrammeDetail} />
    </Stack.Navigator>
  );
}

export default StackGroup;
