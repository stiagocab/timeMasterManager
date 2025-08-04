import React, { useRef } from "react";

import { DotsThreeIcon } from "phosphor-react-native";
import { Modalize } from "react-native-modalize";
import {
  StyleSheet,
  UnistylesRuntime,
  UnistylesThemes,
} from "react-native-unistyles";

import { PressableScale } from "@/components/animations/PressableScale";
import { IconButton, ScreenView, Typography } from "@/components/atoms";
import { usePreferencesActions, usePreferencesStore } from "@/store";
import { appThemes } from "@/styles/unistyles";

export function ThemePickerModal() {
  const modalizeRef = useRef<Modalize>(null);
  const themeName = usePreferencesStore((p) => p.theme);
  const { setTheme } = usePreferencesActions();

  const onOpen = () => modalizeRef.current?.open();

  const handleSelect = (id: keyof UnistylesThemes) => {
    const selected = appThemes[id];

    if (!selected) return console.warn(`Tema ${id} no está registrado`);

    if (!selected.spacing || selected.spacing.sm === undefined)
      return console.warn(`Tema ${id} carece de spacing.sm`);

    setTheme(id);

    UnistylesRuntime.setTheme(id);

    modalizeRef.current?.close();
  };

  return (
    <>
      <IconButton
        icon={DotsThreeIcon}
        onPress={onOpen}
        variant="transparent"
        color="backgroundForeground"
      />

      <Modalize
        withReactModal
        ref={modalizeRef}
        adjustToContentHeight
        modalStyle={styles.modal}
        withOverlay
        withHandle
        handleStyle={styles.handle}
        rootStyle={styles.root}
        overlayStyle={styles.overlay}
      >
        <ScreenView style={styles.sheetContent}>
          <Typography style={styles.sheetTitle}>Choose a topic</Typography>

          {Object.keys(appThemes).map((key) => {
            const id = key as keyof UnistylesThemes;
            const isSelected = (themeName as string) === key;
            return (
              <ThemeRow
                key={key}
                label={key}
                isSelected={isSelected}
                onPress={() => handleSelect(id)}
              />
            );
          })}
        </ScreenView>
      </Modalize>
    </>
  );
}

function ThemeRow({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <PressableScale
      onPress={onPress}
      style={[styles.item, styles.activeTile(isSelected)]}
    >
      <Typography
        style={[styles.label]}
        color={isSelected ? "secondaryForeground" : "text"}
      >
        {label}
      </Typography>
    </PressableScale>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: { width: "100%" },
  overlay: { width: "100%" },
  modal: {
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
  },
  sheetContent: { padding: 20 },
  sheetTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border, // 👈 usa color del tema
    borderRadius: 8,
  },
  label: { fontSize: 16 },
  handle: { backgroundColor: theme.colors.text },
  activeTile: (isSelected: boolean) => ({
    backgroundColor: isSelected ? theme.colors.secondary : "transparent",
  }),
}));
