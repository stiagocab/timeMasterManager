// src/animations/PressableScale.tsx

import React, { useRef } from "react";
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

const DEFAULT_SCALE = 0.95;
const DEFAULT_DURATION = 100;
// Umbral para distinguir single vs. double tap (ms)
const DOUBLE_PRESS_DELAY = 300;

type BaseProps = Exclude<
  PressableProps,
  "onPress" | "onPressIn" | "onPressOut" | "style"
>;

export interface PressableScaleProps extends BaseProps {
  /**
   * Target scale applied while the component is pressed.
   * Defaults to 0.95.
   */
  targetScale?: number;
  /**
   * Optional custom timing for both in/out animations.
   */
  duration?: number;
  /**
   * Additional styles for the outer Pressable.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Disable the scale animation while preserving the Pressable behaviour.
   */
  disabled?: boolean;
  /**
   * Tap handlers: on single and on double tap
   */
  onPress?: (event: GestureResponderEvent) => void;
  onDoublePress?: (event: GestureResponderEvent) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function DoublePressScale({
  children,
  targetScale = DEFAULT_SCALE,
  duration = DEFAULT_DURATION,
  style,
  disabled = false,
  onPress,
  onDoublePress,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const prefersReducedMotion = useReducedMotion();
  const scale = useSharedValue(1);

  // refs para manejar el doble tap
  const lastPress = useRef<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const handlePress = (evt: GestureResponderEvent) => {
    const now = Date.now();
    if (lastPress.current && now - lastPress.current < DOUBLE_PRESS_DELAY) {
      // detectamos doble tap: cancelamos el single tap pendiente
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      onDoublePress?.(evt);
    } else {
      timeoutRef.current = window.setTimeout(() => {
        onPress?.(evt);
      }, DOUBLE_PRESS_DELAY);
    }
    lastPress.current = now;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: disabled ? 1 : scale.value }],
  }));

  const timingCfg = { duration, easing: Easing.out(Easing.quad) };
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
          scale.value = withTiming(targetScale, timingCfg);
        }
      }}
      onPressOut={(evt) => {
        onPressOut?.(evt);
        if (!prefersReducedMotion && !disabled) {
          cancelAnimation(scale);
          scale.value = withTiming(1, timingCfg);
        }
      }}
      onPress={handlePress}
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
