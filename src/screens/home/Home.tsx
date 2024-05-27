import {
  View,
  Text,
  Pressable,
  Image,
  Button,
  TouchableHighlight,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ImageSlider from "../../components/home/ImageSlider";

const Home = () => {
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
    // <SafeAreaView className="flex-1 flex-col items-center">
    //   <View className="flex flex-row items-center space-x-3">
    //     <View>
    //       <Text className="text-xl">
    //         Hoşgeldin, <Text className="font-bold">Emre Yüce 👋</Text>
    //       </Text>
    //       <Text className="text-sm text-slate-500 mt-2">
    //         Antrenman yapmak için harika bir gün ☀️
    //       </Text>
    //     </View>
    //     <View className="">
    //       <Image
    //         className="rounded-full"
    //         source={{
    //           uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww",
    //         }}
    //         style={{ width: wp(20), height: hp(10) }}
    //       />
    //     </View>
    //   </View>
    //   {/* Image Slider */}
    //   <View className="mt-7">
    //     <ImageSlider />
    //   </View>
    //   {/* BodyParts List */}
    //   <View className="p-6">
    //     <View className="flex flex-row space-x-2">
    //       <View className="bg-green-200 flex flex-col justify-center items-center p-3 w-30 h-30">
    //         <Ionicons name="fitness-outline" size={40} color="#FF6346" />
    //         <Text className="text-base text-slate-600">BMI Hesapla</Text>
    //       </View>
    //       <View className="bg-green-200 flex flex-col justify-center items-center p-3 w-30 h-30">
    //         <Ionicons name="nutrition-outline" size={40} color="#FF6346" />
    //         <Text className="text-base text-slate-600">Kalori Hesapla</Text>
    //       </View>
    //       <View className="bg-green-200 flex flex-col justify-center items-center p-3 w-30 h-30">
    //         <Ionicons name="barbell-outline" size={40} color="#FF6346" />
    //         <Text className="text-base text-slate-600">Antrenmanlarım</Text>
    //       </View>
    //     </View>
    //   </View>
    // </SafeAreaView>
    <TouchableHighlight onPress={() => navigation.navigate("WorkoutLogs")}>
      <Text>Git</Text>
    </TouchableHighlight>
  );
};

export default Home;
