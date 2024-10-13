import { View, Text, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import useReportByWorkoutId from "./hooks/useReportByWorkoutId";

import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import { calculateVolume } from "../../components/workout";
import { getFormattedTime } from "../../components/workout/StopWatch";
import WorkoutLog from "../../components/workoutLog/WorkoutLog";
import NoDataView from "../../../lib/@core/components/NoDataView";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

function formatDateTime(date: Date) {
  // Tarih formatlaması için
  const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "short",
  });
  let formattedDate = dateFormatter.format(date).toUpperCase();

  // Saat formatlaması için
  const timeFormatter = new Intl.DateTimeFormat("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const formattedTime = timeFormatter.format(date);

  return { formattedDate, formattedTime };
}

function Header(props: any) {
  const {
    formattedTime,
    formattedDate,
    workoutName,
    duration,
    movementDetails,
  } = props;

  if (
    !formattedTime ||
    !formattedDate ||
    !workoutName ||
    !duration ||
    !movementDetails
  ) {
    return (
      <View className="flex-1 flex-col space-y-4 items-center justify-center p-4">
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Veri bulunamadı
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 flex-col space-y-4 items-center justify-center p-4">
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
        }}
      >
        {`${workoutName} Programı`}
      </Text>
      <View className="flex flex-row justify-around w-full">
        <View className="flex flex-col items-center justify-center">
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            {`${calculateVolume(movementDetails)}kg`}
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>Hacim</Text>
        </View>
        <View className="flex flex-col items-center justify-center">
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            {getFormattedTime(duration)}
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>Süre</Text>
        </View>
        <View className="flex flex-col items-center justify-center">
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
            {formattedDate}
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>{formattedTime}</Text>
        </View>
      </View>
    </View>
  );
}

const WorkoutLogReportsDetail = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { workoutId } = route.params as any;

  const { loading, error, reportDetails } = useReportByWorkoutId({
    workoutId: workoutId,
  });
  const { formattedDate, formattedTime } = formatDateTime(
    new Date(reportDetails?.workoutDate || "2024-07-01T14:06:43.848")
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#ff6145",
        height: widthPercentageToDP(40),
      },
      headerTitle: (props: any) => (
        <Header
          formattedTime={formattedTime}
          formattedDate={formattedDate}
          duration={reportDetails?.duration || 0}
          movementDetails={reportDetails?.movementDetails || []}
          workoutName={reportDetails?.workoutName || ""}
          {...props}
        />
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, reportDetails]);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <View className="flex-1">
      {reportDetails ? (
        <FlatList
          data={reportDetails.movementDetails}
          renderItem={({ item }) => (
            <WorkoutLog
              key={item.movementId}
              workout={{
                movementName: item.movementName,
                movementSets: item.movementSets,
              }}
            />
          )}
          keyExtractor={(item) => item.movementName}
        />
      ) : (
        <NoDataView />
      )}
    </View>
  );
};

export default WorkoutLogReportsDetail;
