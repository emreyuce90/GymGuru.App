import React from "react";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

type MovementPropTypes = {
  movement: IMovement;
};

const Movement = (props: MovementPropTypes) => {
  const { id, title, description, bodyPartId, icon } = props.movement;
  const navigation = useNavigation<any>();
  console.log("uri", icon);
  return (
    <Pressable
      onPress={() => navigation.navigate("MovementDetail", { movementId: id })}
    >
      <View key={title} className="mb-1 mt-1 px-2">
        <Bounceable onPress={() => {}}>
          <View className="bg-white p-1 flex flex-row justify-between items-center  rounded-lg ">
            {/* <Ionicons name={icon} size={24} /> */}
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: icon,
              }}
            />
            {/* <Image className="bg-orange-100 w-28 h-28 rounded-sm" /> */}
            <View className="ml-3 flex flex-1">
              <Text className="text-base text-[#696969]">{title}</Text>
            </View>
            <Ionicons name="chevron-forward" color={"#FF6346"} size={20} />
          </View>
        </Bounceable>
      </View>
    </Pressable>
  );
};

export default Movement;
