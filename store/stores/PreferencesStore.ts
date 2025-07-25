import { MMKVStrategy } from "@/lib";
import { UnistylesThemes } from "react-native-unistyles";
import { persist } from "valtio-persist";

interface PreferencesStore {
  theme: keyof UnistylesThemes;
}

export const preferencesStorePromise = persist<PreferencesStore>(
  { theme: "light" },
  "preferences",
  { storageStrategy: MMKVStrategy }
);

export const preferencesStore = (await preferencesStorePromise).store;
