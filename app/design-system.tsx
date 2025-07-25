import React from "react";

import { SafeAreaView, ScrollView, View } from "react-native";

import { DotsThreeIcon, PaletteIcon } from "phosphor-react-native";
import { useUnistyles } from "react-native-unistyles";

import { PressableScale } from "@/components/animations/PressableScale";
import {
  ScreenView,
  ScreenViewProps,
  Typography,
  TypographyProps,
} from "@/components/atoms";
import { Collapsible } from "@/components/elements/Collapsible";
import { ThemedIcon } from "@/components/icons";
import { StackHeader } from "@/components/ui";
import ButtonsPreview from "@/components/views/designSystem/Buttons";
import TypographyPreview from "@/components/views/designSystem/Typography";
import { lightTheme } from "@/styles/unistyles";

export default function DesignSystemScreen() {
  const theme = useUnistyles();

  return (
    <ScreenView bgColor="background">
      <SafeAreaView style={{ flex: 1 }}>
        <StackHeader
          headerTransparent={true}
          title="Design system"
          headerRight={
            <PressableScale>
              <DotsThreeIcon
                color={theme.theme.colors.text}
                size={25}
                weight="bold"
              />
            </PressableScale>
          }
        />

        <ScrollView style={{ flex: 1 }}>
          {/* Typography */}

          <View style={{ gap: 20, marginTop: 20 }}>
            <TypographyPreview />

            {/* BUTTONS */}

            <ButtonsPreview />

            {/* COLORS */}

            <Collapsible
              title="Colors"
              rightIcon={<ThemedIcon icon={PaletteIcon} />}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {Object.keys(lightTheme.colors)
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
                        color={
                          `${variant}Foreground` as TypographyProps["color"]
                        }
                      >
                        {variant}
                      </Typography>
                    </ScreenView>
                  ))}
              </View>
            </Collapsible>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenView>
  );
}
