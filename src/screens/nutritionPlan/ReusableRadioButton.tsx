import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

type RadioButtonPropTypes = {
  label: string;
  value: string;
  selectedValue: string;
  onPress: (value: string) => void;
};

const ReusableRadioButton = (props: RadioButtonPropTypes) => {
  const { label, value, selectedValue, onPress } = props;
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={{
        flex: 1,
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={styles.radio}>
        {selectedValue === value && <View style={styles.selectedRadio}></View>}
      </View>
      <Text style={{ flex: 1, fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ReusableRadioButton;

const styles = StyleSheet.create({
  radio: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  selectedRadio: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "black",
  },
});
