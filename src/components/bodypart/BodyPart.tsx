import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const BodyPart = ({ bodypart, index }) => {
  const navigation = useNavigation();
  const { id, name, pictureUrl } = bodypart;

  return (
    <Animated.View
      entering={FadeInDown.duration(600)
        .delay(index * 200)
        .springify()}
      style={{ margin: wp(2) }} // Her kart arasına boşluk eklenir
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Exercises", { id, name, pictureUrl });
        }}
        style={{
          width: wp(44),
          height: wp(50),
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{
            uri: `${process.env.EXPO_PUBLIC_API_URL}/api.gymguru.com.tr/bodyPart/${pictureUrl}`,
          }}
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.7)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "50%",
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <Text
          style={{
            position: "absolute",
            bottom: hp(2),
            left: 0,
            right: 0,
            fontSize: hp(2.5),
            color: "#fff",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default BodyPart;
