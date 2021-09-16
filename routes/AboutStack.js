import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import AboutPage from "../screens/AboutPage";
import { globalStyles, themeColor } from "../utilities/Theme";

const Stack = createStackNavigator();

const AboutStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="About"
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColor,
        },
        headerTintColor: "white",
        headerTitleStyle: globalStyles.header,
      }}
    >
      <Stack.Screen
        name="About"
        component={AboutPage}
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

export default AboutStack;
