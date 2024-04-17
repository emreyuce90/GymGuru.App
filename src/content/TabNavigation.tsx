import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home, Workouts, Tracks } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import TopTabsNavigation from "./TopTabsNavigation";

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Workouts") {
            iconName = focused ? "barbell-sharp" : "barbell-outline";
          } else if (route.name === "Tracks") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName as any} size={24} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 84,
        },
        tabBarItemStyle: {
          height: 72,
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Workouts" component={TopTabsNavigation} />
      <Tab.Screen name="Tracks" component={Tracks} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
