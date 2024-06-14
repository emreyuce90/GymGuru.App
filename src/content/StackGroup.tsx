import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import {
  ProgrammeDetail,
  MovementDetail,
  SubProgrammes,
  SubProgrammeDetail,
  Workouts,
  WorkoutLogs,
  AddExercises,
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
      <Stack.Screen name="Workouts" component={Workouts} />
      <Stack.Screen name="WorkoutLogs" component={WorkoutLogs} />
      <Stack.Screen
        name="AddExercises"
        component={AddExercises}
        options={{ presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

export default StackGroup;
