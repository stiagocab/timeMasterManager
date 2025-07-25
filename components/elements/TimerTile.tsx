import React, { useState } from "react";

import { TimerIcon } from "phosphor-react-native";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { Typography } from "../atoms";
import { ThemedIcon } from "../icons";
import { Collapsible } from "./Collapsible";

export function TimerTile() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View>
      <Collapsible
        header={
          <View style={styles.root}>
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <View style={styles.iconContainer}>
                <ThemedIcon icon={TimerIcon} />
              </View>
              <Typography>Focus</Typography>
            </View>

            <View>
              <Typography>20 min</Typography>
            </View>
          </View>
        }
      >
        <View>
          <Typography>HELLO</Typography>
          <Typography>HELLO</Typography>
          <Typography>HELLO</Typography>
          <Typography>HELLO</Typography>
          <Typography>HELLO</Typography>
        </View>
      </Collapsible>

      {/* {isExpanded && (
        <View>
          <Typography>HELLO</Typography>
          <Typography>HELLO</Typography>
          <Typography>HELLO</Typography>
          <Typography>HELLO</Typography>
          <Typography>HELLO</Typography>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  iconContainer: {
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.border,
    width: 40,
    height: 40,

    justifyContent: "center",
    alignItems: "center",
  },
}));
