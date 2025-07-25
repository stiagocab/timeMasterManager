import React from "react";

import { useRouter } from "expo-router";
import { SafeAreaView, View } from "react-native";

import { IconButton, ScreenView } from "@/components/atoms";
import { TimerTile } from "@/components/elements";
import { StackHeader } from "@/components/ui";
import { IntersectThreeIcon } from "phosphor-react-native";

export default function MainScreen() {
  const router = useRouter();

  return (
    <ScreenView>
      <>
        <StackHeader
          headerTransparent
          headerShown
          title="Productivity boost"
          headerRight={
            <IconButton
              icon={IntersectThreeIcon}
              color="text"
              onPress={() => router.push("/design-system")}
              variant="transparent"
            />
          }
        />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <TimerTile />
            <TimerTile />
            <TimerTile />
          </View>
        </SafeAreaView>
      </>
    </ScreenView>
  );
}
