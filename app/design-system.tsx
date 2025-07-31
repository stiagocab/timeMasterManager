import React, { useCallback, useEffect, useRef } from "react";

import { SafeAreaView, ScrollView, View } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native-unistyles";

import { ScreenView, Typography } from "@/components/atoms";
import { StackHeader } from "@/components/ui";
import ButtonsPreview from "@/components/views/designSystem/Buttons";
import Colors from "@/components/views/designSystem/Colors";
import { ThemePickerModal } from "@/components/views/designSystem/ThemePickerModal";
import TypographyPreview from "@/components/views/designSystem/Typography";
import { usePreferencesStore } from "@/store";

export default function DesignSystemScreen() {
  const preferences = usePreferencesStore((p) => p);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    bottomSheetRef.current?.close();
  }, [bottomSheetRef.current?.close]);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <>
      <ScreenView bgColor="background">
        <SafeAreaView style={{ flex: 1 }}>
          <StackHeader
            headerTransparent={true}
            title="Design system"
            headerRight={<ThemePickerModal onSelectTopic={console.log} />}
            // headerRight={
            //   <PressableScale>
            //     <ThemedIcon icon={DotsThreeIcon} color="text" />
            //   </PressableScale>
            // }
          />

          <ScrollView style={{ flex: 1 }}>
            {/* Typography */}

            <Typography>Current theme {preferences.theme}</Typography>

            <View style={{ gap: 20, marginTop: 20 }}>
              <TypographyPreview />

              {/* BUTTONS */}

              <ButtonsPreview />

              {/* COLORS */}

              <Colors />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ScreenView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    backgroundColor: "navy",
    alignItems: "center",
  },
});
