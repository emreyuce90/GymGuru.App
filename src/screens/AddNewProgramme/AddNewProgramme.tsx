import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomInput from "../auth/components/CustomInput";
import { Picker } from "@react-native-picker/picker";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProgrammeFinishModel from "../../components/programme/Modal/ProgrammeFinishModel";
import { Swipeable } from "react-native-gesture-handler";
import Api from "../../../lib/@core/data/Api";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import useProgrammes from "../programme/hooks/useProgrammes";

const selectIds = (data: ISubProgrammeMovement[]) => {
  let arr = [] as any;
  data.forEach((element) => {
    arr.push(element.movementId);
  });
  return arr;
};

const isValidProgramme = (data: IAddExerciseModel) => {
  let errorMessages = [];

  for (let sp of data.subProgramme) {
    if (sp.subProgrammeMovements.length === 0) {
      errorMessages.push(
        `${sp.subProgrammeName} adlı program içerisine hiç hareket eklemediniz. Lütfen en az bir hareket ekleyip antrenmanı kaydetmeyi deneyiniz.`
      );
    }
    for (let sets of sp.subProgrammeMovements) {
      if (sets.sets < 1 || sets.reps < 1) {
        errorMessages.push(
          `${sp.subProgrammeName} adlı programda set sayısı veya tekrar sayısı 0 olan alanlar var. Lütfen 0 'dan büyük değer girip tekrar kaydetmeyi deneyiniz.`
        );
      }
    }
  }

  return errorMessages;
};

const AddNewProgramme = () => {
  const { fetchData } = useProgrammes();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | unknown>();
  const swipeableRefs = useRef<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
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

  const handleProgrammeFinish = async () => {
    if (isValidProgramme(programme).length > 0) {
      setVisible(true);
      setMessages(isValidProgramme(programme));
    } else {
      try {
        setLoading(true);
        const response = await Api.post(
          `/api/programme/9c2e83f5-d9b6-4ae1-ebad-08dcd3c40b19`,
          programme
        );
        if (response.Success) {
          await fetchData();
          navigation.navigate("Programmes");
          console.log("success");
        } else {
          console.log("fail");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const rightSwipeActions = (
    spIndex: number,
    index: number,
    swipeableRef: any
  ) => {
    return (
      <Pressable
        className="flex-row items-center justify-center bg-red-500 rounded-md px-3 h-[44] mt-2 mr-1"
        onPress={() => {
          //programların içerisinden sp bul
          setProgramme((prev) => {
            const copy = { ...prev };
            copy.subProgramme[spIndex].subProgrammeMovements.splice(index, 1);
            return copy;
          });
          swipeableRef.current?.close();
        }}
      >
        <Ionicons name="remove-circle-outline" size={24} color="white" />
        <Text className="font-bold text-white">Sil</Text>
      </Pressable>
    );
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
          toBeChangedState.subProgrammeMovements = [
            ...toBeChangedState.subProgrammeMovements,
            ...data,
          ];
        }
        return {
          ...copyOfState,
        };
      });
    }
  }, [p]);

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <View className="flex p-3">
        <View className="flex flex-col">
          <Text className="text-lg">Program Adı:</Text>
          <CustomInput
            success={programme.programmeName === "" ? false : true}
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
          <Text className="text-lg">Antrenman gün sayısı:</Text>
          <Picker
            selectedValue={day}
            style={{ width: "100%", backgroundColor: "white", marginTop: 4 }}
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
                    <Swipeable
                      renderRightActions={() =>
                        rightSwipeActions(spIndex, i, swipeableRefs.current[i])
                      }
                      ref={(ref) => (swipeableRefs.current[i] = ref)}
                      key={i}
                    >
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
                    </Swipeable>
                  ))}
                <Bounceable
                  onPress={() => {
                    navigation.navigate("AddExercises", {
                      movementIds: selectIds(sp.subProgrammeMovements),
                      index: sp.id,
                      from: "AddNewProgramme",
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
      <TouchableHighlight onPress={handleProgrammeFinish}>
        <View className="flex flex-row justify-center items-center bg-green-500 rounded-lg">
          <Ionicons name="save-outline" size={24} color="white" />
          <Text className="text-lg text-white p-4 font-semibold">
            Antrenmanı Kaydet
          </Text>
        </View>
      </TouchableHighlight>
      <ProgrammeFinishModel
        visible={visible}
        setVisible={setVisible}
        messages={messages}
      />
    </>
  );
};

export default AddNewProgramme;
