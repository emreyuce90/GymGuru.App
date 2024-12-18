import { View, Text, Image, Pressable, FlatList } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import NoDataView from "../../../lib/@core/components/NoDataView";
import WorkoutLog from "../../components/workoutLog/WorkoutLog";
import {
  calculateVolume,
  formatSubProgrammeMovementFetch,
} from "../../components/workout";
import { getFormattedTime } from "../../components/workout/StopWatch";
import WorkoutUpdateModal from "../../components/workoutLog/Modals/WorkoutUpdateModal";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import Api from "../../../lib/@core/data/Api";

function formatDateTime(date: Date) {
  // Tarih formatlaması için
  const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
  });
  let formattedDate = dateFormatter.format(date).toUpperCase();

  // Saat formatlaması için
  const timeFormatter = new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const formattedTime = timeFormatter.format(date);

  return { formattedDate, formattedTime };
}

function HeaderTitle(props: any) {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-col">
        <Text className="text-base text-white">Harika!</Text>
        <Text className="text-xl font-extrabold text-white">
          {`${props.workoutCount}.ANTRENMANINIZI`}
        </Text>
        <Text className="text-xl font-extrabold text-white">
          TAMAMLANDINIZ!
        </Text>
      </View>
      <View className="flex items-center justify-center w-full pr-20">
        <Image
          source={require("../../../assets/images/workoutLog/prize.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const WorkoutLogs = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const route = useRoute();
  const {
    workout,
    duration,
    workoutName,
    workoutCount,
    date,
    isSame,
    subProgrammeId,
  } = route.params as any;

  const { formattedDate, formattedTime } = formatDateTime(date);
  const navigation = useNavigation<any>();

  const handleWorkoutFinished = () => {
    if (isSame) {
      navigation.navigate("Home");
    } else {
      setIsVisible((prev) => !prev);
    }
  };

  const handleUpdate = useCallback(async () => {
    setLoading((prev) => !prev);
    try {
      const response = await Api.put(
        `/api/SubProgrammeMovement/${subProgrammeId}`,
        formatSubProgrammeMovementFetch(workout)
      );
      if (response.Success) {
        navigation.navigate("Home");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading((prev) => !prev);
    }
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      style: {},
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#ff6145",
        height: 200,
      },
      headerTitle: (props: any) => (
        <HeaderTitle workoutCount={workoutCount} {...props} />
      ),
    });
  }, [navigation]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <View className="flex-1 justify-between">
        <View className="bg-white flex flex=col px-7 py-5">
          <View className="flex flex-col space-y-4">
            <Text className="font-bold text-2xl">{`${workoutName} Programı`}</Text>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-col items-center justify-center">
                <Text className="font-extrabold text-2xl">{`${calculateVolume(
                  workout
                )}kg`}</Text>
                <Text className="text-base">Hacim</Text>
              </View>
              <View className="flex flex-col items-center justify-center">
                <Text className="font-extrabold text-2xl">
                  {getFormattedTime(duration)}
                </Text>
                <Text className="text-base">Süre</Text>
              </View>
              <View className="flex flex-col items-center justify-center">
                <Text className="font-extrabold text-2xl">{formattedDate}</Text>
                <Text className="text-base">{formattedTime}</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-1">
          {workout ? (
            <FlatList
              data={workout}
              renderItem={({ item }) => (
                <WorkoutLog key={item.movementId} workout={item} />
              )}
              keyExtractor={(w: IWorkout) => w.movementId}
            />
          ) : (
            <NoDataView />
          )}
        </View>
        <Pressable onPress={handleWorkoutFinished} className={"bg-[#FF6346]"}>
          <View className="w-full flex flex-row items-center justify-center  rounded-xl py-3 px-4 space-x-3 mb-2">
            <Text className=" text-white font-bold uppercase text-xl ">
              🏁 BİTTİ
            </Text>
          </View>
        </Pressable>
      </View>
      <WorkoutUpdateModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

export default WorkoutLogs;
