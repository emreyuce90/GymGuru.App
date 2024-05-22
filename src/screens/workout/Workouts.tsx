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

const convertToWorkoutMovementAddDto = (workouts: IWorkout[]) => {
  return workouts.map((workout) => ({
    MovementId: workout.movementId,
    MovementSetDtos: workout.movementSets.map((set) => ({
      SetNumber: set.setNumber,
      Reps: set.reps,
      Weight: set.weight,
    })),
  }));
};

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

  const [allWorkoutsData, setAllWorkoutsData] = useState<IWorkout[]>([]);

  const handleWorkoutChanges = useCallback(
    (data: IWorkout) => {
      const exist = allWorkoutsData?.find(
        (workoutData) => workoutData.movementId === data.movementId
      );

      if (!exist) {
        setAllWorkoutsData((prev) => {
          return [...prev, data];
        });
      } else {
        setAllWorkoutsData((prev) => {
          return prev.map((workoutData) => {
            if (workoutData.movementId === data.movementId) {
              return { ...workoutData, movementSets: data.movementSets };
            }
            return workoutData;
          });
        });
      }
    },
    [allWorkoutsData]
  );

  // const Ids = useMemo(() => {
  //   return subProgrammeMovements.map((p, i) => p.movementId);
  // }, [subProgrammeMovements]);

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
        const transformedData = convertToWorkoutMovementAddDto(allWorkoutsData);
        const saveMovements = await Api.post(
          `/api/Workout/SaveWorkoutMovements/${workoutId}`,
          transformedData
        );
        if (saveMovements.Success) {
          console.log("antrenman bitirildi");
          navigation.navigate("WorkoutLogs");
        }
        //kullanıcı antrenmanla ilgili logların olduğu bir sayfaya yönlendirilir
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [workoutId, navigation, allWorkoutsData]);
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
    <View className="flex-1 h-screen ">
      <ScrollView className="flex-1">
        <View className="justify-between">
          <View>
            {subProgrammeMovements &&
              subProgrammeMovements.map((s: ISubProgrammeMovement, i) => (
                <WorkoutRunning
                  key={i}
                  movement={s}
                  onChangeData={handleWorkoutChanges}
                />
              ))}
          </View>
          {/* <Bounceable onPress={() => {}}>
            <View className="flex flex-row items-center justify-center  px-4 py-2 m-3 rounded-xl bg-[#FF6346]">
              <View>
                <Ionicons name="add-outline" size={24} color="white" />
              </View>
              <View>
                <Text className="font-bold text-base text-white">
                  Yeni Egzersiz Ekle
                </Text>
              </View>
            </View>
          </Bounceable> */}
        </View>
      </ScrollView>
      <Pressable
        onPress={handleWorkoutFinish}
        disabled={allWorkoutsData.length === 0}
      >
        <View className="w-full flex flex-row items-center justify-center bg-[#FF6346] rounded-xl py-3 px-4 space-x-3 mb-2">
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
