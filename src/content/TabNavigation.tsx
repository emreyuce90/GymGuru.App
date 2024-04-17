import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Home } from "../screens";
import { Ionicons } from "@expo/vector-icons";

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Sessions") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "More") {
            iconName = focused ? "book" : "book-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={24} color={color} />;
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
    </Tab.Navigator>
  );
};

export default TabNavigation;
