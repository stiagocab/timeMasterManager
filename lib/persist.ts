// lib/MMKVStrategy.ts
import { MMKV } from "react-native-mmkv";
import type { StorageStrategy } from "valtio-persist"; // interface is exported
const mmkv = new MMKV();

export class MMKVStrategy implements StorageStrategy<false> {
  // <false> → synchronous
  readonly isAsync = false;

  has = (key: string) => mmkv.contains(key);
  get = (key: string) => mmkv.getString(key) ?? null;
  set = (key: string, value: string) => mmkv.set(key, value);
  remove = (key: string) => mmkv.delete(key);
}
