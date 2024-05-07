import { View, Text, Pressable, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons } from "@expo/vector-icons";

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
    <SafeAreaView className="flex-1 flex-col justify-evenly items-center px-8">
      <View>
        <Text className="text-xl">
          Hoşgeldin, <Text className="font-bold">Emre Yüce 👋</Text>
        </Text>
        <Text className="text-sm text-slate-500 mt-2">
          Antrenman yapmak için harika bir gün ☀️
        </Text>
      </View>
      <View className="p-6">
        <View className="flex flex-row space-x-2">
          <View className="bg-green-200 flex flex-col justify-center items-center p-3 w-30 h-30">
            <Ionicons name="fitness-outline" size={40} color="#FF6346" />
            <Text className="text-base text-slate-600">BMI Hesapla</Text>
          </View>
          <View className="bg-green-200 flex flex-col justify-center items-center p-3 w-30 h-30">
            <Ionicons name="nutrition-outline" size={40} color="#FF6346" />
            <Text className="text-base text-slate-600">Kalori Hesapla</Text>
          </View>
          <View className="bg-green-200 flex flex-col justify-center items-center p-3 w-30 h-30">
            <Ionicons name="barbell-outline" size={40} color="#FF6346" />
            <Text className="text-base text-slate-600">Antrenmanlarım</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
