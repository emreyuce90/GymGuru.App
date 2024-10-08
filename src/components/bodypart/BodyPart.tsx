import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";

type BodyPartPropTypes = {
  bodypart: IBodyPart;
  index: number;
};

const BodyPart = (props: BodyPartPropTypes) => {
  const navigation = useNavigation<any>();
  const { id, name, pictureUrl } = props.bodypart;
  return (
    <Animated.View
      entering={FadeInDown.duration(600)
        .delay(props.index * 200)
        .springify()}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Exercises", { id, name, pictureUrl });
        }}
        style={{ width: wp(44), height: wp(50) }}
        className="flex justify-end p-4 mb-4"
      >
        <Image
          resizeMode="cover"
          style={{ width: wp(42), height: wp(52) }}
          src={`${process.env.EXPO_PUBLIC_API_URL}/api.gymguru.com.tr/bodyPart/${pictureUrl}`}
          className="rounded-2xl absolute"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{ width: wp(44), height: hp(15) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0 rounded-b-[35px]"
        />
        <Text
          style={{ fontSize: hp(2.3) }}
          className="text-white font-semibold text-center tracking-wide"
        >
          {name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BodyPart;
