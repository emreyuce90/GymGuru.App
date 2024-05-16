import { View, Text, Pressable } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import Api from "../../../lib/@core/data/Api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getCurrentTime } from "../../../lib/@core/utils";
import StopWatch from "../../components/workout/StopWatch";
import { Bounceable } from "rn-bounceable";

const Workouts = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | string>("");

  const workout = route.params as any;
  console.log("workout", workout.workoutId);

  const handleWorkoutFinish = useCallback(async () => {
    setLoading(true);
    try {
      const request = await Api.put(
        `/api/Workout/FinishWorkout/${
          workout.workoutId
        }?endTime=${encodeURIComponent(getCurrentTime())}`,
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <View className="flex flex-col pb-3">
            <Text>{workout.workoutName}</Text>
            <View className="flex flex-row items-center justify-center">
              <View>
                <StopWatch />
              </View>
              <Bounceable onPress={() => {}}>
                <View className="ml-2 flex flex-row items-center">
                  <Ionicons name="pause" size={26} color="blue" />
                  <Text>Durdur</Text>
                </View>
              </Bounceable>
            </View>
          </View>
        );
      },
    });
  }, []);
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  return (
    <View className="flex-1 justify-between h-screen">
      <View></View>
      <Pressable onPress={handleWorkoutFinish}>
        <View className="w-full flex flex-row items-center justify-center bg-red-500 rounded-xl py-4 px-6 space-x-3 mb-2">
          <Ionicons name="stop" size={24} color={"white"} />
          <Text className=" text-white font-semibold uppercase text-lg ">
            BİTİR
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Workouts;

/*
1-Üstte bir kronometre yer almalı ve dk saniyeyi gösermeli.
*/
