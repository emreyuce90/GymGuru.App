import { View, Text } from "react-native";
import React from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";
import { formatDuration } from "./Report";
import { Ionicons } from "@expo/vector-icons";

type UserLogMetricPropTypes = {
  metric: IUserMetricLog;
  index: number;
};

const UserLogMetric = (props: UserLogMetricPropTypes) => {
  const { metric, index } = props;
  const width = wp(100);
  const height = wp(20);
  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(index * 200)
        .springify()}
    >
      <View
        style={{
          width: width,
          height: height,
        }}
        className={`bg-white flex flex-row justify-between p-6 items-center mt-2 rounded-xl ml-1 `}
      >
        <View className="">
          <Text className="text-lg font-bold text-gray-800">
            {moment(metric.createdDate).format("DD-MMM-YYYY")}
          </Text>
          <Text className="text-lg  text-gray-800">
            {moment(metric.createdDate).format("LT")}
          </Text>
        </View>
        <View>
          <Text className="text-2xl text-[#FF8265] font-bold">
            {metric.value}
            {`${metric.metricName === "Kilo" ? "kg" : "cm"}`}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default UserLogMetric;
