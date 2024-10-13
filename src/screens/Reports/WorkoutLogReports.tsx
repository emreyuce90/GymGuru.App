import { View, Text, FlatList } from "react-native";
import React from "react";
import useReports from "./hooks/useReports";
import Report from "../../components/report/Report";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";

const WorkoutLogReports = () => {
  const { loading, error, reports } = useReports();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <FlatList
      initialNumToRender={6}
      data={reports}
      renderItem={({ item, index }) => <Report report={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default WorkoutLogReports;
