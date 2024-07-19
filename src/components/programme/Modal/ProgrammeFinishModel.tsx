import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";

type ProgrammeFinishModelPropTypes = {
  messages: string[];
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProgrammeFinishModel = (props: ProgrammeFinishModelPropTypes) => {
  const { messages, visible, setVisible } = props;
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <View className="flex-1 justify-end items-center pb-2">
        <View className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50" />
        <View className="bg-white p-8 rounded-2xl ">
          {messages.map((m, i) => {
            return (
              <Text key={i} className="text-xl mb-10">
                {m}
              </Text>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <View className="bg-red-500 w-full rounded-xl mb-2">
              <Text className="text-white text-xl font-bold text-center p-2">
                TAMAM
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(ProgrammeFinishModel);
