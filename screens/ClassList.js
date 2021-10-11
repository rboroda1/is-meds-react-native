import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Divider } from "react-native-elements";
import SelectBox from "react-native-multi-selectbox";
import useFetch, { refreshLoad } from "../hooks/UseFetch";
import MedCard from "../components/medCard";
import { MaterialIcons } from "@expo/vector-icons";
import { themeColor1, globalStyles } from "../style/appTheme";
import { xorBy, findIndex } from "lodash";

const ClassList = ({ route, navigation }) => {
  const [selected, setSelected] = useState({});
  const [showMeds, setShowMeds] = useState([]);
  const [options, setOptions] = useState([]);
  const restApiUrl = "http://boroda.tplinkdns.com:4005/api/meds";
  const { error, isPending, data: meds } = useFetch(restApiUrl);
  var multiSelect = null;

  useEffect(() => {
    console.log("Home useEffect");
    if (meds !== null) {
      const classes = identifyClasses(meds);
      var newOptions = [];
      for (let i = 0; i < classes.length; i++) {
        newOptions.push({
          id: i,
          item: classes[i],
          index: i,
          medClass: classes[i],
        });
      }
      setOptions(newOptions);
    } else {
      setOptions([]);
    }
  }, [meds]);

  const onPressHandler = (item) => {
    console.log("item selected", item._id);
    if (selected && selected._id == item._id) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };

  //creates an array of unique classes
  const identifyClasses = (meds) => {
    const classes = meds
      .map((med) => med.medClass)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .sort();
    classes.unshift("NONE");
    console.log(classes);
    return classes;
  };

  const onMultiChange = (item) => {
    console.log("item", item);
    setSelected(item);
    let newSelected = meds.filter((med) => med.medClass == item.item);
    setShowMeds(newSelected);
  };

  const refresh = () => {
    refreshLoad();
    setSelected({});
  };

  const renderItem = ({ item }) => {
    console.log("renderItem::item", item);
    let med = item;
    return med && <MedCard item={med} onPressHandler={onPressHandler} />;
  };

  return (
    <View style={globalStyles.container}>
      {/* to form */}
      <View style={globalStyles.fixToSides}>
        <Text style={globalStyles.title}>Classes</Text>
        <MaterialIcons
          name="refresh"
          size={28}
          color={themeColor1}
          onPress={refresh}
        />
      </View>
      {isPending && <Text style={globalStyles.loading}>Loading...</Text>}
      {error && <Text style={globalStyles.error}>{error}</Text>}
      <Text style={globalStyles.subtitle}>
        Full List of Classes ({options.length - 1})
      </Text>
      {!isPending && options && options.length > 0 && (
        <SelectBox
          inputPlaceholder="Search"
          label={null}
          options={options}
          value={selected}
          onChange={onMultiChange}
          onTapClose={onMultiChange}
          multiOptionContainerStyle={styles.multiOptionsLabel}
          optionsLabelStyle={styles.option}
          arrowIconColor={themeColor1}
          searchIconColor={themeColor1}
          toggleIconColor={themeColor1}
        />
      )}
      {/* <Divider style={{ backgroundColor: themeColor1, marginTop: 10 }} /> */}
      <Text style={globalStyles.subtitle}>
        {"Agents in Class (" + showMeds.length + ")"}
      </Text>
      {!isPending && showMeds.length > 0 && (
        <FlatList
          style={styles.selectedMeds}
          data={showMeds}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

export default ClassList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  header: {
    borderRadius: 6,
    marginTop: 20,
    fontWeight: "bold",
    padding: 10,
  },
  optionsContainer: {
    backgroundColor: "#ced5e3",
  },
  item: {
    marginTop: 24,
    padding: 30,
    backgroundColor: "blue",
    fontSize: 24,
    marginHorizontal: 20,
  },
  multiOptionsLabel: {
    backgroundColor: themeColor1,
  },
  option: {
    color: themeColor1,
    //fontFamily: "Roboto_400Regular",
  },
  selectedMeds: {
    //flex: 1,
  },
});
