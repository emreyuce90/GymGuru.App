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

const Home = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation<any>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View className="mx-4">
          <Pressable onPress={() => navigation.openDrawer()}>
            <Feather name="menu" size={24} color="black" />
          </Pressable>
        </View>
      ),
    });
  }, []);

  return (
    // <SafeAreaView className="">
    <>
      <View className="flex flex-row items-center space-x-3 justify-between px-8 py-4 ">
        <View>
          <Text className="text-xl">
            Hoşgeldin, <Text className="font-bold">{user?.username} 👋</Text>
          </Text>
          <Text className="text-sm text-slate-500 mt-2">
            Antrenman yapmak için harika bir gün ☀️
          </Text>
        </View>
        {user?.token && jwtValid(user.loginDate) && (
          <Pressable
            className="text-sm font-thin text-black"
            onPress={() => {
              logout();
            }}
          >
            <Ionicons name="exit-outline" size={32} color="orange" />
          </Pressable>
        )}
      </View>

      <BodyParts />
    </>
  );
};

export default Home;
