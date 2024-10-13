import { View, Text } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import SubProgrammeDetailRender from "../../components/subProgramme/SubProgrammeDetailRender";
import useSubProgrammeMovements from "./hooks/useSubProgrammeMovements";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { Bounceable } from "rn-bounceable";
import Api from "../../../lib/@core/data/Api";
import { getCurrentDateTime, getCurrentTime } from "../../../lib/@core/utils";
import { ScrollView } from "react-native-gesture-handler";
import { useAuth } from "../../context/AuthProvider";

const SubProgrammeDetail = () => {
  const { user } = useAuth();
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { subProgrammeId, subProgrammeName, programmeName } =
    route.params as any;
  const { loading, error, subProgrammeMovements } = useSubProgrammeMovements({
    subProgrammeId,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subProgrammeError, setsubProgrammeError] = useState<unknown | string>(
    ""
  );
  // const movements: ISubProgrammeMovement[] = useMemo(() => {
  //   return subProgrammeMovements.filter(
  //     (p) => p.subProgrammeId === subProgrammeId
  //   );
  // }, [subProgrammeId]);

  const handleWorkoutStart = useCallback(async () => {
    const now = new Date();
    try {
      setIsLoading(true);
      const request = await Api.post("/api/Workout/StartWorkout", {
        userId: user?.id,
        subProgrammeId: subProgrammeId,
        workoutDate: now.toISOString(),
        startTime2: getCurrentTime(),
      });

      if (request.Success) {
        navigation.navigate("Workouts", {
          workoutId: request.Resource.resource.id,
          workoutName: `${programmeName} | ${subProgrammeName}`,
          subProgrammeId: subProgrammeId,
        });
      }
    } catch (error) {
      setsubProgrammeError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${programmeName} | ${subProgrammeName}`,
    });
  }, []);
  if (loading || isLoading) return <LoadingScreen />;
  return (
    <>
      <ScrollView className="flex mt-5">
        {subProgrammeMovements &&
          subProgrammeMovements?.map((m, i) => (
            <SubProgrammeDetailRender key={m.id} movement={m} />
          ))}
      </ScrollView>
      <Bounceable onPress={handleWorkoutStart}>
        <View className="flex flex-row items-center justify-center bg-orange-500 rounded-xl mt-2 mb-2 ml-5 mr-5">
          <Ionicons name="fitness-outline" size={36} color={"white"} />
          <Text className=" text-white p-4 font-semibold uppercase text-xl ">
            Başla
          </Text>
        </View>
      </Bounceable>
    </>
  );
};

export default SubProgrammeDetail;
