import { Image, Pressable, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type WorkoutRunningPropTypes = {
  movement: ISubProgrammeMovement;
};

const WorkoutRunning = (props: WorkoutRunningPropTypes) => {
  const { movement } = props;

  const [sets, setSets] = useState<number>(movement.sets);

  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [weightArray, setWeightArray] = useState<string[]>(
    new Array(movement.sets).fill("25")
  );

  const [repsArray, setRepsArray] = useState<string[]>(
    new Array(movement.sets).fill("8")
  );

  const [checkedArray, setCheckedArray] = useState<boolean[]>(
    new Array(3).fill(false)
  );

  const toggleChecked = (index: number) => {
    if (weightArray[index] !== "" && repsArray[index] !== "") {
      setCheckedArray((prev) => {
        const updatedChecked = [...prev];
        updatedChecked[index] = !updatedChecked[index];
        return updatedChecked;
      });
    }
  };

  const updateWeight = (index: number, value: string) => {
    if (value === "" || repsArray[index] === "") {
      setCheckedArray((checked) =>
        checked.map((item, idx) => (idx === index ? false : item))
      );
    }
    const newWeights = [...weightArray];
    newWeights[index] = value;
    setWeightArray(newWeights);
  };

  const updateReps = (index: number, value: string) => {
    const newReps = [...repsArray];
    newReps[index] = value;
    setRepsArray(newReps);
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
        {isOpened &&
          Array.from({ length: movement.sets }, (_, index) => (
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
                        weightArray[index] === "" && checkedArray[index]
                          ? "#ffcccc"
                          : "#d4d4d8",
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
                      backgroundColor: `${
                        checkedArray[index] ? "white" : "#d4d4d8"
                      }`,
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
          ))}
      </View>
    </View>
  );
};

export default WorkoutRunning;

/*
Kg ya da rep her ikisi de dolu ise checked e tıklanılabilir

*/
