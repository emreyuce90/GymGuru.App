import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { bodyPart, workouts } from "../utils/types/datas";
import { Workouts } from "../screens";

const TopTabsNavigation = () => {
  const TopTabs = createMaterialTopTabNavigator();
  return (
    <TopTabs.Navigator
      tabBarOptions={{
        scrollEnabled: true,
      }}
    >
      {bodyPart?.map((b, i) => {
        return (
          <TopTabs.Screen key={`${b.id - i}`} name={b.name}>
            {() => {
              const filtered = workouts?.filter((w) => w.bodyPartId === b.id);
              return <Workouts workouts={filtered} />;
            }}
          </TopTabs.Screen>
        );
      })}
    </TopTabs.Navigator>
  );
};

export default TopTabsNavigation;
