import { View, Text, Pressable } from "react-native";
import React, { useRef } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

type UserLogMetricPropTypes = {
  metric: IUserMetricLog;
  index: number;
  handleDelete: (metricId: string | undefined, index: number) => void;
};

const rightSwipeActions = (
  index: number,
  swipeableRef: any,
  metricId: string | undefined,
  handleDelete: (metricId: string | undefined, index: number) => void
) => {
  return (
    <Pressable
      style={{ height: wp(18) }}
      className="flex flex-row items-center justify-center bg-red-500 rounded-md px-3 mt-3"
      onPress={async () => {
        handleDelete(metricId, index);
        swipeableRef.current?.close();
      }}
    >
      <Ionicons name="remove-circle-outline" size={24} color="white" />
      <Text className="font-bold text-white">Sil</Text>
    </Pressable>
  );
};

const UserLogMetric = (props: UserLogMetricPropTypes) => {
  const swipeableRefs = useRef<any>([]);
  const { metric, index, handleDelete } = props;
  const width = wp(100);
  const height = wp(20);
  console.log("metric?.metricName", metric?.metricName);
  return (
    <Animated.View
      entering={FadeInDown.duration(400)
        .delay(index * 200)
        .springify()}
    >
      <Swipeable
        ref={(ref) => (swipeableRefs.current[index] = ref)}
        key={index}
        renderRightActions={() =>
          rightSwipeActions(
            index,
            swipeableRefs.current[index],
            metric.metricId,
            handleDelete
          )
        }
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
              {moment(metric?.createdDate).format("DD-MMM-YYYY")}
            </Text>
            <Text className="text-lg  text-gray-800">
              {moment(metric?.createdDate).format("LT")}
            </Text>
          </View>
          <View>
            <Text className="text-2xl text-[#FF8265] font-bold">
              {metric.value}
              {`${metric?.metricName === "Kilo" ? "kg" : "cm"}`}
            </Text>
          </View>
        </View>
      </Swipeable>
    </Animated.View>
  );
};

export default UserLogMetric;
