import { View, Text, Pressable } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import Api from "../../../lib/@core/data/Api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getCurrentTime } from "../../../lib/@core/utils";
import useSubProgrammeMovements from "../subProgramme/hooks/useSubProgrammeMovements";
import TopNavStopwatch from "../../components/workout/TopNavStopwatch";
import WorkoutRunning from "../../components/workout/WorkoutRunning";
import { ScrollView } from "react-native-gesture-handler";

const Workouts = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const workout = route.params as any;
  const { workoutId, workoutName, subProgrammeId } = workout;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | string>("");
  const { subProgrammeMovements } = useSubProgrammeMovements({
    subProgrammeId,
  });

  //api finish request
  const handleWorkoutFinish = useCallback(async () => {
    setLoading(true);
    try {
      const request = await Api.put(
        `/api/Workout/FinishWorkout/${workoutId}?endTime=${encodeURIComponent(
          getCurrentTime()
        )}`,
        ""
      );
      if (request.Success) {
        console.log("antrenman bitirildi");
        navigation.navigate("WorkoutLogs");
        //kullanıcı antrenmanla ilgili logların olduğu bir sayfaya yönlendirilir
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);
  //Topbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TopNavStopwatch workoutName={workoutName} />,
    });
  }, []);
  //error-loading state
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <ScrollView className="flex-1 h-screen ">
      <View className="  justify-between">
        <View>
          {subProgrammeMovements &&
            subProgrammeMovements.map((s: ISubProgrammeMovement, i) => (
              <WorkoutRunning key={i} movement={s} />
            ))}
        </View>
        <Pressable onPress={handleWorkoutFinish}>
          <View className="w-full flex flex-row items-center justify-center bg-red-500 rounded-xl py-4 px-6 space-x-3 mb-2">
            <Ionicons name="stop" size={24} color={"white"} />
            <Text className=" text-white font-semibold uppercase text-lg ">
              BİTİR
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Workouts;

/*
1-Üstte bir kronometre yer almalı ve dk saniyeyi gösermeli.
*/
