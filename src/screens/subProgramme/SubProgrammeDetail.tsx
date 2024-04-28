import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { subProgrammeMovements } from "../../utils/types/datas";
import SubProgrammeDetailRender from "../../components/subProgramme/SubProgrammeDetailRender";

const SubProgrammeDetail = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();

  const { subProgrammeId, subProgrammeName, programmeName } =
    route.params as any;

  const movements: ISubProgrammeMovement[] = useMemo(() => {
    return subProgrammeMovements.filter(
      (p) => p.subProgrammeId === subProgrammeId
    );
  }, [subProgrammeId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${programmeName} | ${subProgrammeName}`,
    });
  }, []);

  return (
    <View>
      {movements &&
        movements.map((m, i) => (
          <SubProgrammeDetailRender key={m.id} movement={m} />
        ))}
    </View>
  );
};

export default SubProgrammeDetail;
