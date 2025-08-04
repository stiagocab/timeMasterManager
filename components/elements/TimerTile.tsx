import {
  CheckCircleIcon,
  CircleDashedIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  SkipBackIcon,
  SkipForwardIcon,
  StopIcon,
  TimerIcon,
} from "phosphor-react-native";
import React from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { IconButton, Typography } from "../atoms";
import { ThemedIcon } from "../icons";
import { Collapsible } from "./Collapsible";

import { useCycleRunner } from "@/hooks";
import { formatMs } from "@/utils/time";
import { CycleDefinition } from "../../types/Timer";
import { DoublePressScale } from "../animations/DoublePressScale";

export function TimerTile({ cycle }: { cycle: CycleDefinition }) {
  const {
    formatted,
    currentIndex,
    timeline,
    isRunning,
    start,
    pause,
    reset,
    jumpTo,
    next,
    prev,
  } = useCycleRunner(cycle, {
    autostart: false,
  });

  return (
    <View>
      <Collapsible
        header={
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.iconContainer}>
                <ThemedIcon
                  icon={TimerIcon}
                  color="accentForeground"
                  size="lg"
                />
              </View>

              <Typography
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.titleText}
              >
                {cycle.label} {cycle.label}
              </Typography>
            </View>

            <View style={styles.timeContainer}>
              <Typography>{formatted.totalDuration}</Typography>
            </View>
          </View>
        }
      >
        <View style={styles.stepsContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 20,
            }}
          >
            <IconButton icon={SkipBackIcon} size="lg" onPress={prev} />

            <IconButton icon={RewindIcon} size="lg" />
            {isRunning && (
              <IconButton icon={PauseIcon} size="lg" onPress={pause} />
            )}

            {!isRunning && (
              <IconButton icon={PlayIcon} size="lg" onPress={start} />
            )}
            <IconButton icon={StopIcon} size="lg" onPress={reset} />
            <IconButton icon={SkipForwardIcon} size="lg" onPress={next} />
          </View>

          {timeline.map((step, idx) => {
            const state =
              idx < currentIndex
                ? "done"
                : idx === currentIndex
                ? "current"
                : "pending";
            const opacity = state === "pending" ? 0.45 : 1;

            const rightTime =
              state === "current"
                ? formatted.stepRemaining
                : formatMs(step.durationMs);

            return (
              <View
                key={step.id + String(idx)}
                style={[styles.stepRow, { opacity }]}
              >
                <>
                  <DoublePressScale
                    onDoublePress={() => jumpTo(idx)}
                    style={styles.stepLeft}
                  >
                    {state === "done" ? (
                      <ThemedIcon
                        icon={CheckCircleIcon}
                        color="backgroundForeground"
                      />
                    ) : state === "current" ? (
                      <ThemedIcon
                        icon={TimerIcon}
                        color="backgroundForeground"
                      />
                    ) : (
                      <ThemedIcon
                        icon={CircleDashedIcon}
                        color="backgroundForeground"
                      />
                    )}

                    <Typography
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.stepLabel}
                      variant={state === "current" ? "subtitle" : "body"}
                    >
                      {step.label ? `${step.label} ${step.label}` : rightTime}
                    </Typography>
                  </DoublePressScale>
                </>

                {step.label ? (
                  <Typography
                    variant={state === "current" ? "subtitle" : "body"}
                    style={styles.stepTime}
                  >
                    {rightTime}
                  </Typography>
                ) : null}
              </View>
            );
          })}
        </View>
      </Collapsible>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  header: {
    flexDirection: "row",
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  iconContainer: {
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.accent,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  titleText: {
    flexShrink: 1,
  },
  timeContainer: {
    flexShrink: 0,
    marginLeft: theme.spacing.sm,
  },
  stepsContainer: {
    gap: theme.spacing.xs,
    paddingTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 28,
  },
  stepLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minWidth: 0,
  },
  stepLabel: {
    flexShrink: 1,
    minWidth: 0,
    lineHeight: theme.typography.fontSize.lg + 5,
  },
  stepTime: {
    flexShrink: 0,
    textAlign: "right",
    minWidth: 44,
  },
}));
