import { View, Text, TouchableHighlight } from "react-native";
import React, { useState } from "react";
import CustomInput from "../auth/components/CustomInput";
import { Picker } from "@react-native-picker/picker";

const AddNewProgramme = () => {
  const [name, setName] = useState<string>("");
  const [day, setDay] = useState<number>(1);
  return (
    <>
      <View className="flex p-3">
        <View className="flex flex-col">
          <Text className="text-xl">Program Adı:</Text>
          <CustomInput
            placeholder="Program adını yazınız"
            value={name}
            setValue={setName}
          />
          <View></View>
        </View>
        <View className="flex">
          <Text className="text-xl">Antrenman kaç günden oluşacak</Text>
          <Picker
            selectedValue={day}
            style={{ width: "100%", backgroundColor: "white" }}
            onValueChange={(value, index) => setDay(value)}
          >
            {[...Array(7).keys()].map((i) => (
              <Picker.Item
                key={i + 1}
                label={(i + 1).toString()}
                value={i + 1}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View className="flex p-3">
        <Text className="text-xl">1.Gün Antrenmanı</Text>
        <TouchableHighlight onPress={() => {}}></TouchableHighlight>
      </View>
    </>
  );
};

export default AddNewProgramme;
