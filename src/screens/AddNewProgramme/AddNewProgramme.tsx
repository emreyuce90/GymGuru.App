import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../auth/components/CustomInput";
import { Picker } from "@react-native-picker/picker";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddNewProgramme = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const p = route.params as any;
  const [programme, setProgramme] = useState<IAddExerciseModel>({
    programmeName: "",
    subProgramme: [
      {
        id: 1,
        subProgrammeMovements: [],
        subProgrammeName: "1. Gün",
      },
    ],
  });
  const [day, setDay] = useState<number>(1);

  const handleWorkoutDayChange = (value: any, index: any) => {
    setDay(value);
    setProgramme((prev) => {
      const copyOfState = {
        ...prev,
        subProgramme: [] as ISubProgrammeAddModel[],
      };
      for (let i = 0; i < value; i++) {
        copyOfState.subProgramme.push({
          subProgrammeMovements: [],
          subProgrammeName: `${i + 1} .Gün`,
          id: i + 1,
        });
      }
      return copyOfState;
    });
  };

  const selectIds = (data: ISubProgrammeMovement[]) => {
    let arr = [] as any;
    data.forEach((element) => {
      arr.push(element.movementId);
    });
    return arr;
  };

  const updateSets = (value: string, spIndex: number, index: number) => {
    setProgramme((prev) => {
      const copyOfState = { ...prev };
      copyOfState.subProgramme[spIndex].subProgrammeMovements[index].sets =
        value === "" ? 0 : parseInt(value);
      return copyOfState;
    });
  };

  const updateReps = (value: string, spIndex: number, index: number) => {
    setProgramme((prev) => {
      const copyOfState = { ...prev };
      copyOfState.subProgramme[spIndex].subProgrammeMovements[index].reps =
        value === "" ? 0 : parseInt(value);
      return copyOfState;
    });
  };

  useEffect(() => {
    if (p !== undefined) {
      setProgramme((prev) => {
        const copyOfState = { ...prev };
        const toBeChangedState = copyOfState.subProgramme.find(
          (sp) => sp.id === p.index
        );
        if (toBeChangedState) {
          const arr = p.checkedMovements as IMovement[];
          const data = arr.map((m) => {
            return { reps: 8, sets: 3, movementId: m.id, movement: m };
          });
          toBeChangedState.subProgrammeMovements = data;
        }
        return copyOfState;
      });
    }
  }, [p]);

  return (
    <>
      <View className="flex p-3">
        <View className="flex flex-col">
          <Text className="text-xl">Program Adı:</Text>
          <CustomInput
            placeholder="Program adını yazınız"
            value={programme.programmeName}
            setValue={(value: string) =>
              setProgramme((prev) => {
                return { ...prev, programmeName: value };
              })
            }
          />
        </View>
        <View className="flex">
          <Text className="text-xl">Antrenman kaç günden oluşacak</Text>
          <Picker
            selectedValue={day}
            style={{ width: "100%", backgroundColor: "white" }}
            onValueChange={handleWorkoutDayChange}
          >
            {[...Array(7).keys()].map((i) => (
              <Picker.Item
                key={i + 1}
                label={(i + 1).toString()}
                value={i + 1}
              />
            ))}
          </Picker>
        </View>
      </View>
      <ScrollView
        style={{ flexGrow: 1, paddingHorizontal: 6 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {programme &&
          programme.subProgramme.map((sp, spIndex) => {
            return (
              <View
                key={spIndex}
                className="flex flex-col px-6 items-stretch border rounded-2xl mt-3 border-[#FF6346]"
              >
                <Text className="mx-auto text-base font-semibold mt-4 mb-2">{`${sp.subProgrammeName}`}</Text>
                <View className="flex flex-row justify-between">
                  <Text className="font-bold">Hareket Adı</Text>
                  <View className="flex flex-row space-x-7">
                    <Text className="font-bold">Set</Text>
                    <Text className="font-bold">Tekrar</Text>
                  </View>
                </View>
                <View className="border  rounded-xl mb-2 mt-2 border-b-[#FF6346]"></View>
                {sp.subProgrammeMovements &&
                  sp.subProgrammeMovements.map((m, i) => (
                    <View
                      key={i}
                      className="flex flex-row justify-between items-center"
                    >
                      <Text className="text-base">{m.movement.title}</Text>
                      <View className="flex flex-row items-center space-x-1">
                        <TextInput
                          style={{
                            width: 50,
                            backgroundColor: "white",
                            borderColor: `${
                              m.sets.toString() == "0" ? "red" : "#e8e8e8"
                            }`,
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingHorizontal: 16,
                            marginVertical: 5,
                            paddingVertical: 10,
                          }}
                          value={m.sets.toString()}
                          onChangeText={(value: string) =>
                            updateSets(value, spIndex, i)
                          }
                          keyboardType="numeric"
                        />
                        <TextInput
                          style={{
                            width: 50,
                            backgroundColor: "white",
                            borderColor: `${
                              m.reps.toString() == "0" ? "red" : "#e8e8e8"
                            }`,
                            borderWidth: 1,
                            borderRadius: 5,
                            paddingHorizontal: 16,
                            marginVertical: 5,
                            paddingVertical: 10,
                          }}
                          value={m.reps.toString()}
                          onChangeText={(value: string) =>
                            updateReps(value, spIndex, i)
                          }
                          keyboardType="numeric"
                        />
                      </View>
                    </View>
                  ))}
                <Bounceable
                  onPress={() => {
                    navigation.navigate("AddExercises", {
                      movementIds: selectIds(sp.subProgrammeMovements),
                      index: sp.id,
                    });
                  }}
                >
                  <View className="flex flex-row justify-center px-4 py-2 m-4 rounded-xl bg-[#FF6346] space-x-1">
                    <View>
                      <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color="white"
                      />
                    </View>
                    <View>
                      <Text className="font-bold text-base text-white">
                        Egzersiz Ekle
                      </Text>
                    </View>
                  </View>
                </Bounceable>
              </View>
            );
          })}
      </ScrollView>
      <View className="flex flex-row justify-center items-center bg-green-500 rounded-lg">
        <Ionicons name="save-outline" size={24} color="white" />
        <Text className="text-lg text-white p-4 font-semibold">
          Antrenmanı Kaydet
        </Text>
      </View>
    </>
  );
};

export default AddNewProgramme;
