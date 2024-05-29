import { View, Text, Modal, Alert, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
type MiniMenuPropTypes = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleExerciseRemove: () => void;
};

const MiniMenu = (props: MiniMenuPropTypes) => {
  const { visible, handleExerciseRemove } = props;

  {
    return (
      visible && (
        <View className="flex flex-col">
          <View className="bg-slate-800 w-40 px-4 py-2 rounded-lg">
            <Pressable onPress={handleExerciseRemove}>
              <View className="flex flex-row items-center justify-center space-x-2">
                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color="white"
                />
                <Text className="text-white">Egzersizi kaldır</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )
    );
  }
};

export default React.memo(MiniMenu);
