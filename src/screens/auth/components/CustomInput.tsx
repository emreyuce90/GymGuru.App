import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type CustomInputPropTypes = {
  value: string;
  placeholder: string;
  setValue: any;
  securityTextEntry?: boolean;
  errorMessage?: string;
  success?: boolean;
  width?: number;
};

const CustomInput = (props: CustomInputPropTypes) => {
  const {
    width,
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
        className={`flex-row justify-between ${width ? width : "100%"}`}
        style={errorMessage ? styles.containerError : styles.container}
      >
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={securityTextEntry}
        />
        {errorMessage && (
          <Ionicons name="close-circle-outline" size={28} color="red" />
        )}
        {success && (
          <Ionicons name="checkmark-circle-outline" size={28} color="green" />
        )}
      </View>

      <View className="w-full">
        {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingVertical: 10,
  },
  containerError: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    fontSize: 16,
  },
});

export default CustomInput;
