import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import {
  ProgrammeDetail,
  MovementDetail,
  SubProgrammes,
  SubProgrammeDetail,
} from "../screens";

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
      <Stack.Screen name="SubProgrammes" component={SubProgrammes} />
      <Stack.Screen name="SubProgrammeDetail" component={SubProgrammeDetail} />
    </Stack.Navigator>
  );
}

export default StackGroup;
