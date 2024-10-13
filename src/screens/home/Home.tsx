import { View, Text, Pressable, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BodyParts from "../Bodyparts/BodyParts";
import { useAuth } from "../../context/AuthProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { jwtValid } from "../../context/SecureStore";
import { applicationColors } from "../../utils/types/constants";

const Home = () => {
  const { user, logout } = useAuth();

  const navigation = useNavigation<any>();

  return (
    <>
      <View className="flex flex-row items-center space-x-3 justify-between px-8 py-4 mt-12 ">
        <View>
          <Text className="text-xl">
            Hoşgeldin, <Text className="font-bold">{user?.username} 👋</Text>
          </Text>
          <Text className="text-sm text-slate-500 mt-2">
            Antrenman yapmak için harika bir gün ☀️
          </Text>
        </View>
        {user && (
          <Pressable
            className="text-sm font-thin text-black"
            onPress={() => {
              logout();
            }}
          >
            <Ionicons
              name="exit-outline"
              size={32}
              color={applicationColors.ButtonColor}
            />
          </Pressable>
        )}
      </View>

      <BodyParts />
    </>
  );
};

export default Home;
