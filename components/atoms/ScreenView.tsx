// src/components/ScreenView.tsx

import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

import type { ColorsKey } from "@/styles/colors.keys";

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    paddingHorizontal: theme.spacing.horizontal,
  },
}));

export type ScreenViewOwnProps = ViewProps & {
  keepSafe?: boolean;
  bgColor?: ColorsKey | "transparent";
};

export type ScreenViewProps = PropsWithChildren<ScreenViewOwnProps>;

export function ScreenView({
  children,
  style,
  bgColor = "background",
  keepSafe = false,
  ...rest
}: ScreenViewProps) {
  const { theme } = useUnistyles();

  const backgroundStyle = {
    backgroundColor:
      bgColor === "transparent" ? "transparent" : theme.colors[bgColor],
  };

  return (
    <View {...rest} style={[styles.root, backgroundStyle, style]}>
      {children}
    </View>
  );
}
