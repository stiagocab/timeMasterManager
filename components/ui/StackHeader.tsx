import React, { useCallback } from "react";

import { Stack, useNavigation } from "expo-router";

import { CaretLeftIcon } from "phosphor-react-native";
import { useUnistyles } from "react-native-unistyles";

import { PressableScale } from "../animations/PressableScale";
import { Typography } from "../atoms";

import { ColorsKey } from "@/styles/colors.keys";

export type StackHeaderProps = {
  title?: string;
  headerShown?: boolean;
  headerTransparent?: boolean;
  color?: ColorsKey;
  headerRight?: React.ReactNode;
};

export function StackHeader({
  title,
  headerRight,
  headerShown,
  headerTransparent = false,
  color = "primaryForeground",
}: StackHeaderProps) {
  const theme = useUnistyles();
  const navigation = useNavigation();

  const headerRightFn = useCallback(() => {
    if (!headerRight) return undefined;

    return <>{headerRight}</>;
  }, [headerRight]);

  return (
    <Stack.Screen
      options={{
        headerShown,
        headerTransparent,
        headerStyle: { backgroundColor: "transparent" },
        headerRight: headerRightFn,
        headerLeft: (props) => {
          if (!props.canGoBack) return;
          return (
            <PressableScale onPress={navigation.goBack} targetScale={0.7}>
              <CaretLeftIcon
                size={25}
                weight="bold"
                color={theme.theme.colors[color]}
              />
            </PressableScale>
          );
        },
        ...(title
          ? {
              title: title,
              headerTitle: () => (
                <Typography variant="title" color="primaryForeground">
                  {title}
                </Typography>
              ),
            }
          : {}),
      }}
    />
  );
}
