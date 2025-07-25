// Divider.tsx
import { ColorsKey } from "@/styles/colors.keys";
import React from "react";
import { View } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";

const styles = StyleSheet.create((theme) => ({
  base: {
    opacity: 0.5,
    marginTop: 5,
    variants: {
      orientation: {
        horizontal: {
          width: "100%",
          borderBottomWidth: 1,
          borderColor: theme.colors.border,
        },
        vertical: {
          height: "100%",
          borderLeftWidth: 1,
          borderColor: theme.colors.border,
        },
      },
      thickness: {
        thin: {
          borderWidth: 1,
        },
        medium: {
          borderWidth: 2,
        },
        thick: {
          borderWidth: 4,
        },
      },
    },
  },
  color: (color: ColorsKey) => {
    return { borderColor: theme.colors[color] };
  },
}));

export type DividerProps = React.ComponentProps<typeof View> & {
  /** Horizontal or vertical line */
  orientation?: "horizontal" | "vertical";
  /** Thin, medium or thick */
  thickness?: "thin" | "medium" | "thick";
  /** A color key from your theme (or use default) */
  color?: ColorsKey;
};

function DividerImpl({
  orientation = "horizontal",
  thickness = "thin",
  color = "text",
  style,
  ...rest
}: DividerProps) {
  // Apply variants: orientation, thickness, color
  styles.useVariants({ orientation, thickness });

  return <View style={[styles.base, styles.color(color), style]} {...rest} />;
}

export const Divider = withUnistyles(DividerImpl);
