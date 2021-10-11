import React from "react";
import { StyleSheet, View, Button } from "react-native";
import ClassList from "./ClassList";
import { globalStyles, themeColor1, themeColor2 } from "../style/appTheme";

export default function ClassSearch() {
  return (
    <View style={globalStyles.container}>
      {/* list of meds */}
      <ClassList />
    </View>
  );
}
