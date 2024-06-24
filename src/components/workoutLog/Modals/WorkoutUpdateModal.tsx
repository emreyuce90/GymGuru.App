import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

type WorkoutUpdateModal = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: () => void;
};
const WorkoutUpdateModal = (props: WorkoutUpdateModal) => {
  const { isVisible, setIsVisible, handleUpdate } = props;
  const navigation = useNavigation<any>();

  const handleUpdateClicked = () => {
    handleUpdate();
  };
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={() => setIsVisible(!isVisible)}
    >
      <View className="flex-1 justify-end items-center pb-2">
        <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50" />
        <View className="bg-white p-8 rounded-2xl ">
          <Text className="text-3xl font-extrabold text-black mb-2">
            Mevcut antrenmanınızın üzerine yazılsın mı?
          </Text>
          <Text className="text-base text-black mb-4">
            Mevcut antrenmanınızdan daha farklı bir antrenman
            yaptınız.Yaptığınız değişiklikler mevcut antrenmanınızın üzerine
            yazılsın mı?
          </Text>
          <TouchableOpacity onPress={handleUpdateClicked}>
            <View className="bg-red-500 w-full rounded-xl mb-2">
              <Text className="text-white text-2xl font-bold text-center p-2">
                Evet
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <View className="bg-gray-300 w-full rounded-xl">
              <Text className="text-black text-2xl font-bold text-center p-2">
                Hayır
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(WorkoutUpdateModal);
