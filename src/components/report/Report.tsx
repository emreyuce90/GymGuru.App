import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/tr";

type ReportPropTypes = {
  report: IWorkoutLog;
};

const formatDuration = (seconds: number) => {
  const duration = moment.duration(seconds, "seconds");
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();
  if (hours > 0) {
    return `${hours}sa ${minutes}dk`;
  } else {
    return `${minutes}dk`;
  }
};

const Report = (props: ReportPropTypes) => {
  const { workoutDate, workoutTime, workoutName } = props.report;

  const formattedDuration = formatDuration(workoutTime);

  return (
    <TouchableOpacity className="flex-row items-center p-4 bg-white border-b border-gray-200">
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-800">
          {moment(workoutDate).format("DD-MMM-YYYY")}
        </Text>
        <Text className="text-sm text-gray-600">{workoutName}</Text>
        <Text className="text-sm text-gray-600">
          {formatDuration(workoutTime)}
        </Text>
      </View>
      <Ionicons
        className="text-gray-400"
        size={24}
        color={"#FF6346"}
        name="chevron-forward-circle"
      />
    </TouchableOpacity>
  );
};

export default Report;
