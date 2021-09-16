import React from "react";
import { Button, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/AgentSearch";
import InputStack from "../routes/InputStack";
import SearchTabs from "../routes/SearchTabs";

const Drawer = createDrawerNavigator();

export function MyDrawer(props) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home Stack"
        drawerType="slide"
        // drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#ced5e3",
            width: 240,
          },
          activeTintColor: "blue",
          inactiveTintColor: "#aaa",
          labelStyle: {
            marginLeft: 5,
            fontFamily: "Roboto_400Regular",
          },
        }}
      >
        <Drawer.Screen
          name="Home Stack"
          options={{ drawerLabel: "Home", headerShown: false }}
        >
          {/* {(props) => <HomeStack {...props} />} */}
          {(props) => <SearchTabs {...props} />}
        </Drawer.Screen>
        <Drawer.Screen
          name="Add Agent"
          // Edit component later
          options={{ drawerLabel: "Add Agent", headerShown: false }}
        >
          {(props) => <InputStack {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
