import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createPreferencesSlice } from "./preferences";

type ExtractState<F> = F extends StateCreator<infer S, any, any, any>
  ? S
  : never;
type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

const factories = [createPreferencesSlice] as const;

export type RootState = UnionToIntersection<
  ExtractState<(typeof factories)[number]>
>;

// ---------------- composición --------------------------
export const useStore = create<RootState>()(
  devtools(
    immer((set, get, api) =>
      factories.reduce<RootState>(
        (acc, fn) => Object.assign(acc, fn(set, get, api)),
        {} as RootState
      )
    )
  )
);
