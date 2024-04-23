import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import WorkoutDetail from "../components/workout/WorkoutDetail";

function StackGroup() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabGroup"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} />
    </Stack.Navigator>
  );
}

export default StackGroup;
