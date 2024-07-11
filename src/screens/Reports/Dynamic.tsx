import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useGetUserMetricLogs from "./hooks/useGetUserMetricLogs";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import UserLogMetric from "../../components/report/UserLogMetric";
import CustomLineCharts from "../../components/charts/CustomLineCharts";
import { ScrollView } from "react-native-virtualized-view";
import Api from "../../../lib/@core/data/Api";
import Toast from "react-native-toast-message";

type DynamicPropTypes = {
  measurements: IUserMeasurements;
};

const Dynamic = (props: DynamicPropTypes) => {
  const { measurements } = props;
  const { loading, error, metricLogs } = useGetUserMetricLogs(
    measurements.bodyMetricsId
  );
  const [userMetricLogs, setUserMetricsLog] = useState<
    IUserMetricLog[] | undefined
  >(metricLogs);

  const handleDeleteItem = async (
    metricId: string | undefined,
    index: number
  ) => {
    try {
      const res = await Api.delete(`/api/Metrics/${metricId}`, {});
      if (res.Success) {
        Toast.show({
          type: "success",
          text1: `${res.Resource.message}`,
        });
        setUserMetricsLog((prev) => {
          return prev?.filter((_, i) => i !== index);
        });
      } else {
        Toast.show({
          type: "error",
          text1: `Silme işlemi esnasında bir hata meydana geldi`,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: `Silme işlemi esnasında bir hata meydana geldi`,
        text2: `${error}`,
      });
    }
  };

  useEffect(() => {
    if (metricLogs) {
      setUserMetricsLog(metricLogs);
    }
  }, [metricLogs]);

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView className="flex mb-10">
      <CustomLineCharts />
      <FlatList
        renderItem={({ item, index }) => (
          <UserLogMetric
            handleDelete={handleDeleteItem}
            index={index}
            metric={item}
          />
        )}
        data={userMetricLogs}
        keyExtractor={(item) => item.createdDate.toString()}
      />
    </ScrollView>
  );
};

export default Dynamic;
