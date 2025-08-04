
// colors.keys.ts
export const COLOR_KEYS = [
  "primary",
  "secondary",
  "accent",
  "background",
  "surface",
  "border",
  "highlight",
  "info",
  "success",
  "warning",
  "error",
  "text",
] as const;

export type ColorKey = (typeof COLOR_KEYS)[number];

export type ColorsKey = ColorKey | `${ColorKey}Foreground`;

export type Palette = {
  [K in ColorKey | `${ColorKey}Foreground`]: string;
};

type SpacingBreakPoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export interface ThemePalette {
  colors: Palette;
  // typography: typeof themeTypography;
  spacing: SpacingBreakPoints;
  borderRadius: SpacingBreakPoints;
}
