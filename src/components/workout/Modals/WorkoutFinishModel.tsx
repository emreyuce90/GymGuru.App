import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";

type WorkoutFinishModelPropTypes = {
  finishedSets: number;
  unFinishedSets: number;
  finishModalVisible: boolean;
  setFinishModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleWorkoutFinish: () => Promise<void>;
};

const WorkoutFinishModel = (props: WorkoutFinishModelPropTypes) => {
  const {
    finishedSets,
    unFinishedSets,
    finishModalVisible,
    setFinishModalVisible,
    handleWorkoutFinish,
  } = props;
  return (
    <Modal
      animationType="slide"
      transparent
      visible={finishModalVisible}
      onRequestClose={() => {
        setFinishModalVisible(!finishModalVisible);
      }}
    >
      <View className="flex-1 justify-end items-center pb-2">
        <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50" />
        <View className="bg-white p-8 rounded-2xl ">
          <Text className="text-3xl font-extrabold text-black mb-2">
            Antrenmanınız bitti mi?
          </Text>
          <Text className="text-base text-black mb-4">
            Antrenman geçmişinize sadece{" "}
            <Text className="font-extrabold text-red-500">
              tamamlanmış setleriniz
            </Text>{" "}
            kaydedilir
          </Text>
          <View className="flex flex-row justify-around mb-8">
            <View className="items-center">
              <Text className="text-3xl font-extrabold text-black">
                {finishedSets}
              </Text>
              <Text className="text-black">Tamamlanan set</Text>
            </View>
            <View className="items-center">
              <Text className="text-3xl font-extrabold text-black">
                {unFinishedSets}
              </Text>
              <Text className="text-black">Tamamlanmayan set</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleWorkoutFinish();
            }}
          >
            <View className="bg-red-500 w-full rounded-xl mb-2">
              <Text className="text-white text-2xl font-bold text-center p-2">
                BİTTİ
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFinishModalVisible(!finishModalVisible);
            }}
          >
            <View className="bg-gray-300 w-full rounded-xl">
              <Text className="text-black text-2xl font-bold text-center p-2">
                İPTAL
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(WorkoutFinishModel);
