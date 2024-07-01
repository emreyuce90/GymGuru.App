import React from "react";
import WorkoutLogReports from "./WorkoutLogReports";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

const Reports = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("WorkoutLogReports");
      }}
      style={{ width: wp(40), height: wp(40) }}
      className="flex bg-white p-4 items-center mt-2 rounded-xl ml-1 justify-center"
    >
      <Text className="font-bold text-2xl">124</Text>
      <Text className="">Antrenman</Text>
      <Ionicons
        name="chevron-forward-circle"
        color="#FF6346"
        size={40}
        style={{ position: "absolute", bottom: 12, right: 12 }}
      />
    </TouchableOpacity>
  );
};

export default Reports;
