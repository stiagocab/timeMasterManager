import React from "react";

import { ColorsKey, Palette } from "@/styles/colors.keys";
import { PressableProps, StyleProp, ViewStyle } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";
import { PressableScale } from "../animations/PressableScale";

import { CircularProgress } from "./CircularProgress";
import { Typography } from "./Typography";

const styles = StyleSheet.create((theme) => ({
  root: {
    borderRadius: theme.borderRadius.md - 4,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    variants: {
      /* disabled  boolean variant */
      disabled: {
        true: {
          opacity: 0.6,
        },
      },
      /* fullWidth  boolean variant */
      fullWidth: {
        true: {
          alignSelf: "stretch",
        },
      },
      /* ===== size variant ==== */
      size: {
        sm: {
          fontSize: theme.typography.fontSize.sm,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
        },
        md: {
          fontSize: theme.typography.fontSize.base,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
        },
        lg: {
          fontSize: theme.typography.fontSize.lg,
          paddingHorizontal: theme.spacing.md + 2,
          paddingVertical: theme.spacing.md - 4,
        },
      } /* ===== size variant  END ==== */,
    },
  },
  /* ===== BUTTON Dynamic Function ==== */
  button: (color: ColorsKey = "primary", variant: Variant) => {
    if (variant === "filled") {
      return {
        backgroundColor: theme.colors[color],
      };
    }

    if (variant === "outlined") {
      return {
        backgroundColor: "transparent",
        borderColor: theme.colors[color],
        borderWidth: 2,
      };
    }

    return {
      backgroundColor: "transparent",
    };
  } /* ===== BUTTON Dynamic Function   END ==== */,
  /* ===== LABEL Dynamic Function  ==== */
  label: (color: ColorsKey, variant: Variant = "filled") => {
    if (variant === "filled") {
      return {
        color: color.includes("Foreground")
          ? theme.colors[color.replace("Foreground", "") as keyof Palette]
          : theme.colors[`${color}Foreground` as keyof Palette],
      };
    }

    if (variant === "outlined") {
      return {
        color: theme.colors[color],
      };
    }

    if (variant === "link") {
      return {
        color: theme.colors[color],
        textDecorationLine: "underline",
      };
    }

    return {
      color: theme.colors[color],
    };
  } /* ===== LABEL Dynamic Function  ==== */,
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const variants = ["filled", "outlined", "text", "link"] as const;
type Variant = (typeof variants)[number];

type ButtonProps = Omit<PressableProps, "style"> &
  UnistylesVariants<typeof styles> & {
    style?: StyleProp<ViewStyle>;
    title: string;
    variant?: Variant;
    color?: ColorsKey;
    isLoading?: boolean;
  };

export function Button({
  style,
  fullWidth = true,
  size = "md",
  title,
  variant = "filled",
  color = "secondary",
  disabled = false,
  isLoading,
  ...rest
}: ButtonProps) {
  styles.useVariants({
    size,
    fullWidth,
    disabled,
  });

  return (
    <PressableScale
      {...rest}
      disabled={disabled || isLoading}
      style={[styles.root, styles.button(color, variant), style]}
    >
      {isLoading && (
        <CircularProgress
          size={24}
          strokeWidth={3}
          barColor="#fff"
          trackColor="rgba(255,255,255,.15)"
          duration={750}
        />
      )}
      {!isLoading && (
        <Typography variant="body" style={styles.label(color, variant)}>
          {title}
        </Typography>
      )}
    </PressableScale>
  );
}
