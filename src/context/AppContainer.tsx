import { NativeBaseProvider, ColorMode } from "native-base";
import React from "react";
import { theme } from "../config/theme";
import type { StorageManager } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
type AppContainerProps = {
  children: React.ReactNode;
};

const AppContainer = ({ children }: AppContainerProps) => {
  const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@my-app-color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        console.log(e);
        return "light";
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem("@my-app-color-mode", value === "dark" ? "dark" : "light");
      } catch (e) {
        console.log(e);
      }
    },
  };
  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </NativeBaseProvider>
  );
};

export default AppContainer;
