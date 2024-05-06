import React, { useLayoutEffect, useMemo } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import SubProgramme from "../../components/subProgramme/SubProgramme";
import useSubProgramme from "./hooks/useSubProgramme";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import NoDataView from "../../../lib/@core/components/NoDataView";

const SubProgrammes = () => {
  const route = useRoute();
  const { programmeId, programmeName } = route.params as any;
  const navigation = useNavigation();
  const {
    loading,
    error,
    subProgrammes: subProgrammeData,
  } = useSubProgramme({ programmeId });

  const subProgrammes = useMemo(() => {
    return (
      subProgrammeData?.filter((sp) => sp.programmeId === programmeId) || []
    );
  }, [subProgrammeData, programmeId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: programmeName,
    });
  }, [navigation, programmeName]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return subProgrammes.length === 0 ? (
    <NoDataView />
  ) : (
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
