import { View, Text, FlatList } from "react-native";
import React from "react";
import useGetUserMetricLogs from "./hooks/useGetUserMetricLogs";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import UserLogMetric from "../../components/report/UserLogMetric";

type DynamicPropTypes = {
  measurements: IUserMeasurements;
};

const Dynamic = (props: DynamicPropTypes) => {
  const { measurements } = props;
  const { loading, error, metricLogs } = useGetUserMetricLogs(
    measurements.bodyMetricsId
  );

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <FlatList
      renderItem={({ item, index }) => (
        <UserLogMetric index={index} metric={item} />
      )}
      data={metricLogs}
      keyExtractor={(item) => item.createdDate.toString()}
    />
  );
};

export default Dynamic;
