"use-client";
import {
  Card,
  Text,
  Stack,
  Badge,
  Group,
  Tooltip,
  ActionIcon,
  Image,
} from "@mantine/core";
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
  toolTipLabel: string;
}

export const ConsumptionHistoryCard: FC<ConsumptionHistoryCardProps> = ({
  data,
  goal,
  average,
  toolTipLabel,
}) => {
  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Stack className={classes.inner}>
        <Group className={classes.tooltipGroup}>
          <Text className={classes.title}>Water Consumption</Text>
          <Tooltip
            className={classes.tooltip}
            multiline
            w={220}
            withArrow
            transitionProps={{ duration: 200 }}
            label={toolTipLabel}
            position="bottom"
          >
            <ActionIcon
              className={classes.tooltip}
              variant="transparent"
              title="Water Consumption Info"
            >
              <Image
                alt="info icon"
                className={classes.color_icon}
                src="/assets/icons/info-circle.svg"
                height={24}
                width={24}
              />
            </ActionIcon>
          </Tooltip>
        </Group>
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
