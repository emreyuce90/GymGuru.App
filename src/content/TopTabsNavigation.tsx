import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Movements } from "../screens";
import useMovements from "../screens/movement/hooks/useMovements";
import LoadingScreen from "../../lib/@core/components/LoadingScreen";
import useBodyPart from "../hooks/useBodyPart";
import NoDataView from "../../lib/@core/components/NoDataView";

const filteredWorkouts = (movements: IMovement[], bodyPartId: string) => {
  const filtered = movements?.filter((w) => w.bodyPartId === bodyPartId);

  if (filtered.length == 0) {
    return <NoDataView />;
  }
  return <Movements movements={filtered} />;
};

const TopTabsNavigation = () => {
  const {
    movements,
    loading: movementsLoading,
    error: movementsError,
  } = useMovements();
  const {
    bodyParts,
    loading: bodyPartsLoading,
    error: bodyPartsError,
  } = useBodyPart();

  const TopTabs = createMaterialTopTabNavigator();

  const loading = movementsLoading || bodyPartsLoading;
  const error = movementsError || bodyPartsError;

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: { color: "#FF6346", fontWeight: "bold" },
        tabBarIndicatorStyle: { borderColor: "#FF6346", borderWidth: 1 },
      }}
    >
      {bodyParts &&
        bodyParts?.map((b, i) => {
          return (
            <TopTabs.Screen
              key={i}
              name={`${b.name}(${
                movements.filter((w) => w.bodyPartId === b.id).length
              })`}
            >
              {() => filteredWorkouts(movements, b.id)}
            </TopTabs.Screen>
          );
        })}
    </TopTabs.Navigator>
  );
};

export default TopTabsNavigation;
