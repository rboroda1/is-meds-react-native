import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { themeColor1, themeColor2, globalStyles } from "../style/appTheme";

export default function MedCard({ item }) {
  return (
    <View>
      <Text style={styles.item}>
        <Text style={styles.boldText}>{item.genericName}</Text>, trade name:{" "}
        {item.tradeName}
        <Text>
          {"\n"}
          <Text style={styles.boldText}>Class: </Text>
          {item.medClass}
        </Text>
        <Text>
          {"\n"}
          <Text style={styles.boldText}>Target: </Text>
          {item.target}
        </Text>
        <Text>
          {"\n"}
          <Text style={styles.boldText}>Immune system effects: </Text>
          {"\n"}
          {item.affectedAreas}
        </Text>
        <Text>
          {"\n"}
          <Text style={styles.boldText}>Infections at risk: </Text>
          {"\n"}
          {item.riskInfections}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    color: themeColor2,
    borderRadius: 6,
    borderColor: "#bbb",
    borderWidth: 1,
    elevation: 3,
    backgroundColor: themeColor1,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    padding: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
});
