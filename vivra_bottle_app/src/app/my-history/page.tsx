"use client";
import { BarChart } from "@/components/barChart/BarChart";
import { SparklineChart } from "@/components/sparklineChart/SparklineChart";
import { Stack, Title, Badge } from "@mantine/core";
import classes from "./myHistory.module.css";

export default function MyHistory() {
  const hydrationScore = 98;
  return (
    <Stack className={classes.stack}>
      <Title order={2} className={classes.hydrationTitle}>
        Hydration Score
      </Title>
      <Badge>{hydrationScore}</Badge>
      <BarChart></BarChart>
      <SparklineChart></SparklineChart>
      <div style={{ height: "200px" }}></div>
    </Stack>
  );
}
