import { View, Text, Pressable, BackHandler } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import Api from "../../../lib/@core/data/Api";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getCurrentTime } from "../../../lib/@core/utils";
import useSubProgrammeMovements from "../subProgramme/hooks/useSubProgrammeMovements";
import WorkoutRunning from "../../components/workout/WorkoutRunning";
import { ScrollView } from "react-native-gesture-handler";
import WorkoutBackModal from "../../components/workout/Modals/WorkoutBackModal";
import WorkoutFinishModel from "../../components/workout/Modals/WorkoutFinishModel";
import {
  convertToWorkoutMovementAddDto,
  filterDataToSend,
  findMovementName,
  finishedSetCounts,
  isAllMovementsOk,
  unFinishedSetCounts,
} from "../../components/workout";
import StopWatch from "../../components/workout/StopWatch";

const Workouts = () => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [finishModalVisible, setFinishModalVisible] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const route = useRoute();
  const workout = route.params as any;
  const { workoutId, workoutName, subProgrammeId } = workout;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | string>("");
  const { subProgrammeMovements } = useSubProgrammeMovements({
    subProgrammeId,
  });
  const [allWorkoutsData, setAllWorkoutsData] = useState<IWorkout[]>([]);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const handleReset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
  }, [isRunning]);

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

  const handleAllSetsFinished = useCallback(() => {
    if (isAllMovementsOk(allWorkoutsData)) {
      setFinishModalVisible((prev) => !prev);
      handleWorkoutFinish();
    } else {
      setFinishModalVisible((prev) => !prev);
    }
  }, [allWorkoutsData, finishModalVisible]);

  const handleFinishWorkout = useCallback(async () => {
    try {
      const response = await Api.delete(
        `/api/Workout/DeleteWorkout/${workoutId}`,
        {}
      );
      if (response.Success) {
        //kronometreyi de resetle
        navigation.navigate("Programmes");
      }
    } catch (err) {
      alert(err);
    }
  }, [workoutId]);

  const handleWorkoutFinish = useCallback(async () => {
    handleReset();
    setLoading(true);
    try {
      const request = await Api.put(
        `/api/Workout/FinishWorkout/${workoutId}?endTime=${encodeURIComponent(
          getCurrentTime()
        )}&duration=${seconds}`,
        ""
      );
      if (request.Success) {
        const transformedData = convertToWorkoutMovementAddDto(
          filterDataToSend(allWorkoutsData)
        );
        const saveMovements = await Api.post(
          `/api/Workout/SaveWorkoutMovements/${workoutId}`,
          transformedData
        );

        const date = new Date();
        console.log("saveMovements", saveMovements);
        if (saveMovements.Success) {
          navigation.navigate("WorkoutLogs", {
            workoutCount: saveMovements.Resource.resource,
            date: date,
            duration: seconds,
            workoutName: workoutName,
            workout: findMovementName(
              filterDataToSend(allWorkoutsData),
              subProgrammeMovements
            ),
          });
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
      headerTitle: () => (
        <StopWatch
          seconds={seconds ? seconds : 0}
          setSeconds={setSeconds}
          workoutName={workoutName}
          setIsRunning={setIsRunning}
          isRunning={isRunning}
        />
      ),
    });
  }, [seconds, isRunning]);

  useEffect(() => {
    const backAction = () => {
      setModalVisible((prev) => {
        if (!prev) {
          return true;
        }
        return prev;
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      setModalVisible((prev) => {
        if (!prev) {
          return true;
        }
        return prev;
      });
    });

    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, [navigation]);

  useEffect(() => {
    if (
      allWorkoutsData.some((obj) =>
        obj.movementSets.find((ms) => ms.checked === true)
      )
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [allWorkoutsData]);

  //error-loading state
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  return (
    <>
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
          onPress={handleAllSetsFinished}
          disabled={buttonDisabled}
          className={`${buttonDisabled ? "bg-[#FF634680]" : "bg-[#FF6346]"}`}
        >
          <View className="w-full flex flex-row items-center justify-center  rounded-xl py-3 px-4 space-x-3 mb-2">
            <Ionicons name="stop" size={24} color={"white"} />
            <Text className=" text-white font-semibold uppercase text-lg ">
              BİTİR
            </Text>
          </View>
        </Pressable>
      </View>
      {/* Antrenman esnasında kullanıcı geri butonuna tıkladığında çıkan modal */}
      <WorkoutBackModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleFinishWorkout={handleFinishWorkout}
      />
      {/* Antrenman esnasında kullanıcı setlerini tamamlamadan çıkması halinde karışılaşacağı modal*/}

      <WorkoutFinishModel
        unFinishedSets={unFinishedSetCounts(allWorkoutsData)}
        finishedSets={finishedSetCounts(allWorkoutsData)}
        finishModalVisible={finishModalVisible}
        setFinishModalVisible={setFinishModalVisible}
        handleWorkoutFinish={handleWorkoutFinish}
      />
    </>
  );
};

export default Workouts;
