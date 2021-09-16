import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Medication({ item, onPressHandler }) {
  return (
    <TouchableOpacity onPress={() => onPressHandler(item)}>
      <Text style={styles.item}>
        <Text style={styles.boldText}>{item.genericName}</Text>, trade name:{" "}
        {item.tradeName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 6,
    borderColor: "#bbb",
    borderWidth: 1,
    elevation: 3,
    backgroundColor: "lavender",
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
