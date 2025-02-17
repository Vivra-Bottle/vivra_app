"use client";
import { ProgressRing } from "@/components/ProgressRing/ProgressRing";
import { Badge, Stack, Title } from "@mantine/core";

import classes from "./page.module.css";
import { WaterQualBadge } from "@/components/waterQualBadge/WaterQualBadge";
import { SummaryCard } from "@/components/summaryCard/SummaryCard";

// TODO Delete and Replace with name from database
const name = "Mary";
const consumptionGoal = 2.4;
const amountDrank = 1.1;
const percentageDrank = Math.round((amountDrank / consumptionGoal) * 100);

export default function Summary() {
  return (
    <Stack className={classes.stack}>
      <Title order={2} className={classes.name}>
        Welcome, {name}
      </Title>
      <SummaryCard
        title="Water Consumption"
        graph={
          <ProgressRing
            value={percentageDrank}
            size={220}
            thickness={12}
          ></ProgressRing>
        }
        cardStats={
          <Stack className={classes.consumptionStats}>
            <Badge
              variant="light"
              color="blue"
              className={classes.consumptionBadge}
            >
              Goal: {consumptionGoal} L/day
            </Badge>
            <Badge
              variant="light"
              color="rgba(39, 176, 167, 1)"
              className={classes.consumptionBadge}
            >
              You drank: {amountDrank} L
            </Badge>
          </Stack>
        }
      ></SummaryCard>
      <Title order={6} mt={20}>
        Water Quality
      </Title>
      <WaterQualBadge value={88} conductivityVal={76}></WaterQualBadge>
    </Stack>
  );
}
