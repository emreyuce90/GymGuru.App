import { View, Text, Pressable, BackHandler } from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import Api from "../../../lib/@core/data/Api";
import { useNavigation, useRoute } from "@react-navigation/native";
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
  isSameWorkout,
  movementIds,
  unFinishedSetCounts,
} from "../../components/workout";
import StopWatch from "../../components/workout/StopWatch";
import { getCurrentTime } from "../../../lib/@core/utils";
import { Bounceable } from "rn-bounceable";

const Workouts = () => {
  const navigation = useNavigation<any>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [finishModalVisible, setFinishModalVisible] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const route = useRoute();
  const workout = route.params as any;
  const { workoutId, workoutName, subProgrammeId, checkedMovements } = workout;

  const [workoutInfos, setWorkoutInfos] = useState({
    workoutId: workout.workoutId,
    workoutName: workout.workoutName,
    subProgrammeId: workout.subProgrammeId,
    checkedMovements: workout.checkedMovements,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown | string>("");
  const { subProgrammeMovements } = useSubProgrammeMovements({
    subProgrammeId,
  });

  const [subProgrammeMovementsState, setSubProgrammeMovementsState] = useState<
    ISubProgrammeMovement[]
  >([]);
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
      setFinishModalVisible(false);
      handleWorkoutFinish();
    } else {
      setFinishModalVisible(true);
    }
  }, [allWorkoutsData, finishModalVisible]);

  const handleFinishWorkout = useCallback(async () => {
    try {
      const response = await Api.delete(
        `/api/Workout/DeleteWorkout/${workoutInfos.workoutId}`,
        {}
      );
      if (response.Success) {
        //kronometreyi de resetle
        navigation.navigate("Programmes");
      }
    } catch (err) {
      alert(err);
    }
  }, [workoutInfos.workoutId]);

  const handleWorkoutFinish = useCallback(async () => {
    handleReset();
    setLoading(true);
    try {
      const request = await Api.put(
        `/api/Workout/FinishWorkout/${
          workoutInfos.workoutId
        }?endTime=${encodeURIComponent(getCurrentTime())}&duration=${seconds}`,
        ""
      );
      if (request.Success) {
        const transformedData = convertToWorkoutMovementAddDto(
          filterDataToSend(allWorkoutsData)
        );
        const saveMovements = await Api.post(
          `/api/Workout/SaveWorkoutMovements/${workoutInfos.workoutId}/7aaf453f-56ea-4f7d-8877-4cec29072bfe`,
          transformedData
        );

        const date = new Date();
        if (saveMovements.Success) {
          navigation.navigate("WorkoutLogs", {
            subProgrammeId: workoutInfos.subProgrammeId,
            isSame: isSameWorkout(subProgrammeMovements, allWorkoutsData),
            workoutCount: saveMovements.Resource.resource,
            date: date,
            duration: seconds,
            workoutName: workoutInfos.workoutName,
            workout: findMovementName(
              filterDataToSend(allWorkoutsData),
              subProgrammeMovementsState
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
  }, [workoutInfos.workoutId, navigation, allWorkoutsData]);

  const deleteExcersize = useCallback((movementId: string) => {
    setSubProgrammeMovementsState((prev) => {
      const copiedData = [...prev];
      const filteredData = copiedData.filter(
        (d) => d.movementId !== movementId
      );
      return filteredData;
    });

    setAllWorkoutsData((prev) => {
      const copyOfState = [...prev];
      const filteredData = copyOfState.filter(
        (s) => s.movementId !== movementId
      );
      return filteredData;
    });
  }, []);
  const renderedWorkoutMovements = useMemo(() => {
    return subProgrammeMovementsState.map((s, i) => (
      <WorkoutRunning
        key={i}
        movement={s}
        onChangeData={handleWorkoutChanges}
        deleteExercise={deleteExcersize}
      />
    ));
  }, [subProgrammeMovementsState, handleWorkoutChanges, deleteExcersize]);
  //Topbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <StopWatch
          seconds={seconds ? seconds : 0}
          setSeconds={setSeconds}
          workoutName={workoutInfos.workoutName}
          setIsRunning={setIsRunning}
          isRunning={isRunning}
        />
      ),
    });
  }, [seconds, isRunning]);

  useEffect(() => {
    if (checkedMovements) {
      console.log("workoutId", workoutInfos.workoutId);
      setSubProgrammeMovementsState((prev) => {
        //mevcut state i kopyala
        const state = [...prev];
        //sana gelen arrayi state içerisine uygun bir şekilde push et
        const newData = checkedMovements.forEach((element: any) => {
          state.push({
            movementId: element.id,
            reps: 8,
            sets: 1,
            movement: element,
          });
        });
        console.log("state", state);
        //yenilenmiş state i geri döndür
        return state;
      });
    }
  }, [checkedMovements]);

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

  useEffect(() => {
    setSubProgrammeMovementsState(subProgrammeMovements);
  }, [subProgrammeMovements]);

  //error-loading state
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  return (
    <>
      <View className="flex-1 h-screen ">
        <ScrollView className="flex-1">
          <View className="justify-between">
            <View>{renderedWorkoutMovements}</View>
            <Bounceable
              onPress={() => {
                navigation.navigate("AddExercises", {
                  movementIds: movementIds(subProgrammeMovementsState),
                  from: "Workouts",
                });
              }}
            >
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
            </Bounceable>
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
