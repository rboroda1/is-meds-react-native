import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Header from "./components/header";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_700Bold,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";
import { MyDrawer } from "./components/Drawer";
import Home from "./screens/AgentSearch";

export default function App() {
  // let domain = window.location.protocol + "//" + window.location.hostname;
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;
  else {
    return <MyDrawer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ced5e3",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
