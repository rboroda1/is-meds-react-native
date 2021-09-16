import React from "react";
import { StyleSheet, View, Button } from "react-native";
import Header from "../components/header";
import MedsList from "./MedsList";
import { globalStyles, themeColor1, themeColor2 } from "../style/appTheme";

export default function AgentSearch() {
  return (
    <View style={globalStyles.container}>
      {/* list of meds */}
      <MedsList />
    </View>
  );
}
