import { themeSpacing } from "../spacing";
import { themeTypography } from "../typography";
import * as paletteColors from "./colors";

import type { Palette } from "./colors.keys";

const themeCreator = (colors: Palette) => {
  return {
    colors: colors,
    ...themeSpacing,
    typography: themeTypography,
  };
};

export const lightTheme = themeCreator(paletteColors.lightThemeColors);

// export const lightTheme = {
//   colors: paletteColors.lightThemeColors,
//   ...themeSpacing,
//   typography: themeTypography,
// };

export const darkTheme = {
  colors: paletteColors.darkThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const blueTheme = {
  colors: paletteColors.blueThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const githubDarkTheme = {
  colors: paletteColors.githubDarkThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const cherryDark = {
  colors: paletteColors.cherryBlossomDarkColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const cherryLight = {
  colors: paletteColors.cherryBlossomLightColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const darkEmerald = {
  colors: paletteColors.highContrastDarkGreenThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};
export const darkCoffee = {
  colors: paletteColors.highContrastDarkCoffeeThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};

export const mochaMist = {
  colors: paletteColors.mochaMistThemeColors,
  ...themeSpacing,
  typography: themeTypography,
};

// export const sunsetCoral = createTheme(sunsetCoralColors);
// export const oceanBreeze = createTheme(oceanBreezeColors);
// export const arcticAurora = createTheme(arcticAuroraColors);
