import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type WorkoutBackModalPropTypes = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleFinishWorkout: () => void;
};

const WorkoutBackModal = (props: WorkoutBackModalPropTypes) => {
  const { modalVisible, setModalVisible, handleFinishWorkout } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View className="flex-1 justify-end items-center pb-2 px-2">
        <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50" />
        <View className="bg-white p-8 rounded-2xl w-full">
          <Text className="text-2xl font-bold text-gray-800 mx-auto mb-4">
            Ne yapmak istersiniz ?
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModalVisible((prev) => !prev);
            }}
          >
            <View className="bg-[#ff6145] p-3 rounded-xl w-full flex flex-row items-center mb-4">
              <Ionicons name="play" color={"white"} size={48} />
              <Text className="ml-2 text-xl text-white font-bold">
                Antrenmana Devam Et
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFinishWorkout}>
            <View className="bg-[#ff6145] p-3 rounded-xl w-full flex flex-row items-center">
              <Ionicons name="stop" color={"white"} size={48} />
              <Text className="ml-2 text-xl text-white font-bold">
                Antrenmanı Sonlandır
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(WorkoutBackModal);
