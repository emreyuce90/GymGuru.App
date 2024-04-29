import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { bodyPart } from "../utils/types/datas";
import { Movements } from "../screens";
import useMovements from "../screens/movement/hooks/useMovements";

const TopTabsNavigation = () => {
  const { movements, loading, error } = useMovements();

  const filteredWorkouts = (bodyPartId: number) => {
    const filtered = movements?.filter((w) => w.bodyPartId === bodyPartId);
    return <Movements movements={filtered} />;
  };
  const TopTabs = createMaterialTopTabNavigator();
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarLabelStyle: { color: "#FF6346", fontWeight: "bold" },
        tabBarIndicatorStyle: { borderColor: "#FF6346", borderWidth: 1 },
      }}
    >
      {bodyPart?.map((b, i) => {
        return (
          <TopTabs.Screen
            key={`${b.id - i}`}
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
