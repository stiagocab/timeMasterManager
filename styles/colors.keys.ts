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
