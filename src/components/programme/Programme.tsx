import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type ProgrammePropTypes = {
  programme: IProgramme;
};

const Programme = (props: ProgrammePropTypes) => {
  const { id, name } = props.programme;
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ProgrammeDetail", {
          programmeId: id,
          programmeName: name,
        })
      }
    >
      <View key={id} className="mb-1 mt-1 px-5">
        <Bounceable onPress={() => {}}>
          <View className="bg-white p-5 flex flex-row justify-between items-center  rounded-lg ">
            <View className="ml-3 flex flex-1">
              <Text className="text-base text-[#696969]">{name}</Text>
            </View>
            <Ionicons name="chevron-forward" color={"#FF6346"} size={20} />
          </View>
        </Bounceable>
      </View>
    </Pressable>
  );
};

export default Programme;
