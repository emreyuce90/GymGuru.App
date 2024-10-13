import { View, FlatList } from "react-native";
import React from "react";
import useBodyPart from "./hooks/useBodyPart";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import NoDataView from "../../../lib/@core/components/NoDataView";
import BodyPart from "../../components/bodypart/BodyPart";

const BodyParts = () => {
  const { bodyparts, loading, error } = useBodyPart();

  if (loading) {
    return <LoadingScreen />;
  }

  return bodyparts ? (
    <View className="mx-1 mt-8 flex-1">
      <FlatList
        initialNumToRender={6}
        data={bodyparts}
        renderItem={({ item, index }) => (
          <BodyPart bodypart={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "center",
        }}
      />
    </View>
  ) : (
    <NoDataView />
  );
};

export default BodyParts;
