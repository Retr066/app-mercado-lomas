import { extendTheme } from "native-base";
interface ColorsProps {
  whiteBlue: string;
  whiteReal: string;
  blackBackground: string;
  dimBlack: string;
}
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};
const newColorTheme: ColorsProps = {
  whiteBlue: "#7cb4d6",
  whiteReal: "#EEEEEE",
  blackBackground: "#222831",
  dimBlack: "#393E46",
};

export const theme = extendTheme({ config, colors: newColorTheme });

type CustomThemeType = typeof theme;

// 3. Extend the internal NativeBase Theme
declare module "native-base" {
  interface ICustomTheme extends CustomThemeType {}
}
