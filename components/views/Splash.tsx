import { SplashScreen } from "expo-router";

export function SplashScreenController({ isReady }: { isReady: boolean }) {
  if (!isReady) {
    SplashScreen.hideAsync();
  }

  return null;
}
