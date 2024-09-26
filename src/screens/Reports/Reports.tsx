import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import WorkoutCount from "../../components/report/WorkoutCount";
import UsersMeasurements from "../../components/report/UsersMeasurement";
import useGetUserMeasurement from "./hooks/useGetUserMeasurement";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import NoDataView from "../../../lib/@core/components/NoDataView";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ScrollView } from "react-native-virtualized-view";
import { IMeasureUpdate } from "../../components/report/types/IMeasureUpdate";
import Api from "../../../lib/@core/data/Api";

const Reports = () => {
  const { measurements, error, loading, reFetch } = useGetUserMeasurement();
  const [userMeasurements, setUserMeasurements] = useState<IUserMeasurements[]>(
    []
  );

  useEffect(() => {
    if (measurements) {
      setUserMeasurements(measurements);
    }
  }, [measurements]);

  const handleMeasurementUpdate = useCallback(
    async (data: IMeasureUpdate) => {
      try {
        const response = await Api.post(`/api/Metrics/`, {
          bodymetricId: data.bodyMetricId,
          userId: "04aa9bc1-ee4b-45e0-8feb-08dcde5262d9",
          value: data.value,
          metricId: data.metricId ?? "",
        });
        if (response.Success) {
          setUserMeasurements((prevMeasurements): IUserMeasurements[] =>
            prevMeasurements.map((measurement) =>
              measurement.bodyMetricsId === data.bodyMetricId
                ? {
                    ...measurement,
                    value: data.value.toString(), // value'yu string'e dönüştür
                  }
                : measurement
            )
          );
        } else {
          alert(response.Message);
        }
      } catch (error) {
        alert(error);
      }
    },
    [reFetch]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <ScrollView>
      <WorkoutCount
        width={widthPercentageToDP(100)}
        height={widthPercentageToDP(40)}
      />
      {measurements ? (
        <FlatList
          scrollEnabled
          data={userMeasurements}
          renderItem={({ item, index }) => (
            <UsersMeasurements
              index={index}
              measurement={item}
              handleMeasurementUpdate={handleMeasurementUpdate}
            />
          )}
          keyExtractor={(item) => item.bodyMetricsId}
        />
      ) : (
        <NoDataView />
      )}
    </ScrollView>
  );
};

export default Reports;
