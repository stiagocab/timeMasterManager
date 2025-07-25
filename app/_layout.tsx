import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_600SemiBold,
  Nunito_900Black,
  useFonts,
} from "@expo-google-fonts/nunito";
import { Stack } from "expo-router";

import { SplashScreenController } from "@/components/views";

import "react-native-reanimated";

export default function Root() {
  const [fontsLoaded] = useFonts({
    "Nunito-Light": Nunito_300Light,
    "Nunito-Light-Italic": Nunito_300Light_Italic,
    "Nunito-Regular": Nunito_400Regular,
    "Nunito-Regular-Italic": Nunito_400Regular_Italic,
    "Nunito-SemiBold": Nunito_600SemiBold,
    "Nunito-Bold": Nunito_900Black,
  });

  const isReady = fontsLoaded;

  return (
    <GestureHandlerRootView>
      <SplashScreenController isReady={isReady} />
      <RootLayout />
    </GestureHandlerRootView>
  );
}

const RootLayout = () => {
  return (
    <Stack
      initialRouteName="design-system"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="design-system" />
    </Stack>
  );
};
