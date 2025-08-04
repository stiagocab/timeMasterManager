import React from "react";

import { SafeAreaView, ScrollView } from "react-native";

import { useRouter } from "expo-router";
import { IntersectThreeIcon } from "phosphor-react-native";

import { IconButton, ScreenView } from "@/components/atoms";
import { TimerTile } from "@/components/elements";
import { StackHeader } from "@/components/ui";
import { pomodoro, runningCycle, testCycle } from "@/mocks";

export default function MainScreen() {
  const router = useRouter();

  return (
    <ScreenView style={{ paddingHorizontal: 0 }}>
      <>
        <StackHeader
          headerTransparent
          headerShown
          title="Productivity boost"
          headerRight={
            <IconButton
              icon={IntersectThreeIcon}
              color="backgroundForeground"
              onPress={() => router.push("/design-system")}
              variant="transparent"
            />
          }
        />
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>
            <ScreenView>
              <TimerTile cycle={pomodoro} />
              <TimerTile cycle={testCycle} />
              <TimerTile cycle={runningCycle} />
              {/* <TimerTile />
            <TimerTile /> */}
            </ScreenView>
          </ScrollView>
        </SafeAreaView>
      </>
    </ScreenView>
  );
}
