import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type AddExercisePropTypes = {
  exercise: IMovement;
  handleItemStatusChange: (item: IMovement) => void;
};

const AddExercise = (props: AddExercisePropTypes) => {
  const { exercise, handleItemStatusChange } = props;
  return (
    <View className="px-1 py-2 rounded-lg shadow-md">
      <View className="bg-white rounded-lg">
        <View className="flex-row items-center p-3">
          <Pressable
            onPress={() => {
              handleItemStatusChange({
                ...exercise,
              });
            }}
          >
            <Ionicons
              name={`${
                exercise.isChecked ? "checkmark-circle" : "radio-button-off"
              }`}
              size={24}
              color="#388D3F"
            />
          </Pressable>
          <View>
            <Image
              className="rounded-full p-1"
              width={80}
              height={80}
              source={{
                uri: `https://api.gymguru.com.tr/api.gymguru.com.tr/images/${exercise.imageUrl}`,
              }}
            />
          </View>
          <View className="flex flex-col ml-2">
            <View className="ml-2">
              <Text className="font-semibold text-lg">{exercise.title}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(AddExercise);
