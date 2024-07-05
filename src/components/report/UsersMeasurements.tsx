import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import useGetUserWeight from "../../screens/Reports/hooks/useGetUserWeight";
import { Feather, Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";

type UsersMeasurementsPropTypes = {
  width: number;
  height: number;
};

const UsersMeasurements = (props: UsersMeasurementsPropTypes) => {
  const { width, height } = props;
  const { loading, error, weight } = useGetUserWeight();
  const [clicked, setClicked] = useState<boolean>(false);

  const [text, setText] = useState<string>(weight?.toString() || "0");

  const handleWeightClicked = () => {
    setClicked((prev) => !prev);
    //api isteği yap, istek başarılı olduğunda yeni değeri yaz ve kapat
  };
  return !clicked ? (
    <TouchableOpacity
      onPress={handleWeightClicked}
      style={{
        width: width,
        height: height,
      }}
      className="flex bg-white p-4 items-center mt-2 rounded-xl ml-1 justify-center"
    >
      <Text className="font-bold text-2xl">{weight}</Text>
      <Text className="">Ağırlık(KG)</Text>
      <Feather
        name="edit"
        color="#FF6346"
        size={28}
        style={{ position: "absolute", top: 12, right: 14 }}
      />
    </TouchableOpacity>
  ) : (
    <>
      <TouchableOpacity
        onPress={() => {
          setClicked((prev) => !prev);
        }}
        style={{
          width: width,
          height: height,
        }}
        className="flex bg-white p-4 items-center mt-2 rounded-xl ml-1 justify-center"
      >
        <Text className="font-bold text-2xl"></Text>
        <TextInput
          keyboardType="numeric"
          onChangeText={setText}
          value={text}
          autoFocus
          style={{
            fontSize: 28,
            fontWeight: "500",
          }}
        />

        <Text className="">Ağırlık(KG)</Text>
        {weight && parseInt(text) > 0 ? (
          <Ionicons
            name="checkmark-circle-outline"
            color="green"
            size={40}
            style={{ position: "absolute", top: 12, right: 14 }}
          />
        ) : (
          <Ionicons
            name="close-circle-outline"
            color="red"
            size={40}
            style={{ position: "absolute", top: 12, right: 14 }}
          />
        )}
      </TouchableOpacity>
    </>
  );
};

export default UsersMeasurements;
