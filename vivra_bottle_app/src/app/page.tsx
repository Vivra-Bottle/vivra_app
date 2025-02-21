"use client";
import { ProgressRing } from "@/components/ProgressRing/ProgressRing";
import { Badge, Stack, Title, Text } from "@mantine/core";

import classes from "./page.module.css";
import { SummaryCard } from "@/components/summaryCard/SummaryCard";
import { TempQualBadge } from "@/components/tempQualBadge/TempQualBadge";
import { ConductivitySummaryCard } from "@/components/conductivitySummaryCard/ConductivitySummaryCard";

// TODO Delete and Replace with name from database
const name = "Mary";
const consumptionGoal = 2.4;
const amountDrank = 1.1;
const percentageDrank = Math.round((amountDrank / consumptionGoal) * 100);
const temp = 22;

// Updated data with hours and conductivity values
const conductivityData = [
  { time: "08:00 AM", conductivity: 700 },
  { time: "09:00 AM", conductivity: 600 },
  { time: "10:00 AM", conductivity: 400 },
  { time: "11:00 AM", conductivity: 80 },
  { time: "12:00 PM", conductivity: 0 },
  { time: "01:00 PM", conductivity: 2000 },
  { time: "02:00 PM", conductivity: 200 },
  { time: "03:00 PM", conductivity: 1000 },
  { time: "04:00 PM", conductivity: 500 },
  { time: "05:00 PM", conductivity: 700 },
];

export default function Summary() {
  return (
    <div>
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
        <Title order={4} mt={20}>
          Water Quality
        </Title>
        <SummaryCard
          title="Temperature"
          graph={
            <Badge variant="light" color="blue" className={classes.tempBadge}>
              {temp}°
            </Badge>
          }
          cardStats={
            <Stack className={classes.consumptionStats}>
              <TempQualBadge temperature={56}></TempQualBadge>
              <Text className={classes.tempText}>
                High, Medium, and Low risk of bacterial growth
              </Text>
            </Stack>
          }
        ></SummaryCard>
        <ConductivitySummaryCard
          data={conductivityData}
        ></ConductivitySummaryCard>
        <div style={{ marginTop: "50px" }}></div>
      </Stack>
    </div>
  );
}
