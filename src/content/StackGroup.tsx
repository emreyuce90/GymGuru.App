import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";

function StackGroup() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabGroup" component={TabNavigation} />
    </Stack.Navigator>
  );
}

export default StackGroup;
