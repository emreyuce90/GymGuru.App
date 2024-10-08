import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";

type SubProgrammePropTypes = {
  subprogramme: ISubProgramme;
  programmeName: string;
};

const SubProgramme = (props: SubProgrammePropTypes) => {
  const { id, name, programmeId } = props.subprogramme;
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("SubProgrammeDetail", {
          subProgrammeId: id,
          subProgrammeName: name,
          programmeName: props.programmeName,
        })
      }
    >
      <View key={id} className="mb-1 mt-1 px-5">
        <Bounceable onPress={() => {}}>
          <View className="bg-white p-5 flex flex-row justify-between items-center  rounded-lg ">
            <View className="ml-3 flex flex-row items-center">
              <View className="mr-2">
                <Ionicons name="menu" color={"#FF6346"} size={20} />
              </View>
              <Text className="text-base text-[#696969]">{name}</Text>
            </View>
            <Ionicons name="chevron-forward" color={"#FF6346"} size={20} />
          </View>
        </Bounceable>
      </View>
    </Pressable>
  );
};

export default SubProgramme;
