"use client";
import { Stack, Title, Badge } from "@mantine/core";
import classes from "./myHistory.module.css";
import { ConsumptionHistoryCard } from "@/components/consumptionHistoryCard/ConsumptionHistoryCard";
import { ConductivityHistoryCard } from "@/components/conductivityHistoryCard/ConductivityHistoryCard";

//Consumption data
const consumptionData = [
  { day: "Monday", consumption: 1.5, dayabbrev: "M" },
  { day: "Tuesday", consumption: 2.2, dayabbrev: "T" },
  { day: "Wednesday", consumption: 1.8, dayabbrev: "W" },
  { day: "Thursday", consumption: 2.5, dayabbrev: "T" },
  { day: "Friday", consumption: 3.0, dayabbrev: "F" },
  { day: "Saturday", consumption: 2.7, dayabbrev: "S" },
  { day: "Sunday", consumption: 1.9, dayabbrev: "S" },
];

const averageConsumption =
  consumptionData.reduce((sum, entry) => sum + entry.consumption, 0) /
  consumptionData.length;

const goal = 2.0; // Example daily goal in liters
const hydrationScore = 98;

//Conductivity data
const conductivityData = [
  { day: "Monday", dayabbrev: "Mon", conductivity: 750 },
  { day: "Tuesday", dayabbrev: "Tue", conductivity: 820 },
  { day: "Wednesday", dayabbrev: "Wed", conductivity: 900 },
  { day: "Thursday", dayabbrev: "Thu", conductivity: 1100 },
  { day: "Friday", dayabbrev: "Fri", conductivity: 950 },
  { day: "Saturday", dayabbrev: "Sat", conductivity: 1020 },
  { day: "Sunday", dayabbrev: "Sun", conductivity: 870 },
];

const averageConductivity =
  conductivityData.reduce((sum, item) => sum + item.conductivity, 0) /
  conductivityData.length;

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
      <ConsumptionHistoryCard
        average={averageConsumption}
        data={consumptionData}
        goal={goal}
      ></ConsumptionHistoryCard>
      <ConductivityHistoryCard
        average={averageConductivity}
        data={conductivityData}
      ></ConductivityHistoryCard>
      <div style={{ height: "200px" }}></div>
    </Stack>
  );
}
