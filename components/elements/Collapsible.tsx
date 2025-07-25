import { PropsWithChildren, ReactNode, useMemo, useState } from "react";

import { LayoutChangeEvent, View, ViewProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Typography } from "@/components/atoms/Typography";
import { ColorsKey } from "@/styles/colors.keys";
import { CaretRightIcon } from "phosphor-react-native";
import { PressableScale } from "../animations/PressableScale";
import { ThemedIcon } from "../icons";

type CollapsibleProps = PropsWithChildren & {
  title?: string;
  rightIcon?: ReactNode;
  header?: ReactNode | null;
  style?: ViewProps["style"];
  color?: ColorsKey;
  animated?: boolean;
};

export function Collapsible({
  children,
  title,
  style,
  color = "primaryForeground",
  rightIcon,
  animated = true,
  header = null,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultHeader = useMemo(() => {
    if (!title) return;
    return (
      <PressableScale
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        targetScale={0.99}
      >
        <View style={styles.headerLeft}>
          {!rightIcon && (
            <ThemedIcon icon={CaretRightIcon} color={color} size="sm" />
          )}
          {rightIcon && rightIcon}
          <Typography variant="subtitle">{title}</Typography>
        </View>
      </PressableScale>
    );
  }, [color, title, rightIcon]);

  const customHeader = useMemo(() => {
    if (!header) return;
    return (
      <PressableScale
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        targetScale={0.99}
      >
        {header}
      </PressableScale>
    );
  }, [header]);

  const dynamicChild = useMemo(() => {
    if (animated) {
      return (
        <CollapsableContainer expanded={isOpen}>
          <View style={styles.content}>{children}</View>
        </CollapsableContainer>
      );
    }

    if (!isOpen) return;

    return <View style={styles.content}>{children}</View>;
  }, [isOpen, children, animated]);

  return (
    <View style={style}>
      {defaultHeader}
      {customHeader}

      {dynamicChild}
    </View>
  );
}

export const CollapsableContainer = ({
  children,
  expanded,
}: {
  children: React.ReactNode;
  expanded: boolean;
}) => {
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [expanded]);

  return (
    <Animated.View style={[collapsableStyle, { overflow: "hidden" }]}>
      <View style={{ position: "absolute" }} onLayout={onLayout}>
        {children}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create((theme) => ({
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    marginTop: 6,
  },
  icon: {
    color: theme.colors.text,
  },
  headerLeft: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
}));
