"use-client";
import {
  Card,
  Text,
  Stack,
  Badge,
  Group,
  Tooltip,
  Image,
  ActionIcon,
} from "@mantine/core";
import classes from "./ConductivityHistoryCard.module.css";
import { FC } from "react";
import { ConductivityHistoryLineChart } from "../conductivityHistoryLineChart/ConductivityHistoryLineChart";

export interface ConductivityHistoryCardProps {
  data: { day: string; dayabbrev: string; conductivity: number }[];
  average: number;
  toolTipLabel: string;
}

export const ConductivityHistoryCard: FC<ConductivityHistoryCardProps> = ({
  data,
  average,
  toolTipLabel,
}) => {
  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Stack className={classes.inner}>
        <Group className={classes.tooltipGroup}>
          <Text className={classes.title}>Water Conductivity</Text>
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
              variant="white"
              title="Water Conductivity Info"
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
