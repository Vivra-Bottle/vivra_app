"use-client";
import { Card, Text, Stack, Badge } from "@mantine/core";
import classes from "./ConsumptionHistoryCard.module.css";
import { FC } from "react";
import { ConsumptionBarChart } from "../consumptionBarChart/ConsumptionBarChart";

interface ConsumptionHistoryCardProps {
  data: {
    day: string;
    consumption: number;
    dayabbrev: string;
  }[];
  goal: number;
  average: number;
}

export const ConsumptionHistoryCard: FC<ConsumptionHistoryCardProps> = ({
  data,
  goal,
  average,
}) => {
  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Stack className={classes.inner}>
        <Text className={classes.title}>Water Consumption</Text>
        <Stack className={classes.averageSection}>
          <div className={classes.chart}>
            <ConsumptionBarChart
              average={average}
              data={data}
              goal={goal}
            ></ConsumptionBarChart>
          </div>
          <Badge
            styles={{ label: { overflow: "visible" } }}
            className={classes.averageBadge}
            variant="outline"
          >
            <span style={{ textTransform: "none" }}>Average Consumption:</span>{" "}
            {average.toFixed(1)} L
          </Badge>
        </Stack>
      </Stack>
    </Card>
  );
};
