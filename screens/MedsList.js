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
import Medication from "../components/medication";
import useFetch, { refreshLoad } from "../hooks/UseFetch";
import MedCard from "../components/medCard";
import { MaterialIcons } from "@expo/vector-icons";
import { themeColor1, globalStyles } from "../style/appTheme";
import { xorBy, findIndex } from "lodash";

// const MedsList = () => {
//   const [selected, setSelected] = useState(null);

//   // selectItem = (data) => {
//   //   data.item.isSelect = !data.item.isSelect;
//   //   data.item.selectedClass = data.item.isSelect
//   //     ? styles.selected
//   //     : styles.list;

//   //   const index = this.state.dataSource.findIndex(
//   //     (item) => data.item.id === item.id
//   //   );

//   //   this.state.dataSource[index] = data.item;

//   //   this.setState({
//   //     dataSource: this.state.dataSource,
//   //   });
//   // };

//   const onPressHandler = (item) => {
//     console.log("item selected", item._id);
//     if (selected && selected._id == item._id) {
//       setSelected(null);
//     } else {
//       setSelected(item);
//     }
//   };

//   const restApiUrl = "http://boroda.tplinkdns.com:4005/api/meds";
//   //const restApiUrl = "http://192.168.0.45:4005/api/meds";
//   const { data: meds } = useFetch(restApiUrl);
//   return (
//     <View style={styles.list}>
//       <FlatList
//         data={meds}
//         renderItem={({ item }) => (
//           <Medication item={item} onPressHandler={onPressHandler} />
//         )}
//       />
//       {selected && (
//         <>
//           <Text style={styles.header}>Selected: </Text>
//           <Medication item={selected} onPressHandler={onPressHandler} />
//           <MedCard item={selected} onPressHandler={onPressHandler} />
//         </>
//       )}
//     </View>
//   );
// };

const MedsList2 = ({ route, navigation }) => {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const restApiUrl = "http://boroda.tplinkdns.com:4005/api/meds";
  const { error, isPending, data: meds } = useFetch(restApiUrl);
  var multiSelect = null;

  useEffect(() => {
    console.log("Home useEffect");
    if (meds !== null) {
      var newOptions = [];
      for (let i = 0; i < meds.length; i++) {
        newOptions.push({
          id: meds[i]._id,
          item:
            meds[i].genericName +
            (meds[i].tradeName ? ` (${meds[i].tradeName})` : ""),
          index: i,
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

  const onMultiChange = (item) => {
    // console.log("item", item);
    setSelected(xorBy(selected, [item], "id"));
  };

  const refresh = () => {
    refreshLoad();
    setSelected([]);
  };

  const renderItem = ({ item }) => {
    // console.log("renderItem::item", item);
    let med = meds[item.index];
    return med && <MedCard item={med} onPressHandler={onPressHandler} />;
  };

  return (
    <View style={globalStyles.container}>
      {/* to form */}
      <View style={globalStyles.fixToSides}>
        <Text style={globalStyles.title}>Medications</Text>
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
        Full List of Meds ({options.length})
      </Text>
      {!isPending && options && options.length > 0 && (
        <SelectBox
          inputPlaceholder="Search"
          label={null}
          options={options}
          selectedValues={selected}
          onMultiSelect={onMultiChange}
          onTapClose={onMultiChange}
          multiOptionContainerStyle={styles.multiOptionsLabel}
          optionsLabelStyle={styles.option}
          arrowIconColor={themeColor1}
          searchIconColor={themeColor1}
          toggleIconColor={themeColor1}
          isMulti
        />
      )}
      {/* <Divider style={{ backgroundColor: themeColor1, marginTop: 10 }} /> */}
      <Text style={globalStyles.subtitle}>
        {"Selected Meds (" + selected.length + ")"}
      </Text>
      {!isPending && selected.length > 0 && (
        <FlatList
          style={styles.selectedMeds}
          data={selected}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default MedsList2;

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
    // backgroundColor: "lavender",
    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: "#333",
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // marginHorizontal: 4,
    // marginVertical: 2,
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
