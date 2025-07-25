import { ColorsKey } from "@/styles/colors.keys";
import type { IconProps as PhosphorIconProps } from "phosphor-react-native";
import React from "react";
import { useUnistyles } from "react-native-unistyles";

/**
 * Predefined icon sizes in pixels.
 * Use these keys to set standard icon dimensions.
 */
export const iconSize = {
  /** Extra small: 25px */
  sm: 25,
  /** Medium: 30px */
  md: 30,
  /** Large: 35px */
  lg: 35,
  /** Extra large: 40px */
  xl: 40,
} as const;

export type IconSizeKey = keyof typeof iconSize;

export type ThemedIconProps = PhosphorIconProps & {
  icon: React.ComponentType<PhosphorIconProps>;
  colorKey?: ColorsKey;
  size?: IconSizeKey | number;
  weight?: PhosphorIconProps["weight"];
};

/**
 * ThemedIcon renders a phosphor icon using theme colors and predefined sizes.
 *
 * @param icon The Phosphor icon component to render.
 * @param colorKey Theme color key for icon color.
 * @param size Predefined size key or numeric pixel value.
 *  sm: 25px, md: 30px, lg: 35px,  lg: 40px,
 * @param weight Icon weight style.
 */
export function ThemedIcon({
  icon: IconComponent,
  colorKey = "primaryForeground",
  size = "sm",
  weight = "regular",
}: ThemedIconProps) {
  const { theme } = useUnistyles();
  const color = theme.colors[colorKey];

  const resolvedSize = typeof size === "number" ? size : iconSize[size];

  return <IconComponent size={resolvedSize} weight={weight} color={color} />;
}
