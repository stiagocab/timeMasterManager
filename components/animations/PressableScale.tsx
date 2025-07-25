// src/animations/PressableScale.tsx

import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";

const DEFAULT_SCALE = 0.96;
const DEFAULT_DURATION = 100;

// Exclude style and press handlers so we control them
type BaseProps = Omit<PressableProps, "style">;

export interface PressableScaleProps extends BaseProps {
  /**
   * Target scale applied while the component is pressed.
   * Defaults to 0.95.
   */
  targetScale?: number;
  /**
   * Custom duration for press in/out animations.
   */
  duration?: number;
  /**
   * Additional style for the Pressable container.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Disable scale animation, retaining Pressable behavior.
   */
  disabled?: boolean;
  /**
   * Handler for press events.
   */
  onPress?: (event: GestureResponderEvent) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * PressableScale applies a spring-like scale animation on press in/out.
 * It accepts the same props as Pressable, plus `targetScale`, `duration`, and `disabled`.
 */
export function PressableScale({
  children,
  targetScale = DEFAULT_SCALE,
  duration = DEFAULT_DURATION,
  style,
  disabled = false,
  onPress,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const prefersReducedMotion = useReducedMotion();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: disabled ? 1 : scale.value }],
  }));

  const timingConfig = { duration, easing: Easing.out(Easing.quad) };
  const composedStyle = [
    styles.root,
    style,
    !prefersReducedMotion && animatedStyle,
  ];

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      style={composedStyle}
      onPressIn={(evt) => {
        onPressIn?.(evt);
        if (!prefersReducedMotion && !disabled) {
          cancelAnimation(scale);
          scale.value = withTiming(targetScale, timingConfig);
        }
      }}
      onPressOut={(evt) => {
        onPressOut?.(evt);
        if (!prefersReducedMotion && !disabled) {
          cancelAnimation(scale);
          scale.value = withTiming(1, timingConfig);
        }
      }}
      onPress={onPress}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
  },
});
