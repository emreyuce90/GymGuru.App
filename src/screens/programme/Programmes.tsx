import { View, Text, FlatList, ScrollView, Pressable } from "react-native";
import React from "react";
import { programmes } from "../../utils/types/datas";
import Programme from "../../components/programme/Programme";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";

const Programmes = () => {
  return (
    <View>
      <FlatList
        className="mt-4"
        data={programmes}
        renderItem={({ item }: { item: IProgramme }) => (
          <Programme programme={item} />
        )}
      />

      <Pressable
        onPress={() => {
          // console.log("Pressed");
        }}
      >
        <View className="mb-1 mt-1 px-5">
          <Bounceable onPress={() => {}}>
            <View className=" bg-indigo-400 p-5 flex flex-row justify-between items-center  rounded-lg ">
              <View className="ml-3 flex flex-row items-center gap-2">
                <Ionicons name="add-circle" size={40} color={"white"} />
                <Text className="text-base text-white">Yeni Program Ekle</Text>
              </View>
            </View>
          </Bounceable>
        </View>
      </Pressable>
    </View>
  );
};

export default Programmes;
