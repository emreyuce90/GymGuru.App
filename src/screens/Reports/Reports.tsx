import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import WorkoutCount from "../../components/report/WorkoutCount";
import UsersMeasurements from "../../components/report/UsersMeasurement";
import useGetUserMeasurement from "./hooks/useGetUserMeasurement";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import NoDataView from "../../../lib/@core/components/NoDataView";

const Reports = () => {
  const { measurements, error, loading } = useGetUserMeasurement();
  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }
  return (
    // <View className="flex flex-col justify-center">
    //   <WorkoutCount width={wp(100)} height={wp(40)} />
    //   <UsersMeasurements width={wp(100)} height={wp(40)} />
    // </View>
    measurements ? (
      <FlatList
        data={measurements}
        renderItem={({ item }) => <UsersMeasurements measurement={item} />}
        keyExtractor={(item) => item.bodyMetricsId}
      />
    ) : (
      <NoDataView />
    )
  );
};

export default Reports;
