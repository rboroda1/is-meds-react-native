import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import AddAgent from "../screens/AddAgent";
import { themeColor1, globalStyles } from "../style/appTheme";

const Stack = createStackNavigator();

const InputStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Add Immunosuppressant"
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColor1,
        },
        headerTintColor: "white",
        headerTitleStyle: globalStyles.header,
      }}
    >
      <Stack.Screen
        name="Add Immunosuppressant"
        component={AddAgent}
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
    </Stack.Navigator>
  );
};

export default InputStack;
