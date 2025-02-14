"use client";
import { ProgressRing } from "@/components/progressRing/ProgressRing";
import { Badge, Group, Stack, Title } from "@mantine/core";

import classes from "./page.module.css";
import { WaterQualBadge } from "@/components/waterQualBadge/WaterQualBadge";

export default function MyProfile() {
  return (
    <Stack className={classes.stack}>
      <Title order={4}>Summary</Title>
      <Title order={6}>Water Consumption</Title>
      {/* TO DO work on this */}
      <ProgressRing value={80} size={220} thickness={12}></ProgressRing>
      <Group>
        <Badge variant="light" color="blue">
          Goal: 1.65 L/day
        </Badge>
        <Badge variant="light" color="rgba(39, 176, 167, 1)">
          You drank: 1.1 L
        </Badge>
      </Group>
      <Title order={6} mt={20}>
        Water Quality
      </Title>
      <WaterQualBadge value={88} conductivityVal={76}></WaterQualBadge>
    </Stack>
  );
}
