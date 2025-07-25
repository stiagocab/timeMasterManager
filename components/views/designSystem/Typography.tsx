import React from "react";

import { TextAaIcon } from "phosphor-react-native";
import { View } from "react-native";

import { Typography } from "@/components/atoms";
import { Collapsible } from "@/components/elements/Collapsible";
import { ThemedIcon } from "@/components/icons";

export default function TypographyPreview() {
  return (
    <Collapsible
      title="Typography"
      rightIcon={<ThemedIcon icon={TextAaIcon} />}
    >
      <View>
        {typographyVariants.map((variant) => (
          <Typography
            key={variant.variant}
            variant={variant.variant as any}
            style={{ marginBottom: 10 }}
          >
            {variant.label}
          </Typography>
        ))}
      </View>
    </Collapsible>
  );
}

const typographyVariants = [
  { variant: "default", label: "This is default text. Same styles to body" },
  { variant: "body", label: "This is body text. Default style" },
  { variant: "caption", label: "This is caption text" },
  { variant: "defaultSemiBold", label: "This is semi-bold default text" },
  { variant: "title", label: "This is a title" },
  { variant: "subtitle", label: "This is a subtitle" },
  { variant: "link", label: "This is a link" },
];
