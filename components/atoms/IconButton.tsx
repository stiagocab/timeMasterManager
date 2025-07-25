// src/components/IconButton.tsx

import { ColorsKey, Palette } from "@/styles/colors.keys";
import { BorderRadiusKey } from "@/styles/unistyles";
import type { IconProps as PhosphorIconProps } from "phosphor-react-native";
import React from "react";
import { PressableProps, StyleProp, ViewStyle } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";
import { PressableScale } from "../animations/PressableScale";
import { ThemedIcon } from "../icons";

const styles = StyleSheet.create((theme) => ({
  root: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: theme.borderRadius.full,
    variants: {
      disabled: {
        true: { opacity: 0.6 },
      },
      size: {
        sm: { width: 42, height: 42 },
        md: { width: 48, height: 48 },
        lg: { width: 55, height: 55 },
        xl: { width: 60, height: 60 },
      },
    },
  },
  button: (color: ColorsKey, variant: Variant) => {
    return variant === "filled"
      ? { backgroundColor: theme.colors[color] }
      : { backgroundColor: "transparent" };
  },
  icon: (color: ColorsKey, variant: Variant) => {
    const key: keyof Palette =
      variant === "filled"
        ? (`${color}Foreground` as keyof Palette)
        : (color as keyof Palette);
    return { color: theme.colors[key] };
  },
}));

type Variant = "filled" | "transparent";

export interface IconButtonProps extends UnistylesVariants<typeof styles> {
  icon: React.ComponentType<PhosphorIconProps>;
  color?: ColorsKey;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
  borderRadius?: BorderRadiusKey;
  onPress?: PressableProps["onPress"];
  onLongPress?: PressableProps["onLongPress"];
  onPressIn?: PressableProps["onPressIn"];
  onPressOut?: PressableProps["onPressOut"];
}

export function IconButton({
  icon,
  color = "primary",
  variant = "filled",
  size = "sm",
  disabled = false,
  style,
  borderRadius = "sm",
  ...rest
}: IconButtonProps) {
  styles.useVariants({ size, disabled });

  return (
    <PressableScale
      {...rest}
      disabled={disabled !== false}
      style={[styles.root, styles.button(color, variant), style]}
    >
      <ThemedIcon
        icon={icon}
        size={size}
        colorKey={
          variant === "filled"
            ? (`${color}Foreground` as keyof Palette)
            : (color as keyof Palette)
        }
      />
    </PressableScale>
  );
}
