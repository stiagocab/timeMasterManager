import { UnistylesThemes } from "react-native-unistyles";
import { preferencesStore } from "../stores/PreferencesStore";

export const usePreferences = () => {
  const changeTheme = (theme: keyof UnistylesThemes) => {
    preferencesStore.theme = theme;
  };

  return { changeTheme };
};
