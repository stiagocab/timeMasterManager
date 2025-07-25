// Typography.tsx
import { Text, TextProps } from "react-native";
import { StyleSheet, UnistylesVariants } from "react-native-unistyles";

export type TypographyProps = TextProps & UnistylesVariants<typeof styles> & {};

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
      color: {
        default: { color: theme.colors.text },

        primary: { color: theme.colors.primary },
        primaryForeground: { color: theme.colors.primaryForeground },

        secondary: { color: theme.colors.secondary },
        secondaryForeground: { color: theme.colors.secondaryForeground },

        accent: { color: theme.colors.accent },
        accentForeground: { color: theme.colors.accentForeground },

        background: { color: theme.colors.background },
        backgroundForeground: { color: theme.colors.backgroundForeground },

        surface: { color: theme.colors.surface },
        surfaceForeground: { color: theme.colors.surfaceForeground },

        text: { color: theme.colors.text },

        border: { color: theme.colors.border },
        borderForeground: { color: theme.colors.borderForeground },

        highlight: { color: theme.colors.highlight },
        highlightForeground: { color: theme.colors.highlightForeground },

        info: { color: theme.colors.info },
        infoForeground: { color: theme.colors.infoForeground },

        success: { color: theme.colors.success },
        successForeground: { color: theme.colors.successForeground },

        warning: { color: theme.colors.warning },
        warningForeground: { color: theme.colors.warningForeground },

        error: { color: theme.colors.error },
        errorForeground: { color: theme.colors.errorForeground },
      },
    }, // COLORS END
  },
}));

function Typography({ style, color, variant, ...rest }: TypographyProps) {
  styles.useVariants({
    variant,
    color,
  });

  return <Text style={[styles.typography, style]} {...rest} />;
}

export { Typography };
