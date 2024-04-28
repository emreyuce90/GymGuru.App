import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { subProgramme } from "../../utils/types/datas";
import { Bounceable } from "rn-bounceable";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import SubProgramme from "../../components/subProgramme/SubProgramme";

const SubProgrammes = () => {
  const route = useRoute() as any;
  const { programmeId, programmeName } = route.params;
  const navigation = useNavigation();

  const subProgrammes: ISubProgramme[] = subProgramme.filter(
    (sp) => sp.programmeId === programmeId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${programmeName}`,
    });
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        data={subProgrammes}
        renderItem={({ item }) => (
          <SubProgramme programmeName={programmeName} subprogramme={item} />
        )}
      />
    </SafeAreaView>
  );
};

export default SubProgrammes;
