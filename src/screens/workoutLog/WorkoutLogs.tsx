import { View, Text, TouchableHighlight, Image, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

/*
Konfeti patlama efekti
  1- 9.antrenmanınız tamamlandı
  Bu bilgiyi geçmek için bu ekrana gelmeden evvel son yapılan requesste kullanıcının antrenmanlarına count atılır buraya prop olarak geçilir
  2- Antrenman adı yine üst componentten geçilir . Örn: FullBody | 1. Gün
  3- Antrenman hacmi , tüm antrenmandaki set sayıları ile kg çarpılarak hacim elde edilir
  4-Duration bilgisi üst componentten gelir
  5-Tarih o günkü tarihten elde edilir propa gerek yok
  6-FlatList tanımlanır flat list içerisine antrenmandaki hareket adı set sayıları ve tekrar sayıları verilir   
*/

function HeaderTitle() {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-col">
        <Text className="text-xl font-semibold text-white">Harika!</Text>
        <Text className="text-xl font-extrabold text-white">
          9.ANTRENMANINIZ
        </Text>
        <Text className="text-xl font-extrabold text-white">TAMAMLANDI!</Text>
      </View>
      <View className="flex items-center justify-center w-full pr-20">
        <Image
          source={require("../../../assets/images/workoutLog/prize.png")}
          style={{ width: 150, height: 150 }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

type WorkoutLogsPropTypes = {
  workoutCount: number;
  workoutName: string;
  workout: IWorkout[];
  duration: number;
};

const WorkoutLogs = (props) => {
  const { workoutCount, workoutName, workout, duration } = props;
  //volume
  //date , o anki tarih formatlı bir şekilde elde edilir
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      style: {},
      headerLeft: null,
      headerStyle: {
        backgroundColor: "#ff6145",
        height: 200,
      },
      headerTitle: (props) => <HeaderTitle {...props} />,
    });
  }, [navigation]);
  return (
    <View className="flex-1 bg-indigo-200 justify-between">
      <View className="bg-white flex flex=col">
        <View></View>
      </View>
      <Pressable onPress={() => {}} className={"bg-[#FF6346]"}>
        <View className="w-full flex flex-row items-center justify-center  rounded-xl py-3 px-4 space-x-3 mb-2">
          <Ionicons name="flag-outline" size={24} color={"white"} />
          <Text className=" text-white font-semibold uppercase text-lg ">
            BİTTİ
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default WorkoutLogs;
