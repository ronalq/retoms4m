import { BrandVariants, Theme, createLightTheme, createDarkTheme } from "@fluentui/react-components";

const myNewTheme: BrandVariants = {
      10: "#020305",
      20: "#111820",
      30: "#162838",
      40: "#19344C",
      50: "#194162",
      60: "#224E73",
      70: "#375B7C",
      80: "#496887",
      90: "#5A7591",
      100: "#6B829C",
      110: "#7C90A7",
      120: "#8D9EB2",
      130: "#9EADBE",
      140: "#AFBBC9",
      150: "#C1CAD5",
      160: "#D2D9E1"
};

export const lightTheme: Theme = {
    ...createLightTheme(myNewTheme),
};

export const darkTheme: Theme = {
    ...createDarkTheme(myNewTheme),
};

darkTheme.colorBrandForeground1 = myNewTheme[110]; // use brand[110] instead of brand[100]
darkTheme.colorBrandForeground2 = myNewTheme[120]; // use brand[120] instead of brand[110]
