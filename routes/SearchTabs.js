import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { globalStyles, themeColor1, themeColor2 } from "../style/appTheme";
import MedSearchStack from "./MedSearchStack";
import ClassSearchStack from "./ClassSearchStack";

const Tab = createBottomTabNavigator();

const SearchTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search by Agent"
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: themeColor1,
        },
        headerTintColor: "white",
        tabBarActiveTintColor: "cornflowerblue",
        tabBarInactiveTintColor: themeColor2,
        tabBarStyle: { backgroundColor: themeColor1 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Search by Agent") {
            iconName = focused ? "medical" : "medical-outline";
          } else if (route.name === "Search by Class") {
            iconName = focused ? "medical" : "medical-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Search by Agent"
        component={MedSearchStack}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <MaterialIcons name="menu" size={28} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Search by Class"
        component={ClassSearchStack}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => navigation.toggleDrawer()}
            >
              <MaterialIcons name="menu" size={28} color="white" />
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default SearchTabs;
