import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type MiniMenuPropTypes = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleExerciseRemove: () => void;
};

const MiniMenu = (props: MiniMenuPropTypes) => {
  const { visible, handleExerciseRemove } = props;

  return (
    visible && (
      <View className="relative z-10">
        <View className="bg-slate-800 w-40 p-4 rounded-lg space-y-4">
          <Pressable onPress={handleExerciseRemove}>
            <View className="flex flex-row items-center justify-center space-x-2">
              <Ionicons name="remove-circle-outline" size={24} color="white" />
              <Text className="text-white">Egzersizi kaldır</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => {}}>
            <View className="flex flex-row items-center justify-start space-x-2">
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text className="text-white">Not Ekle</Text>
            </View>
          </Pressable>
        </View>
        <View className="absolute top-0 right-3 w-3 h-3 bg-slate-800 rotate-45 transform translate-x-1 -translate-y-2" />
      </View>
    )
  );
};

export default React.memo(MiniMenu);
