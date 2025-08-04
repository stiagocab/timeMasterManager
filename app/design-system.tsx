import React, { useEffect, useRef } from "react";

import { SafeAreaView, ScrollView, View } from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";

import { ScreenView } from "@/components/atoms";
import { StackHeader } from "@/components/ui";
import ButtonsPreview from "@/components/views/designSystem/Buttons";
import Colors from "@/components/views/designSystem/Colors";
import { ThemePickerModal } from "@/components/views/designSystem/ThemePickerModal";
import TypographyPreview from "@/components/views/designSystem/Typography";

export default function DesignSystemScreen() {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    bottomSheetRef.current?.close();
  }, [bottomSheetRef.current?.close]);

  return (
    <>
      <ScreenView bgColor="background">
        <SafeAreaView style={{ flex: 1 }}>
          <StackHeader
            headerTransparent={true}
            title="Design system"
            headerRight={<ThemePickerModal />}
          />

          <ScrollView style={{ flex: 1 }}>
            {/* Typography */}

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
