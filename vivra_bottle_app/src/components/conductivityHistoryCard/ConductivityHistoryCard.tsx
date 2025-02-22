"use-client";
import { Card, Text, Stack, Badge } from "@mantine/core";
import classes from "./ConductivityHistoryCard.module.css";
import { FC } from "react";
import { ConductivityHistoryLineChart } from "../conductivityHistoryLineChart/ConductivityHistoryLineChart";

export interface ConductivityHistoryCardProps {
  data: { day: string; dayabbrev: string; conductivity: number }[];
  average: number;
}

export const ConductivityHistoryCard: FC<ConductivityHistoryCardProps> = ({
  data,
  average,
}) => {
  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Stack className={classes.inner}>
        <Text className={classes.title}>Water Conductivity</Text>
        <Stack className={classes.averageSection}>
          <div className={classes.chart}>
            <ConductivityHistoryLineChart
              average={average}
              data={data}
            ></ConductivityHistoryLineChart>
          </div>
          <Badge
            styles={{ label: { overflow: "visible" } }}
            className={classes.averageBadge}
            variant="outline"
          >
            <span style={{ textTransform: "none" }}>
              Average Conductivity: {average.toFixed(1)} μs/cm
            </span>
          </Badge>
        </Stack>
      </Stack>
    </Card>
  );
};
