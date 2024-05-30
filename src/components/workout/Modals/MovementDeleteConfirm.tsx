import { View, Text, Modal, Button, Pressable } from "react-native";
import React from "react";

type MovementDeleteConfirmPropTypes = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => void;
};

const MovementDeleteConfirm = (props: MovementDeleteConfirmPropTypes) => {
  const { visible, setVisible, handleDelete } = props;
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible((prev) => !prev)}
      transparent={true}
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="bg-white py-3 px-1 rounded-lg">
          <Text className="mb-4 p-4">
            Bu egzersizi silmek istediğinizden emin misiniz?
          </Text>
          <View className="flex-row justify-center space-x-4">
            <Pressable onPress={handleDelete}>
              <View className="bg-green-600 px-4 py-2 rounded-xl">
                <Text className="text-white">Evet</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setVisible((prev) => !prev);
              }}
            >
              <View className="bg-red-600 px-4 py-2 rounded-xl">
                <Text className="text-white">Hayır</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MovementDeleteConfirm;
