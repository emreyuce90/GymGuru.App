import React from "react";
import { FlatList, Text, View } from "react-native";
import WorkoutCount from "../../components/report/WorkoutCount";
import UsersMeasurements from "../../components/report/UsersMeasurement";
import useGetUserMeasurement from "./hooks/useGetUserMeasurement";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import NoDataView from "../../../lib/@core/components/NoDataView";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ScrollView } from "react-native-virtualized-view";

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
    //
    //   <UsersMeasurements width={wp(100)} height={wp(40)} />
    // </View>
    <ScrollView>
      <WorkoutCount
        width={widthPercentageToDP(100)}
        height={widthPercentageToDP(40)}
      />
      {measurements ? (
        <FlatList
          scrollEnabled
          data={measurements}
          renderItem={({ item }) => <UsersMeasurements measurement={item} />}
          keyExtractor={(item) => item.bodyMetricsId}
        />
      ) : (
        <NoDataView />
      )}
    </ScrollView>
  );
};

export default Reports;
