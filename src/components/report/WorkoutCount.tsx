import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useWorkoutCount from "../../screens/Reports/hooks/useWorkoutCount";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";

type WorkoutCountPropTypes = {
  width: number;
  height: number;
};

const WorkoutCount = (props: WorkoutCountPropTypes) => {
  const { width, height } = props;
  const { loading, error, count } = useWorkoutCount();
  const navigation = useNavigation<any>();

  return (
    <Animated.View entering={FadeInDown.duration(600).delay(190).springify()}>
      <LinearGradient colors={["#2C3E50", "#4CA1AF"]}>
        {count > 0 && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WorkoutLogReports");
            }}
            style={{
              width: width,
              height: height,
            }}
            className="flex p-4 items-center mt-2 rounded-xl ml-1 justify-center"
          >
            <Text className="font-bold text-3xl text-white">{count}</Text>
            <Text className="font-semibold text-white text-base">
              Antrenman
            </Text>
            <Ionicons
              name="chevron-forward-circle-outline"
              color="white"
              size={40}
              style={{ position: "absolute", top: "50%", right: "10%" }}
            />
          </TouchableOpacity>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

export default React.memo(WorkoutCount);
