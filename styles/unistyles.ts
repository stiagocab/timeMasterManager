/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useStore } from "@/store/RooStore";
import { StyleSheet } from "react-native-unistyles";
import { breakpoints } from "./breakpoints";
import {
  arcticAuroraColors,
  blueThemeColors,
  cherryBlossomDarkColors,
  cherryBlossomLightColors,
  darkThemeColors,
  forestNightThemeColors,
  githubDarkThemeColors,
  highContrastDarkCoffeeThemeColors,
  highContrastDarkGreenThemeColors,
  highContrastDarkThemeColors,
  lightThemeColors,
  mochaMistThemeColors,
  oceanBreezeColors,
  sunsetCoralColors,
} from "./colors";

import { themeSpacing } from "./spacing";
import { themeTypography } from "./typography";

import type { Palette } from "./colors.keys";

const createTheme = (colors: Palette) => ({
  colors,
  ...themeSpacing,
  typography: themeTypography,
});

export const light = createTheme(lightThemeColors);
export const dark = createTheme(darkThemeColors);
export const sky = createTheme(blueThemeColors);

export const github = createTheme(githubDarkThemeColors);
export const darkContrast = createTheme(highContrastDarkThemeColors);
export const darkEmerald = createTheme(highContrastDarkGreenThemeColors);
export const darkCoffee = createTheme(highContrastDarkCoffeeThemeColors);

export const forestNight = createTheme(forestNightThemeColors);
export const mochaMist = createTheme(mochaMistThemeColors);

export const sunsetCoral = createTheme(sunsetCoralColors);
export const oceanBreeze = createTheme(oceanBreezeColors);
export const arcticAurora = createTheme(arcticAuroraColors);
export const cherryLight = createTheme(cherryBlossomLightColors);
export const cherryDark = createTheme(cherryBlossomDarkColors);

export const appThemes = {
  /* básicos */
  light,
  dark,
  sky,

  /* variaciones oscuras */
  github, // GitHub‑Dark inspirado
  darkContrast, // High‑Contrast neutro
  darkEmerald, // High‑Contrast verde
  darkCoffee, // High‑Contrast café

  /* ambientales */
  forestNight,
  mochaMist,
} as const;

type AppThemes = typeof appThemes;
type AppColors = typeof light.colors;
type AppBreakpoints = typeof breakpoints;

export type BorderRadiusKey = keyof typeof light.borderRadius;

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
  themes: appThemes,
});
