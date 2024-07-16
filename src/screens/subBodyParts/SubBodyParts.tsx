import { View, Text, FlatList } from "react-native";
import React from "react";
import useSubBodyParts from "./hooks/useSubBodyParts";
import LoadingScreen from "../../../lib/@core/components/LoadingScreen";
import ErrorScreen from "../../../lib/@core/components/ErrorScreen";
import SubBodyPart from "../../components/subBodyPart/SubBodyPart";

type SubBodyPartsPropTypes = {
  bodypartId: string;
};

const SubBodyParts = (props: SubBodyPartsPropTypes) => {
  const { bodypartId } = props;
  const { loading, error, subbodyparts } = useSubBodyParts(bodypartId);
  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }
  return (
    subbodyparts && (
      <FlatList
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingTop: 20,
        }}
        data={subbodyparts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubBodyPart key={item.id} subBodyPart={item} />
        )}
      />
    )
  );
};

export default SubBodyParts;
