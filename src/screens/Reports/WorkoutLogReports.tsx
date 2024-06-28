import { View, Text, FlatList } from "react-native";
import React from "react";
import useReports from "./hooks/useReports";
import Report from "../../components/report/Report";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";

const WorkoutLogReports = () => {
  const { loading, error, reports } = useReports();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <FlatList
      data={reports}
      renderItem={({ item, index }) => <Report report={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default WorkoutLogReports;
