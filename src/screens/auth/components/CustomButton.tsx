import { Pressable, Text, ActivityIndicator, View, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

type CustomButtonPropTypes = {
  logo?: any;
  onPress: () => void;
  text: string;
  type: "primary" | "secondary" | "disabled";
  loading?: boolean;
};

const CustomButton = (props: CustomButtonPropTypes) => {
  const { onPress, text, type = "primary", loading, logo } = props;

  return (
    <Pressable
      onPress={onPress}
      className={`${type === "primary" ? "bg-blue-600" : ""} 
                  ${type === "secondary" ? "bg-gray-200" : ""} 
                  ${type === "disabled" ? "bg-gray-400" : ""} 
                  w-full p-4 mx-2 items-center rounded-full mt-6 flex flex-row justify-center space-x-4`}
      disabled={type === "disabled"}
    >
      {loading && (
        <ActivityIndicator color={`${type === "primary" ? "white" : "blue"}`} />
      )}

      {logo && (
        <Image
          source={logo}
          style={{ width: 40, height: 40, marginRight: 10 }} // Logo boyutu ve stili
        />
      )}
      <Text
        className={`${
          type === "primary" ? "text-white font-bold text-lg" : ""
        } ${type === "secondary" ? "text-gray-700 text-lg" : ""} ${
          type === "disabled" ? "text-gray-500 text-lg" : ""
        }`}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
