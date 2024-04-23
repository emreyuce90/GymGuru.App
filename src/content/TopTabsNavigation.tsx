import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { bodyPart, workouts } from "../utils/types/datas";
import { Workouts } from "../screens";

const filteredWorkouts = (bodyPartId: number) => {
  const filtered = workouts?.filter((w) => w.bodyPartId === bodyPartId);
  return <Workouts workouts={filtered} />;
};

const TopTabsNavigation = () => {
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
          <TopTabs.Screen key={`${b.id - i}`} name={b.name}>
            {() => filteredWorkouts(b.id)}
          </TopTabs.Screen>
        );
      })}
    </TopTabs.Navigator>
  );
};

export default TopTabsNavigation;
