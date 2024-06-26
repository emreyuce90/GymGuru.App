import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home, Movements, Programmes } from "../screens";
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
          } else if (route.name === "Movements") {
            iconName = focused ? "barbell-sharp" : "barbell-outline";
          } else if (route.name === "Programmes") {
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
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: "Anasayfa", title: "Anasayfa" }}
      />
      {/* <Tab.Screen
        name="Movements"
        component={TopTabsNavigation}
        options={{ headerTitle: "Hareketler", title: "Hareketler" }}
      /> */}
      <Tab.Screen
        name="Programmes"
        component={Programmes}
        options={{ headerTitle: "Programlarım", title: "Programlarım" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
