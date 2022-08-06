import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { HomeScreen, LoginScreen, RegisterScreen, WelcomeScreen, Presentation } from "./screens";
import { Image } from "native-base";
const logo = require("../src/assets/logo.png");

const Stack = createNativeStackNavigator<any>();

const LogoTitle = () => {
  return <Image style={{ width: 50, height: 50 }} alt="logo-mercado-lomas" source={logo} />;
};

const options: NativeStackNavigationOptions = {
  headerShown: true,
  title: "Iniciar Sesión",
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#1a6eb0",
  },

  headerRight: () => <LogoTitle />,
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Presentation">
        <Stack.Screen
          name="Presentation"
          component={Presentation}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Welcome"
          component={WelcomeScreen}
        />
        <Stack.Screen options={options} name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
