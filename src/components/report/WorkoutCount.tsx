import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useWorkoutCount from "../../screens/Reports/hooks/useWorkoutCount";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";

type WorkoutCountPropTypes = {
  width: number;
  height: number;
};

const WorkoutCount = (props: WorkoutCountPropTypes) => {
  const { width, height } = props;
  const { loading, error, count } = useWorkoutCount();
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("WorkoutLogReports");
      }}
      style={{
        width: width,
        height: height,
      }}
      className="flex bg-white p-4 items-center mt-2 rounded-xl ml-1 justify-center"
    >
      <Text className="font-bold text-2xl">{count}</Text>
      <Text className="">Antrenman</Text>
      <Ionicons
        name="chevron-forward-circle-outline"
        color="#FF6346"
        size={40}
        style={{ position: "absolute", top: 12, right: 12 }}
      />
    </TouchableOpacity>
  );
};

export default WorkoutCount;
