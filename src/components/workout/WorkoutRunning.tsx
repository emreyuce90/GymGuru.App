import { Image, Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";

type WorkoutRunningPropTypes = {
  movement: ISubProgrammeMovement;
};

const WorkoutRunning = (props: WorkoutRunningPropTypes) => {
  console.log("page rendered");
  const { movement } = props;

  const swipeableRefs = useRef<any>([]);

  const [sets, setSets] = useState<number>(movement.sets);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [weightArray, setWeightArray] = useState<string[]>(
    new Array(sets).fill("25")
  );

  const [repsArray, setRepsArray] = useState<string[]>(
    new Array(sets).fill("8")
  );

  const [checkedArray, setCheckedArray] = useState<boolean[]>(
    new Array(sets).fill(false)
  );

  const toggleChecked = (index: number) => {
    if (
      weightArray[index] !== "" &&
      repsArray[index] !== "" &&
      parseInt(weightArray[index]) > 0 &&
      parseInt(repsArray[index]) > 0
    ) {
      setCheckedArray((prev) => {
        const updatedChecked = [...prev];
        updatedChecked[index] = !updatedChecked[index];
        return updatedChecked;
      });
    }
  };

  const updateWeight = (index: number, value: string) => {
    const isNumber = value !== "" && Number.isFinite(Number(value));

    if (value === "" || parseInt(value) === 0) {
      const checkedArrays = [...checkedArray];
      checkedArrays[index] = false;
      setCheckedArray((prev) => checkedArrays);
    }
    if (isNumber || value === "") {
      const newWeights = [...weightArray];
      newWeights[index] = value;
      setWeightArray(newWeights);
    }
  };

  const updateReps = (index: number, value: string) => {
    const isNumber = value !== "" && Number.isFinite(Number(value));

    if (value === "" || parseInt(value) === 0) {
      const checkedArrays = [...checkedArray];
      checkedArrays[index] = false;
      setCheckedArray((prev) => checkedArrays);
    }
    if (isNumber || value === "") {
      const newReps = [...repsArray];
      newReps[index] = value;
      setRepsArray(newReps);
    }
  };

  const addSet = () => {
    setSets((prev) => prev + 1);
    setWeightArray((prev) => [...prev, "25"]);
    setRepsArray((prev) => [...prev, "8"]);
    setCheckedArray((prev) => [...prev, false]);
  };

  const deleteSet = (index: number) => {
    setSets((prev) => prev - 1);
    setWeightArray((prev) => prev.filter((_, i) => i !== index));
    setRepsArray((prev) => prev.filter((_, i) => i !== index));
    setCheckedArray((prev) => prev.filter((_, i) => i !== index));
    swipeableRefs.current[index]?.close();
  };

  const rightSwipeActions = (index: number, swipeableRef: any) => {
    return (
      <Pressable
        className="flex flex-row items-center justify-center bg-red-500 rounded-lg px-2"
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

  return (
    <View className="px-4 py-1 rounded-2xl shadow-md">
      <View className="bg-white  mt-2 ">
        <View className="flex flex-row items-center p-3">
          <Pressable onPress={() => setIsOpened((prev) => !prev)}>
            <Ionicons
              name={isOpened ? "chevron-up" : "chevron-down"}
              size={24}
              color="grey"
            />
          </Pressable>
          <View>
            <Image
              style={{ borderRadius: 50, padding: 3 }}
              width={80}
              height={80}
              source={{
                uri: `https://api.gymguru.com.tr/api.gymguru.com.tr/images/${movement.movement.imageUrl}`,
              }}
            />
          </View>
          <View className="ml-2 flex flex-col">
            <View>
              <Text className="font-semibold text-lg">
                {movement.movement.title}
              </Text>
            </View>
            <View className="flex flex-row items-center">
              {checkedArray.filter((c) => c === true).length === sets && (
                <View className="mr-1">
                  <Ionicons name="checkmark-circle" size={24} color="#16a34a" />
                </View>
              )}
              <Text
                className={
                  checkedArray.filter((c) => c === true).length === sets
                    ? "text-green-600"
                    : ""
                }
              >
                {`${
                  checkedArray.filter((c) => c === true).length
                }/${sets} Tamamlandı`}
              </Text>
            </View>
          </View>
        </View>
        {isOpened && (
          <>
            {Array.from({ length: sets }, (_, index) => (
              <Swipeable
                ref={(ref) => (swipeableRefs.current[index] = ref)}
                key={index}
                renderRightActions={() =>
                  rightSwipeActions(index, swipeableRefs.current[index])
                }
              >
                <Pressable key={index} onPress={() => toggleChecked(index)}>
                  <View
                    className={`mb-1 flex flex-row items-center rounded-xl justify-around px-4 ${
                      checkedArray[index] ? "bg-[#16a34a]" : "bg-[#f4f4f5]"
                    }`}
                  >
                    <View>
                      <Ionicons
                        name={
                          checkedArray[index]
                            ? "checkmark-circle"
                            : "checkmark-circle-outline"
                        }
                        size={24}
                        color={checkedArray[index] ? "white" : "black"}
                      />
                    </View>

                    <View>
                      <Text
                        className={`font-bold text-xl ${
                          checkedArray[index] ? "text-white" : "text-black"
                        }`}
                      >
                        {index + 1}
                      </Text>
                    </View>
                    <View>
                      <TextInput
                        style={{
                          height: 40,
                          margin: 12,
                          paddingHorizontal: 20,
                          borderRadius: 10,
                          backgroundColor:
                            weightArray[index] === "" ? "#ffcccc" : "#d4d4d8",
                          fontWeight: "800",
                          fontSize: 20,
                          textAlign: "center",
                        }}
                        value={weightArray[index]}
                        onChangeText={(value) => updateWeight(index, value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <View>
                      <Text
                        className={`font-bold text-xl ${
                          checkedArray[index] ? "text-white" : "text-black"
                        }`}
                      >
                        KG
                      </Text>
                    </View>
                    <View>
                      <TextInput
                        style={{
                          height: 40,
                          margin: 12,
                          paddingHorizontal: 20,
                          borderRadius: 10,
                          backgroundColor:
                            repsArray[index] === "" ? "#ffcccc" : "#d4d4d8",
                          fontWeight: "800",
                          fontSize: 20,
                          textAlign: "center",
                        }}
                        value={repsArray[index]}
                        onChangeText={(value) => updateReps(index, value)}
                        keyboardType="numeric"
                      />
                    </View>
                    <View>
                      <Text
                        className={`font-bold text-lg ${
                          checkedArray[index] ? "text-white" : "text-black"
                        }`}
                      >
                        Tekrar
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </Swipeable>
            ))}
            <Pressable onPress={() => addSet()}>
              <View className="mb-1 flex flex-row items-start rounded-xl justify-around p-4 bg-[#f4f4f5]">
                <View className="flex flex-row items-center">
                  <Ionicons name="add-circle-outline" size={24} color="black" />
                  <Text className="text-lg  ml-2">Set ekle</Text>
                </View>
              </View>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};

export default WorkoutRunning;

/*
 onSwipeableOpen?: ((direction: "left" | "right", swipeable: Swipeable) => void) | undefined
*/
