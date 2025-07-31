import { PreferencesSlice } from "./preferences";
import { useStore } from "./RooStore";

export function usePreferencesStore<T = PreferencesSlice["preferences"]>(
  selector: (state: PreferencesSlice["preferences"]) => T = (s) =>
    s as unknown as T,
  equalityFn?: (a: T, b: T) => boolean
): T {
  return useStore((s) => selector(s.preferences));
}

// ----- Hook de acciones -----
export function usePreferencesActions() {
  // referencia estable → no re‑render
  const setTheme = useStore((s) => s.setTheme);
  return { setTheme };
}
