import { View, Text, FlatList } from "react-native";
import React from "react";
import useBodyPart from "./hooks/useBodyPart";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import NoDataView from "../../../lib/@core/components/NoDataView";
import BodyPart from "../../components/bodypart/BodyPart";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useRoute } from "@react-navigation/native";

const BodyParts = () => {
  const { bodyparts, loading, error } = useBodyPart();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return bodyparts ? (
    <View className="mx-6 mt-8 flex-1">
      <Text
        className="font-semibold text-neutral-700"
        style={{ fontSize: heightPercentageToDP(3) }}
      >
        Egzersizler
      </Text>
      <FlatList
        data={bodyparts}
        renderItem={({ item, index }) => (
          <BodyPart bodypart={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 30 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
      />
    </View>
  ) : (
    <NoDataView />
  );
};

export default BodyParts;
