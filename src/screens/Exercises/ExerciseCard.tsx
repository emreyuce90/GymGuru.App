import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "expo-image";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";

type ExerciseCardPropTypes = {
  exercise: IMovement;
  index: number;
};

const ExerciseCard = (props: ExerciseCardPropTypes) => {
  const navigation = useNavigation<any>();
  const { title, imageUrl, id, tip, videoUrl, bodyPartId, description } =
    props.exercise;
  console.log(
    "uri",
    `${process.env.EXPO_PUBLIC_API_URL}${
      process.env.EXPO_PUBLIC_API_URL == "https://api.gymguru.com.tr"
        ? "/api.gymguru.com.tr"
        : ""
    }/images/${imageUrl}`
  );
  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(props.index * 200)
        .springify()}
    >
      <TouchableOpacity
        className="flex py-3 space-y-2"
        onPress={() => {
          navigation.navigate("MovementDetail", props.exercise);
        }}
      >
        <View className="bg-neutral-200 shadow rounded-[25px]">
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_API_URL}${
                process.env.EXPO_PUBLIC_API_URL == "https://api.gymguru.com.tr"
                  ? "/api.gymguru.com.tr"
                  : ""
              }/images/${imageUrl}`,
            }}
            contentFit="cover"
            style={{ width: wp(44), height: wp(52) }}
            className="rounded-[32px]"
          />
        </View>
        <Text
          style={{ fontSize: hp(1.7) }}
          className="font-semibold text-neutral-700 tracking-wide ml-1 mx-auto"
        >
          {title.length > 20 ? title.slice(0, 20) + "..." : title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ExerciseCard;
