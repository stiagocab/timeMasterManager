// Typography.tsx
import { ColorsKey } from "@/styles/colors.keys";
import { Text, TextProps } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

export type TypographyProps = TextProps &
  UnistylesVariants<typeof styles> & {
    color?: ColorsKey;
  };

const styles = StyleSheet.create((theme) => ({
  typography: {
    fontFamily: theme.typography.fonts.regular,
    // VARIANTS
    variants: {
      variant: {
        default: {
          fontSize: theme.typography.fontSize.base,
          lineHeight: theme.typography.fontSize.base * 1.3,
        },
        body: {
          fontSize: theme.typography.fontSize.base,
          lineHeight: theme.typography.fontSize.base * 1.3,
        },
        title: {
          fontSize: theme.typography.fontSize.lg,
          lineHeight: theme.typography.fontSize.lg * 1.3,
          fontFamily: theme.typography.fonts.bold,
        },
        subtitle: {
          fontSize: theme.typography.fontSize.lg,
          lineHeight: theme.typography.fontSize.lg * 1.3,
          fontFamily: theme.typography.fonts.semiBold,
        },
        defaultSemiBold: {
          fontFamily: theme.typography.fonts.semiBold,
          fontSize: theme.typography.fontSize.base,
          lineHeight: theme.typography.fontSize.base * 1.3,
          fontWeight: "600",
        },
        caption: {
          fontSize: theme.typography.fontSize.sm,
          lineHeight: theme.typography.fontSize.sm * 1.3,
          fontFamily: theme.typography.fonts.light,
        },
        link: {
          fontFamily: theme.typography.fonts.light,
          fontSize: theme.typography.fontSize.base,
          lineHeight: theme.typography.fontSize.base * 1.3,
        },
      }, // VARIANTS END
    },
  },
  color: (color: ColorsKey) => {
    return { color };
  },
}));

function Typography({
  style,
  color = "text",
  variant,
  ...rest
}: TypographyProps) {
  styles.useVariants({
    variant,
  });

  return (
    <Text style={[styles.typography, styles.color(color), style]} {...rest} />
  );
}

export { Typography };
