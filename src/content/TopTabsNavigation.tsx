import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Movements } from "../screens";
import useMovements from "../screens/movement/hooks/useMovements";
import LoadingScreen from "../../lib/@core/components/LoadingScreen";
import useBodyPart from "../hooks/useBodyPart";
import ErrorScreen from "../../lib/@core/components/ErrorScreen";
import NoDataView from "../../lib/@core/components/NoDataView";

const TopTabsNavigation = () => {
  const { movements } = useMovements();
  const { bodyParts, loading, error } = useBodyPart();

  const filteredWorkouts = (bodyPartId: string) => {
    const filtered = movements?.filter((w) => w.bodyPartId === bodyPartId);

    if (filtered.length == 0) {
      return <NoDataView />;
    }
    return <Movements movements={filtered} />;
  };
  const TopTabs = createMaterialTopTabNavigator();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: { color: "#FF6346", fontWeight: "bold" },
        tabBarIndicatorStyle: { borderColor: "#FF6346", borderWidth: 1 },
      }}
    >
      {bodyParts?.map((b, i) => {
        return (
          <TopTabs.Screen
            key={i}
            name={`${b.name}(${
              movements.filter((w) => w.bodyPartId === b.id).length
            })`}
          >
            {() => filteredWorkouts(b.id)}
          </TopTabs.Screen>
        );
      })}
    </TopTabs.Navigator>
  );
};

export default TopTabsNavigation;
