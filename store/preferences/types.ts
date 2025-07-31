import { UnistylesThemes } from "react-native-unistyles";

type PreferencesState = {
  preferences: {
    theme: keyof UnistylesThemes;
  };
};

type PreferencesActions = {
  setTheme: (theme: keyof UnistylesThemes) => void;
};

export interface PreferencesSlice
  extends PreferencesState,
    PreferencesActions {}
