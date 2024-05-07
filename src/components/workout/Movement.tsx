import React from "react";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

type MovementPropTypes = {
  movement: IMovement;
};

const Movement = (props: MovementPropTypes) => {
  const { id, title, description, bodyPartId, imageUrl, videoUrl } =
    props.movement;
  const navigation = useNavigation<any>();
  console.log("ImageUrl", imageUrl);
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("MovementDetail", { movement: props.movement })
      }
    >
      <View key={title} className="mb-1 mt-1 px-2">
        <Bounceable onPress={() => {}}>
          <View className="bg-white p-1 flex flex-row justify-between items-center  rounded-lg ">
            {/* <Ionicons name={icon} size={24} /> */}

            {process.env.EXPO_PUBLIC_API_URL ===
            "https://api.gymguru.com.tr" ? (
              <Image
                className={imageUrl ? "" : "bg-orange-100 w-28 h-28 rounded-sm"}
                style={{ width: 100, height: 100 }}
                source={{
                  uri: imageUrl
                    ? `https://api.gymguru.com.tr/api.gymguru.com.tr/images/${imageUrl}`
                    : "string",
                }}
              />
            ) : (
              <Image
                className={imageUrl ? "" : "bg-orange-100 w-28 h-28 rounded-sm"}
                style={{ width: 100, height: 100 }}
                source={{
                  uri: imageUrl
                    ? `${process.env.EXPO_PUBLIC_API_URL}/wwwroot/images/${imageUrl}`
                    : "string",
                }}
              />
            )}

            {/* <Image className="" /> */}
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
