// src/components/SlideAnimatedView.tsx

import React, { useEffect, useState } from "react";
import { StyleProp, ViewProps, ViewStyle } from "react-native";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

// Predefined animation durations in milliseconds
const SPEEDS = {
  fast: 200,
  medium: 300,
  slow: 400,
} as const;

type SpeedKey = keyof typeof SPEEDS;

/**
 * Props for the SlideInView component.
 */
interface SlideInViewProps extends ViewProps {
  /**
   * Animation speed for fade transitions.
   * @default "medium"
   */
  speed?: SpeedKey;
  /**
   * Additional style for the container view.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * SlideInView animates its children by fading in (opacity 0→1)
 * when the component mounts.
 */
export function SlideInView({
  children,
  speed = "medium",
  style,
  ...rest
}: SlideInViewProps) {
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  // Entry animation: fade in on mount
  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: SPEEDS[speed],
      easing: Easing.inOut(Easing.ease),
    });
  }, [opacity, speed]);

  return (
    <Animated.View {...rest} style={[{ opacity: 0 }, style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

/**
 * Props for the VisibilitySlideView component.
 */
interface VisibilitySlideViewProps extends ViewProps {
  /**
   * Controls whether the view is visible.
   */
  visible: boolean;
  /**
   * Animation speed for fade transitions.
   * @default "medium"
   */
  speed?: SpeedKey;
  /**
   * Additional style for the container view.
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * VisibilitySlideView animates its children by fading opacity
 * when toggling the `visible` prop. On mount, it appears immediately
 * with opacity 0 and then fades in. On unmount, it fades out before
 * removing the view.
 */
export function VisibilitySlideView({
  visible,
  speed = "medium",
  style,
  children,
  ...rest
}: VisibilitySlideViewProps) {
  const [shouldRender, setShouldRender] = useState(visible);
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  // Callback executed after exit animation completes
  const handleUnmount = () => setShouldRender(false);

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      // Fade in
      opacity.value = withTiming(1, {
        duration: SPEEDS[speed!],
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      // Fade out, then unmount
      opacity.value = withTiming(
        0,
        { duration: SPEEDS[speed!], easing: Easing.inOut(Easing.ease) },
        (finished) => {
          if (finished) runOnJS(handleUnmount)();
        }
      );
    }
  }, [visible, speed, opacity]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View {...rest} style={[{ opacity: 0 }, style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}
