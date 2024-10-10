import { View, Text, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type CustomInputPropTypes = {
  value: string;
  placeholder: string;
  setValue: any;
  securityTextEntry?: boolean;
  errorMessage?: string;
  success?: boolean;
};

const CustomInput = (props: CustomInputPropTypes) => {
  const {
    value,
    setValue,
    placeholder,
    securityTextEntry,
    success,
    errorMessage,
  } = props;

  return (
    <>
      <View
        className={`flex-row items-center w-full p-4 bg-white border ${
          errorMessage
            ? "border-red-500"
            : success
            ? "border-green-500"
            : "border-gray-300"
        } rounded-2xl shadow-sm my-3`}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={securityTextEntry}
          className="flex-1 text-lg text-gray-700"
          placeholderTextColor="#aaa"
        />
        {errorMessage && (
          <Ionicons name="close-circle-outline" size={24} color="red" />
        )}
        {success && (
          <Ionicons name="checkmark-circle-outline" size={24} color="green" />
        )}
      </View>
      {errorMessage && (
        <Text className="text-red-500 text-sm">{errorMessage}</Text>
      )}
    </>
  );
};

export default CustomInput;
