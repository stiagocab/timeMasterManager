import React from "react";

import { View } from "react-native";

import {
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BreadIcon,
  BusIcon,
  CalendarBlankIcon,
  CalendarDotIcon,
  HandPointingIcon,
  HouseLineIcon,
  LeafIcon,
  LockIcon,
  PingPongIcon,
  WineIcon,
} from "phosphor-react-native";

import { Button, Divider, IconButton, Typography } from "@/components/atoms";
import { Collapsible } from "@/components/elements/Collapsible";
import { ThemedIcon } from "@/components/icons";

export default function ButtonsPreview() {
  return (
    <Collapsible
      title="Buttons"
      rightIcon={<ThemedIcon icon={HandPointingIcon} />}
    >
      <View style={{ gap: 20, paddingBottom: 30 }}>
        <View>
          <Typography variant="subtitle">Variants: Default filled</Typography>
          <Divider />
        </View>

        <View style={{ gap: 15 }}>
          <Button title="Filled" variant="filled" color="primary" />
          <Button title="Outlined" variant="outlined" color="primary" />
          <Button title="Text" variant="text" color="primary" />
          <Button title="Link" variant="link" color="primary" />
        </View>

        <View>
          <Typography variant="subtitle">Colors: Default Primary</Typography>
          <Divider />
        </View>

        <View style={{ gap: 15 }}>
          <Button title="Primary" variant="filled" color="primary" />
          <Button title="Highlight" variant="filled" color="secondary" />
          <Button title="Accent" variant="outlined" color="accent" />
          <Button title="Error Text" variant="text" color="error" />
          <Button title="Link Info" variant="link" color="info" />
        </View>

        <View>
          <Typography variant="subtitle">Sizes</Typography>
          <Divider />
        </View>

        <View style={{ gap: 15 }}>
          <Button title="SM" variant="filled" size="sm" />
          <Button title="MD" variant="filled" size="md" />
          <Button title="LG" variant="filled" size="lg" />
        </View>
        <View>
          <Typography variant="subtitle">Loading & Disabled</Typography>
          <Divider />
        </View>
        <View style={{ gap: 15 }}>
          <Button title="Loading" isLoading variant="filled" />
          <Button title="Disabled" variant="outlined" disabled color="accent" />
        </View>

        <View>
          <Typography variant="subtitle">Full Width</Typography>
          <Divider />
        </View>

        <View style={{ gap: 15 }}>
          <Button
            title="Full Width True"
            variant="filled"
            color="success"
            fullWidth
          />
          <Button
            title="Full Width False"
            variant="outlined"
            color="warning"
            fullWidth={false}
          />

          <Button
            title="Full Width: SM"
            variant="filled"
            color="success"
            fullWidth
            size="sm"
          />

          <Button
            title="Full Width: md"
            variant="filled"
            color="success"
            fullWidth
            size="md"
          />

          <Button
            title="Full Width: lg"
            variant="filled"
            color="success"
            fullWidth
            size="lg"
          />

          <Button
            title="Full Width false: SM"
            variant="filled"
            color="success"
            fullWidth={false}
            size="sm"
          />

          <Button
            title="Full Width false: md"
            variant="filled"
            color="success"
            fullWidth={false}
            size="md"
          />

          <Button
            title="Full Width false: lg"
            variant="filled"
            color="success"
            fullWidth={false}
            size="lg"
          />
        </View>

        <View style={{ gap: 20 }}>
          <View>
            <Typography variant="subtitle">Icon button: sizes</Typography>
            <Divider />
          </View>

          <View
            style={{
              gap: 10,
              flexDirection: "row",
            }}
          >
            <IconButton icon={ArrowLeftIcon} size="sm" variant="filled" />
            <IconButton icon={HouseLineIcon} size="md" variant="filled" />
            <IconButton icon={HouseLineIcon} size="lg" variant="filled" />
            <IconButton icon={HouseLineIcon} size="xl" variant="filled" />
          </View>

          <View
            style={{
              gap: 10,
              flexDirection: "row",
            }}
          >
            <IconButton
              size="md"
              icon={BusIcon}
              variant="filled"
              color="info"
            />
            <IconButton size="md" icon={LeafIcon} variant="filled" />
            <IconButton
              size="md"
              icon={ArchiveIcon}
              variant="transparent"
              color="info"
            />
            <IconButton size="md" icon={ArrowRightIcon} variant="filled" />
            <IconButton size="md" icon={LockIcon} variant="filled" />
            <IconButton size="md" icon={PingPongIcon} variant="transparent" />
          </View>

          <View
            style={{
              gap: 10,
              flexDirection: "row",
            }}
          >
            <IconButton
              size="md"
              icon={BreadIcon}
              variant="filled"
              color="error"
            />
            <IconButton
              size="md"
              icon={WineIcon}
              variant="filled"
              color="success"
            />
            <IconButton
              size="md"
              icon={CalendarBlankIcon}
              variant="transparent"
              color="warning"
            />
            <IconButton size="md" icon={CalendarDotIcon} variant="filled" />
          </View>
        </View>
      </View>
    </Collapsible>
  );
}
