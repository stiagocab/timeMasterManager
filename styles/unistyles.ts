/* eslint-disable @typescript-eslint/no-empty-object-type */
import { StyleSheet } from "react-native-unistyles";
import { breakpoints } from "./breakpoints";
import {
  blueThemeColors,
  darkThemeColors,
  githubDarkThemeColors,
  lightThemeColors,
} from "./colors";
import { themeSpacing } from "./spacing";
import { themeTypography } from "./typography";

export const lightTheme = {
  colors: lightThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const darkTheme = {
  colors: darkThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const blueTheme = {
  colors: blueThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const githubDarkTheme = {
  colors: githubDarkThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const appThemes = {
  light: lightTheme,
  dark: darkTheme,
  sky: blueTheme,
  githubDark: githubDarkTheme,
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
      return "dark";
    },
  },
  themes: appThemes,
});
