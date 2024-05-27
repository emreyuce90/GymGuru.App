import {
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";

type WorkoutRunningPropTypes = {
  movement: ISubProgrammeMovement;
  onChangeData: (data: IWorkout) => void;
};

const WorkoutRunning = (props: WorkoutRunningPropTypes) => {
  const { movement, onChangeData } = props;
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

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const rightSwipeActions = (index: number, swipeableRef: any) => {
    return (
      <Pressable
        style={styles.deleteButton}
        onPress={() => {
          deleteSet(index);
          swipeableRef.current?.close();
        }}
      >
        <Ionicons name="remove-circle-outline" size={24} color="white" />
        <Text style={styles.deleteButtonText}>Sil</Text>
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
    console.log("update reps", value);
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
        reps: value === "" ? "" : parseInt(value),
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
      //copiying data
      const updateWeigth = [...prevState.movementSets];
      //find exact data
      updateWeigth[index] = {
        ...updateWeigth[index],
        weight: value === "" ? "" : parseInt(value),
      };
      return { ...prevState, movementSets: updateWeigth };
    });
  };

  const deleteSet = (index: number) => {
    setWorkoutSets((prevState) => {
      const copieddData = [...prevState.movementSets];
      /*
      [{"checked": false, "reps": 8, "setNumber": 1, "weight": 25}, {"checked": false, "reps": 8, "setNumber": 2, "weight": 25}, {"checked": false, "reps": 8, "setNumber": 3, "weight": 25}, {"checked": false, "reps": 8, "setNumber": 4, "weight": 25}, {"checked": false, "reps": 8, "setNumber": 5, "weight": 25}]
      */
      copieddData.splice(index, 1);
      return { ...prevState, movementSets: copieddData };
    });
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
  useEffect(() => {
    onChangeData(workoutSets);
  }, [workoutSets]);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Pressable onPress={() => setIsOpened((prev) => !prev)}>
              <Ionicons
                name={isOpened ? "chevron-up" : "chevron-down"}
                size={24}
                color="grey"
              />
            </Pressable>
            <View>
              <Image
                style={styles.image}
                width={80}
                height={80}
                source={{
                  uri: `https://api.gymguru.com.tr/api.gymguru.com.tr/images/${movement.movement.imageUrl}`,
                }}
              />
            </View>
            <View className="flex flex-col">
              <View style={styles.headerText}>
                <Text style={styles.title}>{movement.movement.title}</Text>
              </View>
              <View className="flex flex-row items-center ml-2">
                {workoutSets.movementSets.filter((c) => c.checked === true)
                  .length === workoutSets.movementSets.length && (
                  <View className="mr-1">
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color="#16a34a"
                    />
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
          </View>
          {isOpened && (
            <>
              {workoutSets.movementSets.map((workoutSet, index) => (
                <Swipeable
                  ref={(ref) => (swipeableRefs.current[index] = ref)}
                  key={index}
                  renderRightActions={() =>
                    rightSwipeActions(index, swipeableRefs.current[index])
                  }
                >
                  <Pressable key={index} onPress={() => toggleChecked(index)}>
                    <View
                      style={[
                        styles.setContainer,
                        workoutSet.checked
                          ? styles.checkedSet
                          : styles.uncheckedSet,
                      ]}
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
                        style={[
                          styles.setText,
                          workoutSet.checked
                            ? styles.checkedText
                            : styles.uncheckedText,
                        ]}
                      >
                        {index + 1}
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          workoutSet.weight.toString() === ""
                            ? styles.emptyInput
                            : styles.filledInput,
                        ]}
                        value={workoutSet.weight.toString()}
                        onChangeText={(value) => updateWeights(index, value)}
                        keyboardType="numeric"
                      />
                      <Text
                        style={[
                          styles.setText,
                          workoutSet.checked
                            ? styles.checkedText
                            : styles.uncheckedText,
                        ]}
                      >
                        KG
                      </Text>
                      <TextInput
                        style={[
                          styles.input,
                          workoutSet.reps.toString() === ""
                            ? styles.emptyInput
                            : styles.filledInput,
                        ]}
                        value={workoutSet.reps.toString()}
                        onChangeText={(value) => updateReps(index, value)}
                        keyboardType="numeric"
                      />
                      <Text
                        style={[
                          styles.setText,
                          workoutSet.checked
                            ? styles.checkedText
                            : styles.uncheckedText,
                        ]}
                      >
                        Tekrar
                      </Text>
                    </View>
                  </Pressable>
                </Swipeable>
              ))}
              <Pressable onPress={() => addSet()}>
                <View className="mb-1 flex flex-row items-start rounded-xl justify-around p-4 bg-[#f4f4f5]">
                  <View className="flex flex-row items-center">
                    <Ionicons
                      name="add-circle-outline"
                      size={24}
                      color="black"
                    />
                    <Text className="text-lg  ml-2">Set ekle</Text>
                  </View>
                </View>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  innerContainer: {
    backgroundColor: "white",
    marginTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  image: {
    borderRadius: 50,
    padding: 3,
  },
  headerText: {
    marginLeft: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  setContainer: {
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  checkedSet: {
    backgroundColor: "#16a34a",
  },
  uncheckedSet: {
    backgroundColor: "#f4f4f5",
  },
  setText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  checkedText: {
    color: "white",
  },
  uncheckedText: {
    color: "black",
  },
  input: {
    height: 40,
    margin: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
  },
  emptyInput: {
    backgroundColor: "#ffcccc",
  },
  filledInput: {
    backgroundColor: "#d4d4d8",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  deleteButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,99,70,0.3)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#FF6346",
    marginVertical: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default WorkoutRunning;
