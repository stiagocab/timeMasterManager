/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useStore } from "@/store/RooStore";
import { StyleSheet } from "react-native-unistyles";
import { breakpoints } from "./breakpoints";
import {
  blueTheme,
  cherryDark,
  cherryLight,
  darkCoffee,
  darkEmerald,
  darkTheme,
  githubDarkTheme,
  lightTheme,
  mochaMist,
} from "./colors/palettes";

export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
  sky: blueTheme,
  githubDark: githubDarkTheme,
  cherryDark,
  cherryLight,
  darkCoffee,
  darkEmerald,
  mochaMist,
};

type AppThemes = typeof appThemes;
type AppColors = typeof lightTheme.colors;
type AppBreakpoints = typeof breakpoints;

export type BorderRadiusKey = keyof typeof lightTheme.borderRadius;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesColors extends AppColors {}
}

StyleSheet.configure({
  settings: {
    initialTheme: () => {
      const preferredTheme = useStore.getState().preferences.theme;
      return preferredTheme;
      // return preferencesStore.theme as keyof UnistylesThemes;
    },
  },
  breakpoints,
  themes: appThemes,
});
