import { MMKV } from "react-native-mmkv";
import { useSnapshot } from "valtio";
import { preferencesStore } from "./PreferencesStore";

export const storage = new MMKV();

const rootStore = { preferences: preferencesStore };

export const usePreferencesStore = () => useSnapshot(rootStore.preferences);
