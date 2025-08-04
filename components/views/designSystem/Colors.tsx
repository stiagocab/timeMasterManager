import React from "react";

import { PaletteIcon } from "phosphor-react-native";
import { View } from "react-native";

import {
  ScreenView,
  ScreenViewProps,
  Typography,
  TypographyProps,
} from "@/components/atoms";
import { Collapsible } from "@/components/elements";
import { ThemedIcon } from "@/components/icons";
import { lightThemeColors } from "@/styles/colors/colors";

export default function Colors() {
  return (
    <Collapsible
      title="Colors"
      rightIcon={<ThemedIcon icon={PaletteIcon} color="backgroundForeground" />}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(lightThemeColors)
          .filter((item) => !item.includes("Fore"))
          .map((variant, index) => (
            <ScreenView
              key={index}
              bgColor={variant as ScreenViewProps["bgColor"]}
              style={{
                flex: undefined,
                width: "50%",
                height: 100,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body"
                color={`${variant}Foreground` as TypographyProps["color"]}
              >
                {variant}
              </Typography>
            </ScreenView>
          ))}
      </View>
    </Collapsible>
  );
}
