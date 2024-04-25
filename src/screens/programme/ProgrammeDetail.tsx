import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProgrammeDetail = () => {
  const route = useRoute() as any;
  const { programmeId, programmeName } = route.params;
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${programmeName}`,
    });
  }, []);
  return (
    <View>
      <Text>ProgrammeDetail</Text>
    </View>
  );
};

export default ProgrammeDetail;
