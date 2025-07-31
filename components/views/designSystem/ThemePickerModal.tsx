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

interface TopicPickerModalProps {
  onSelectTopic: (topicId: string) => void;
}

export function ThemePickerModal({ onSelectTopic }: TopicPickerModalProps) {
  const modalizeRef = useRef<Modalize>(null);
  const theme = usePreferencesStore((p) => p.theme);
  const { setTheme } = usePreferencesActions();

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleSelect = (id: keyof UnistylesThemes) => {
    onSelectTopic(id);

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
          {/* <Typography style={styles.sheetTitle}>
            {JSON.stringify(store)}„
          </Typography> */}

          {Object.keys(appThemes).map((item) => (
            <PressableScale
              key={item}
              onPress={() => handleSelect(item as keyof UnistylesThemes)}
              style={styles.item}
            >
              <Typography style={styles.label}>{item}</Typography>
            </PressableScale>
          ))}
        </ScreenView>
      </Modalize>
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    width: "100%",
  },
  overlay: {
    width: "100%",
  },
  trigger: {
    alignSelf: "center",
    padding: 12,
    borderRadius: 8,
    margin: 16,
    backgroundColor: "blue",
  },
  triggerText: {
    color: "white",
    fontSize: 16,
  },
  modal: {
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
  },
  sheetContent: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  item: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 16,
  },
  handle: {
    backgroundColor: theme.colors.text,
  },
}));
