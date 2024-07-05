import React from "react";
import { View } from "react-native";
import WorkoutCount from "../../components/report/WorkoutCount";
import UsersMeasurements from "../../components/report/UsersMeasurements";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const Reports = () => {
  return (
    <View className="flex flex-col justify-center">
      <WorkoutCount width={wp(100)} height={wp(40)} />
      <UsersMeasurements width={wp(100)} height={wp(40)} />
    </View>
  );
};

export default Reports;
