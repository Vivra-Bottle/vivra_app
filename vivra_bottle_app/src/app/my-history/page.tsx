"use client";
import { ConsumptionBarChart } from "@/components/consumptionBarChart/ConsumptionBarChart";
import { Stack, Title, Badge } from "@mantine/core";
import classes from "./myHistory.module.css";
import { Label } from "recharts";

const consumptionData = [
  { day: "Monday", consumption: 1.5 },
  { day: "Tuesday", consumption: 2.2 },
  { day: "Wednesday", consumption: 1.8 },
  { day: "Thursday", consumption: 2.5 },
  { day: "Friday", consumption: 3.0 },
  { day: "Saturday", consumption: 2.7 },
  { day: "Sunday", consumption: 1.9 },
];

const averageConsumption =
  consumptionData.reduce((sum, entry) => sum + entry.consumption, 0) /
  consumptionData.length;

const goal = 2.0; // Example daily goal in liters
const hydrationScore = 98;

export default function MyHistory() {
  return (
    <Stack className={classes.stack}>
      <Title order={2} className={classes.hydrationTitle}>
        Hydration Score
      </Title>
      <Badge
        className={classes.hydrationScoreBadge}
        styles={{ label: { overflow: "visible" } }}
      >
        {hydrationScore}
      </Badge>
      <Title order={2} className={classes.weeklyHistTitle}>
        Last 7-days:
      </Title>
      <ConsumptionBarChart
        average={averageConsumption}
        data={consumptionData}
        goal={goal}
      ></ConsumptionBarChart>
      <div style={{ height: "200px" }}></div>
    </Stack>
  );
}
