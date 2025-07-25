// CircularProgress.tsx  — React Native + Unistyles 3
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { StyleSheet } from "react-native-unistyles";

/* ───────────── 1.  Animated SVG helper ───────────── */
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/* ───────────── 2.  Props ───────────── */
export interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  barColor?: string;
  trackColor?: string;
  duration?: number;
}

/* ───────────── 3.  Component ───────────── */
export const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 32,
  strokeWidth = 3,
  barColor = "red",
  trackColor = "blue",
  duration = 1500,
}) => {
  /* Geometry */
  const radius = size / 2;
  const normalisedRadius = radius - strokeWidth;
  const circumference = useMemo(
    () => normalisedRadius * 2 * Math.PI,
    [normalisedRadius]
  );

  /* Dash sequences for the “indeterminate” effect */
  const baseSegment = Math.max(5, circumference / 10);
  const dashSequences = useMemo(
    () => [
      `${baseSegment} ${circumference - baseSegment}`,
      `${baseSegment * 2} ${circumference - baseSegment * 2}`,
      `${baseSegment * 3} ${circumference - baseSegment * 3}`,
      `${baseSegment * 2} ${circumference - baseSegment * 2}`,
      `${baseSegment} ${circumference - baseSegment}`,
    ],
    [baseSegment, circumference]
  );

  /* Reanimated shared values (rotation + dash progress) */
  const rotation = useSharedValue(0);
  const dashProgress = useSharedValue(0);

  /* Start infinite animations on mount */
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration, easing: Easing.linear }),
      -1
    );

    dashProgress.value = withRepeat(
      withTiming(dashSequences.length - 1, { duration, easing: Easing.linear }),
      -1,
      /* reverse */ true
    );
  }, [dashSequences, duration, rotation, dashProgress]);

  /* Animated stroke-dasharray */
  const animatedProps = useAnimatedProps(() => {
    const index = Math.floor(dashProgress.value);
    const nextIndex = (index + 1) % dashSequences.length;

    const current = dashSequences[index].split(" ");
    const next = dashSequences[nextIndex].split(" ");

    const interpolated = current.map((dash, i) =>
      interpolate(
        dashProgress.value - index,
        [0, 1],
        [parseFloat(dash), parseFloat(next[i])]
      )
    );

    return { strokeDasharray: interpolated.join(" ") };
  });

  /* Rotation of the whole SVG */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  /* Android: fall back to native ActivityIndicator */
  if (Platform.OS === "android") {
    return (
      <ActivityIndicator
        size={size < 20 ? "small" : size > 20 ? "large" : "small"}
        color={barColor}
      />
    );
  }

  return (
    <View style={[styles.root, { width: size, height: size }]}>
      <Animated.View style={animatedStyle}>
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <Circle
            cx={radius}
            cy={radius}
            r={normalisedRadius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <AnimatedCircle
            cx={radius}
            cy={radius}
            r={normalisedRadius}
            fill="none"
            stroke={barColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            animatedProps={animatedProps}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

/* ───────────── 4.  Unistyles StyleSheet ───────────── */
const styles = StyleSheet.create(() => ({
  root: {
    pointerEvents: "none" as const,
    alignItems: "center",
    justifyContent: "center",
  },
}));
