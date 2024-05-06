import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import SubProgrammeDetailRender from "../../components/subProgramme/SubProgrammeDetailRender";
import useSubProgrammeMovements from "./hooks/useSubProgrammeMovements";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";

const SubProgrammeDetail = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { subProgrammeId, subProgrammeName, programmeName } =
    route.params as any;
  const { loading, error, subProgrammeMovements } = useSubProgrammeMovements({
    subProgrammeId,
  });

  // const movements: ISubProgrammeMovement[] = useMemo(() => {
  //   return subProgrammeMovements.filter(
  //     (p) => p.subProgrammeId === subProgrammeId
  //   );
  // }, [subProgrammeId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${programmeName} | ${subProgrammeName}`,
    });
  }, []);
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  return (
    <View>
      {subProgrammeMovements &&
        subProgrammeMovements?.map((m, i) => (
          <SubProgrammeDetailRender key={m.id} movement={m} />
        ))}
    </View>
  );
};

export default SubProgrammeDetail;
