import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
} from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { globalStyles, themeColor1, themeColor2 } from "../style/appTheme";
import { MaterialIcons } from "@expo/vector-icons";
import { refreshLoad } from "../hooks/UseFetch";
//import { auth } from "../hooks/UseAuth";

const MedsCreate = ({ route, navigation }) => {
  // const { restApiUrl } = route.params;
  const restApiUrl = "http://boroda.tplinkdns.com:4005/api/meds";
  const [genericName, setGenericName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [medClass, setMedClass] = useState("");
  const [target, setTarget] = useState("");
  const [affectedAreas, setAffectedAreas] = useState("");
  const [riskInfections, setRiskInfections] = useState("");
  const [isPending, setIsPending] = useState(false);
  //   const history = useHistory();

  //   const { jwt: token } = auth.status();

  const clearState = () => {
    setGenericName("");
    setTradeName("");
    setMedClass("");
    setTarget("");
    setAffectedAreas("");
    setIsPending(false);
    setRiskInfections("");
  };

  // //   const handleAddInf = () => {
  // //     let newInfections = [...infections];
  // //     let nextId = newInfections.length + 1;
  // //     newInfections.push({ id: nextId, name: "" });
  // //     setInfections(newInfections);
  // //   };

  // //   const handleRemoveInf = (id) => {
  // //     let newInfections = infections.filter((inf) => inf.id !== id);
  // //     if (newInfections.length > 0) {
  // //       for (let i = 0; i < newInfections.length; i++) {
  // //         newInfections[i].id = i + 1;
  // //       }
  // //     } else {
  // //       newInfections.push({ id: 1, name: "" });
  // //     }

  // //     setInfections(newInfections);
  // //   };

  //   const setInfName = (iname, id) => {
  //     // console.log("changing", id);
  //     let newInfections = [...infections];
  //     newInfections[id - 1].name = iname;
  //     setInfections(newInfections);
  //   };

  const alertOnMessage = (title, message) => {
    if (Platform.OS === "web") {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message, [
        {
          text: "Understood",
          onPress: () => console.log("Alert closed"),
        },
      ]);
    }
  };

  const handleSubmit = (save) => {
    if (save) {
      if (genericName.length <= 1) {
        alertOnMessage(
          "Input Error",
          "Medication name must be longer than 1 char!"
        );
        return;
      }
      setIsPending(true);
      let med = {
        genericName,
        tradeName,
        medClass,
        target,
        affectedAreas,
        riskInfections,
      };

      console.log("med to submit", med, `url: ${restApiUrl}`);
      fetch(restApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(med),
      })
        .then(async (res) => {
          if (!res.ok) {
            let text = await res.text();
            if (!text) {
              text = "could not fetch the data for that resource";
            }
            alertOnMessage("Save Error from host", text);
            return null;
          }
          return await res.json();
        })
        .then((data) => {
          setIsPending(false);
          if (data) {
            console.log("done");
            refreshLoad();
            navigation.navigate("Home", {
              med: data.meds,
              action: "replace",
            });
          }
        })
        .catch((err) => {
          // auto catches network / connection error
          setIsPending(false);
          if (err.name !== "AbortError") {
            alertOnMessage("Network Error", err.message);
          }
        });
    } else {
      clearState();
      navigation.navigate("Home");
    }
  };

  const renderMedication = ({ item: inf }) => {
    return (
      <View style={globalStyles.infInput}>
        <TextInput
          style={globalStyles.inputInList}
          placeholder="infection..."
          value={inf.name}
          onChangeText={(x) => setInfName(x, inf.id)}
        />
        <Button
          type="outline"
          buttonStyle={globalStyles.button}
          containerStyle={globalStyles.miniButtonContainer}
          raised={true}
          titleStyle={globalStyles.title}
          icon={<MaterialIcons name="remove" size={15} color={themeColor1} />}
          onPress={() => handleRemoveInf(inf.id)}
        />
      </View>
    );
  };

  const dismissKeyboard = () => {
    if (Platform.OS !== "web") {
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => dismissKeyboard}>
      <View style={globalStyles.container}>
        <View style={globalStyles.edit}>
          <FlatList
            ListHeaderComponent={
              <View>
                <Text style={globalStyles.label}>Generic Name:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="e.g. Infliximab"
                  value={genericName}
                  onChangeText={setGenericName}
                />
                <Text style={globalStyles.label}>Trade Name(s):</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="e.g. Remicade"
                  value={tradeName}
                  onChangeText={setTradeName}
                />
                <Text style={globalStyles.label}>Class:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="e.g. TNF-alpha"
                  value={medClass}
                  onChangeText={setMedClass}
                />
                <Text style={globalStyles.label}>Target:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="e.g. TNF-alpha"
                  value={target}
                  onChangeText={setTarget}
                />
                <Text style={globalStyles.label}>Affected Areas:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="e.g. Inhibit T cell activation"
                  value={affectedAreas}
                  onChangeText={setAffectedAreas}
                />
                <Text style={globalStyles.label}>Risk Infections:</Text>
                <TextInput
                  style={globalStyles.input}
                  placeholder="e.g. Hepatitis B reactivation"
                  value={riskInfections}
                  onChangeText={setRiskInfections}
                />
              </View>
            }
          />
        </View>
        <View style={globalStyles.fixToText}>
          <Button
            title="save"
            type="outline"
            buttonStyle={globalStyles.button}
            containerStyle={globalStyles.buttonContainer}
            raised={true}
            titleStyle={globalStyles.title}
            icon={
              <MaterialIcons name="save-alt" size={15} color={themeColor1} />
            }
            iconContainerStyle={{ marginHorizontal: 10 }}
            onPress={() => handleSubmit(true)}
            disabled={isPending}
          />
          <Button
            title="cancel"
            type="outline"
            buttonStyle={globalStyles.button}
            containerStyle={globalStyles.buttonContainer}
            raised={true}
            titleStyle={globalStyles.title}
            icon={<MaterialIcons name="cancel" size={15} color={themeColor1} />}
            onPress={() => handleSubmit(false)}
            disabled={isPending}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MedsCreate;
