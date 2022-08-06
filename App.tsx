import React from "react";
import AppContainer from "./src/context/AppContainer";
import Navigator from "./src";
import { registerRootComponent } from "expo";

export default function App() {
  return (
    <AppContainer>
      <Navigator />
    </AppContainer>
  );
}

registerRootComponent(App);
