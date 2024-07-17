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
  Exercises,
  WorkoutLogReports,
  WorkoutLogReportsDetail,
  Dynamic,
  AddNewProgramme,
} from "../screens";
import useGetUserMeasurement from "../screens/Reports/hooks/useGetUserMeasurement";

function StackGroup() {
  const { measurements } = useGetUserMeasurement();
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
        name="AddNewProgramme"
        component={AddNewProgramme}
        options={{ headerTitle: "Yeni Program Ekle" }}
      />
      <Stack.Screen
        name="WorkoutLogReports"
        component={WorkoutLogReports}
        options={{
          headerTitle: "Antrenman Logları",
        }}
      />
      <Stack.Screen
        name="WorkoutLogReportsDetail"
        component={WorkoutLogReportsDetail}
        options={{
          headerTitle: "Antrenman Log Detayı",
        }}
      />

      <Stack.Screen
        name="AddExercises"
        component={AddExercises}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="Exercises"
        component={Exercises}
        options={{ presentation: "modal" }}
      />

      {measurements &&
        measurements.map((m, i) => {
          return (
            <Stack.Screen
              key={i}
              name={`${m.metricName}`}
              options={{ presentation: "modal" }}
            >
              {(props) => <Dynamic measurements={m} {...props} />}
            </Stack.Screen>
          );
        })}
    </Stack.Navigator>
  );
}

export default StackGroup;
