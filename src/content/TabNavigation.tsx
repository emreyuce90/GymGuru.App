import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  Home,
  Movements,
  Programmes,
  Reports,
  Settings,
  Supplements,
} from "../screens";
import { Ionicons } from "@expo/vector-icons";
import TopTabsNavigation from "./TopTabsNavigation";
import { applicationColors } from "../utils/types/constants";

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "barbell-sharp" : "barbell-outline";
          } else if (route.name === "Movements") {
            iconName = focused ? "barbell-sharp" : "barbell-outline";
          } else if (route.name === "Programmes") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          } else if (route.name === "Reports") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName as any} size={24} color={color} />;
        },
        tabBarActiveTintColor: applicationColors.ButtonColor,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          bottom: 0,
          left: 0,
          right: 0,
          height: 84,
          //backgroundColor: "rgba(255, 255, 255, 0.90)",
          borderTopWidth: 0,
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
        options={{ headerShown: false, tabBarLabel: "Egzersizler" }}
      />
      {/* <Tab.Screen
        name="Movements"
        component={TopTabsNavigation}
        options={{ headerTitle: "Hareketler", title: "Hareketler" }}
      /> */}
      <Tab.Screen
        name="Programmes"
        component={Programmes}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: "Ayarlar", title: "Ayarlar" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
