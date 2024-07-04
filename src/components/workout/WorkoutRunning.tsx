import { Image, Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";
import MiniMenu from "./Modals/MiniMenu";
import MovementDeleteConfirm from "./Modals/MovementDeleteConfirm";

type WorkoutRunningPropTypes = {
  deleteExercise: (movementId: string) => void;
  movement: ISubProgrammeMovement;
  onChangeData: (data: IWorkout) => void;
};

const WorkoutRunning = (props: WorkoutRunningPropTypes) => {
  const { movement, onChangeData, deleteExercise } = props;
  const swipeableRefs = useRef<any>([]);

  // 3 kez movement'ı iterate eder ve bir array oluşturur
  const movementSets: IWorkoutSets[] = Array.from(
    { length: movement.sets },
    (_, index) => ({
      setNumber: index + 1,
      reps: 8,
      weight: 25,
      checked: false,
    })
  );

  const [workoutSets, setWorkoutSets] = useState<IWorkout>({
    movementId: movement.movementId,
    movementSets: movementSets,
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const [confirm, setConfirm] = useState<boolean>(false);
  const rightSwipeActions = (index: number, swipeableRef: any) => {
    return (
      <Pressable
        className="flex-row items-center justify-center bg-red-500 rounded-md px-3 h-[54] mr-1"
        onPress={() => {
          deleteSet(index);
          swipeableRef.current?.close();
        }}
      >
        <Ionicons name="remove-circle-outline" size={24} color="white" />
        <Text className="font-bold text-white">Sil</Text>
      </Pressable>
    );
  };

  const toggleChecked = (index: number) => {
    if (
      workoutSets.movementSets[index].reps > 0 &&
      workoutSets.movementSets[index].weight > 0
    ) {
      setWorkoutSets((prevState) => {
        const updatedSets = [...prevState.movementSets];
        updatedSets[index] = {
          ...updatedSets[index],
          checked: !updatedSets[index].checked,
        };
        return {
          ...prevState,
          movementSets: updatedSets,
        };
      });
    }
  };

  const updateReps = (index: number, value: string) => {
    if (value === "") {
      //bu itemin check kısmını kaldır
      setWorkoutSets((prevState) => {
        const copy = [...prevState.movementSets];
        copy[index] = {
          ...copy[index],
          checked: false,
        };
        return { ...prevState, movementSets: copy };
      });
    }
    setWorkoutSets((prevState) => {
      // mevcut statein reps kısmını kopyala
      const copyOfState = [...prevState.movementSets];
      // değiştirmek istediğim objeyi indexten yakala
      copyOfState[index] = {
        ...copyOfState[index],
        reps: value === "" ? 0 : parseInt(value),
      };

      return {
        ...prevState,
        movementSets: copyOfState,
      };
    });
  };

  const updateWeights = (index: number, value: string) => {
    if (value === "") {
      setWorkoutSets((prevState) => {
        const copy = [...prevState.movementSets];
        copy[index] = {
          ...copy[index],
          checked: false,
        };
        return { ...prevState, movementSets: copy };
      });
    }

    setWorkoutSets((prevState) => {
      console.log("prevState", prevState);
      //copiying data
      const updateWeigth = [...prevState.movementSets];
      //find exact data
      updateWeigth[index] = {
        ...updateWeigth[index],
        weight: value === "" ? 0 : parseFloat(value),
      };
      return { ...prevState, movementSets: updateWeigth };
    });
  };

  const deleteSet = (index: number) => {
    //eğer son set değilse bu işlemi yap eğer son set ise hareketi de sil

    if (workoutSets.movementSets.length > 1) {
      setWorkoutSets((prevState) => {
        const copieddData = [...prevState.movementSets];
        /*
        [{"checked": false, "reps": 8, "setNumber": 1, "weight": 25}, {"checked": false, "reps": 8, "setNumber": 2, "weight": 25}, {"checked": false, "reps": 8, "setNumber": 3, "weight": 25}, {"checked": false, "reps": 8, "setNumber": 4, "weight": 25}, {"checked": false, "reps": 8, "setNumber": 5, "weight": 25}]
        */
        copieddData.splice(index, 1);
        return { ...prevState, movementSets: copieddData };
      });
    } else {
      alert(
        "Hareketin son setini silemezsiniz,eğer hareketi yapmak istemiyorsanız sağ taraftaki üç noktaya tıklayıp egzersizi kaldır seçeneğini işaretleyiniz."
      );
    }

    swipeableRefs.current[index]?.close();
  };

  const addSet = () => {
    setWorkoutSets((prevState) => {
      const updated = [...prevState.movementSets];
      updated.push({
        checked: false,
        reps: 8,
        weight: 25,
        setNumber: updated.length + 1,
      });
      return { ...prevState, movementSets: updated };
    });
  };

  const handleDelete = () => {
    deleteExercise(movement.movementId);
    setConfirm((prev) => !prev);
  };
  const handleExerciseRemove = () => {
    setVisible((prev) => !prev);
    setConfirm((prev) => !prev);
  };
  useEffect(() => {
    onChangeData(workoutSets);
  }, [workoutSets]);

  return (
    <View className="px-1 py-2 rounded-lg shadow-md">
      <View className="bg-white rounded-lg">
        <View className="flex-row items-center p-3">
          <Pressable onPress={() => setIsOpened((prev) => !prev)}>
            <Ionicons
              name={isOpened ? "chevron-up" : "chevron-down"}
              size={24}
              color="grey"
            />
          </Pressable>
          <View>
            <Image
              className="rounded-full p-1"
              width={80}
              height={80}
              source={{
                uri: `https://api.gymguru.com.tr/api.gymguru.com.tr/images/${movement?.movement?.imageUrl}`,
              }}
            />
          </View>
          <View className="flex flex-col ml-2">
            <View className="ml-2">
              <Text className="font-bold text-lg">
                {movement.movement.title}
              </Text>
            </View>
            <View className="flex-row items-center ml-2">
              {workoutSets.movementSets.filter((c) => c.checked === true)
                .length === workoutSets.movementSets.length && (
                <View className="mr-1">
                  <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
                </View>
              )}
              <Text
                className={
                  workoutSets.movementSets.filter((c) => c.checked === true)
                    .length === workoutSets.movementSets.length
                    ? "text-green-600"
                    : ""
                }
              >
                {`${
                  workoutSets.movementSets.filter((c) => c.checked === true)
                    .length
                }/${workoutSets.movementSets.length} Tamamlandı`}
              </Text>
            </View>
          </View>
          <View className="flex-1 justify-end items-end relative">
            <Pressable
              onPress={() => {
                setVisible(!visible);
              }}
            >
              <Ionicons
                name="ellipsis-vertical-outline"
                size={16}
                color="gray"
              />
            </Pressable>
            <View className="absolute top-6 right-0">
              <MiniMenu
                visible={visible}
                setVisible={setVisible}
                handleExerciseRemove={handleExerciseRemove}
              />
            </View>
          </View>
        </View>

        {isOpened && (
          <>
            {workoutSets.movementSets.map((workoutSet, index) => {
              return (
                <Swipeable
                  ref={(ref) => (swipeableRefs.current[index] = ref)}
                  key={index}
                  renderRightActions={() =>
                    rightSwipeActions(index, swipeableRefs.current[index])
                  }
                >
                  <Pressable key={index} onPress={() => toggleChecked(index)}>
                    <View
                      className={`flex-row items-center justify-around px-4 py-2 rounded-lg mb-2 mx-2 ${
                        workoutSet.checked ? "bg-green-600" : "bg-gray-200"
                      }`}
                    >
                      <Ionicons
                        name={
                          workoutSet.checked
                            ? "checkmark-circle"
                            : "checkmark-circle-outline"
                        }
                        size={24}
                        color={workoutSet.checked ? "white" : "black"}
                      />
                      <Text
                        className={`font-extrabold text-sm ${
                          workoutSet.checked ? "text-white" : "text-black"
                        }`}
                      >
                        {index + 1}
                      </Text>
                      <TextInput
                        onFocus={() => updateWeights(index, "")}
                        className={`h-10 mx-3 px-5 rounded-md text-center font-extrabold text-lg ${
                          workoutSet.checked ? "bg-white" : "bg-gray-300"
                        } ${
                          workoutSet.checked ? "text-black" : "text-slate-500"
                        }`}
                        value={workoutSet.weight.toString()}
                        onChangeText={(value) => updateWeights(index, value)}
                        keyboardType="decimal-pad"
                      />
                      <Text
                        className={`font-extrabold text-sm ${
                          workoutSet.checked ? "text-white" : "text-black"
                        }`}
                      >
                        KG
                      </Text>
                      <TextInput
                        onFocus={() => updateReps(index, "")}
                        className={`h-10 mx-3 px-5 rounded-md text-center font-extrabold text-lg ${
                          workoutSet.checked ? "bg-white" : "bg-gray-300"
                        } ${
                          workoutSet.checked ? "text-black" : "text-slate-500"
                        }`}
                        value={workoutSet.reps.toString()}
                        onChangeText={(value) => updateReps(index, value)}
                        keyboardType="numeric"
                      />
                      <Text
                        className={`font-extrabold text-sm ${
                          workoutSet.checked ? "text-white" : "text-black"
                        }`}
                      >
                        Tekrar
                      </Text>
                    </View>
                  </Pressable>
                </Swipeable>
              );
            })}
            <Pressable onPress={() => addSet()}>
              <View className="mb-1 flex flex-row items-start rounded-2xl justify-around p-2 ml-2 mr-2 bg-gray-100">
                <View className="flex flex-row items-center">
                  <Ionicons name="add-circle-outline" size={24} color="black" />
                  <Text className="text-lg ml-2 font-semibold">Set ekle</Text>
                </View>
              </View>
            </Pressable>
          </>
        )}
      </View>
      <MovementDeleteConfirm
        visible={confirm}
        setVisible={setConfirm}
        handleDelete={handleDelete}
      />
    </View>
  );
};
export default React.memo(WorkoutRunning);
