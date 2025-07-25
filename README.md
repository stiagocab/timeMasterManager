# React Native Base Project

A starter guide for a React Native mobile application using Expo Dev Client, Phosphor icons, and Valtio state management with persistence.

---

## 🎯 Overview

This project is configured for **mobile** only (iOS & Android). Web support has not been tested.

Key dependencies:

- **expo** `~53.0.17` (with Dev Client)
- **phosphor-react-native** `^3.0.0` (icon library)
- **valtio** `^2.1.5` (state management)
- **valtio-persist** `^2.2.4` (state persistence)
- **react-native-mmkv** `^3.3.0` (state persistence)

## 🚀 Requirements

- **Node.js** v20.19.3 (recommended)
- **Bun** (for package management and scripts)
- Xcode (macOS) or Android Studio (Windows/macOS) for simulators

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   bun clone <repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Run the Expo Dev Client**

   ```bash
   bun start
   ```

   - Then follow the CLI instructions to open on iOS or Android.

## 📋 Scripts

All scripts use **Bun**:

| Script    | Command       | Description                            |
| --------- | ------------- | -------------------------------------- |
| `start`   | `bun start`   | Launch Expo Dev Client (metro)         |
| `android` | `bun android` | Build & run on Android emulator/device |
| `ios`     | `bun ios`     | Build & run on iOS simulator/device    |
| `lint`    | `bun lint`    | Run Expo lint                          |

## 🔧 Configuration

- **Environment variables**: No `.env` setup yet. You can create a `.env` file at project root and integrate with your preferred solution (e.g. `react-native-dotenv`).

## 🗂️ State Management (Valtio + Persist)

1. **Valtio Store**: Create your state objects using `valtio`:

   ```ts
   import { proxy } from "valtio";

   export const appState = proxy({
     user: null,
     settings: {},
   });
   ```

2. **Persistence Strategy**: We use a custom `MMKVStrategy` with `valtio-persist`:

   ```ts
   export class MMKVStrategy implements StorageStrategy<false> {
      // <false> → synchronous
      readonly isAsync = false;

      has = (key: string) => mmkv.contains(key);
      get = (key: string) => mmkv.getString(key) ?? null;
      set = (key: string, value: string) => mmkv.set(key, value);
      remove = (key: string) => mmkv.delete(key);
   }

   ....

   export const preferencesStorePromise = persist<PreferencesStore>(
      { theme: "light" },
      "preferences",
      { storageStrategy: MMKVStrategy }
   );
   ```

3. **Usage**: Import `appState` in components and read/write directly:

   ```tsx
    const { changeTheme } = usePreferences()
    const { theme } = usePreferencesStore()
   ```

## 🎨 Icon Wrapper Component

We provide a `ThemedIcon` component as a wrapper around Phosphor icons:

```tsx
import { ThemedIcon } from "@/components/ThemedIcon";
import { CaretRight } from "phosphor-react-native";

// usage:
<ThemedIcon icon={CaretRight} size="md" colorKey="primaryForeground" />;
```

## 📦 Project Files

- `/src/components` — Reusable UI components (e.g. `ThemedIcon`, `Collapsible`).
- `/src/animations` — Animation helpers (e.g. `PressableScale`, `DoublePressScale`).
- `/App.tsx` — Entry point.

_(Note: No enforced folder structure—adjust as needed.)_

## 🤝 Contributing

1. Create a branch: `git checkout -b feature/YourFeature`
2. Commit changes: `git commit -m "feat: Add new component"`
3. Push branch and open a PR.

---

© 2025 Your Company or Name. All rights reserved.
