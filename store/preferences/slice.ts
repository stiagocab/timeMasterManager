import { MMKV } from "react-native-mmkv";
import { createJSONStorage, persist } from "zustand/middleware";

import type { PreferencesSlice } from "./types";

const mmkv = new MMKV();

// SIN anotar los genéricos: TypeScript deduce el mutator correcto
export const createPreferencesSlice = persist<PreferencesSlice>(
  (set) => ({
    preferences: { theme: "light" },
    setTheme: (theme) =>
      set((s) => ({ preferences: { ...s.preferences, theme } })),
  }),
  {
    name: "prefs",
    storage: createJSONStorage(() => ({
      getItem: (k) => mmkv.getString(k) ?? null,
      setItem: (k, v) => mmkv.set(k, v),
      removeItem: (k) => mmkv.delete(k),
    })),
  }
);
