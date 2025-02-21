"use-client";
import { FC } from "react";
import { BarChart as MantineBarChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import { Paper, Text } from "@mantine/core";

export interface BarChartProps {
  data: {
    day: string;
    consumption: number;
  }[];
  goal: number;
}

function ChartTooltip(props: TooltipProps<ValueType, NameType>) {
  const item = props?.payload?.[0]?.payload;
  if (!item) return null;
  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md" mt={5}>
      <Text fw={500} mb={5}>
        {item.day}
      </Text>
      <Text fz="sm">Consumption: {item.consumption} L</Text>
    </Paper>
  );
}

// TODO figure out if i need a useState or how to capture change in data
export const BarChart: FC<BarChartProps> = ({ data, goal }) => {
  return (
    <MantineBarChart
      mt={"100px"}
      h={300}
      data={data}
      dataKey="day"
      series={[{ name: "consumption", color: "blue.6" }]}
      getBarColor={(value) => (value > goal ? "blue.6" : "red.8")}
      tickLine="y"
      barProps={{ radius: [10, 10, 0, 0] }}
      tooltipProps={{
        content: ChartTooltip,
      }}
      referenceLines={[
        {
          y: goal,
          color: "blue.6",
          label: "Goal",
        },
      ]}
    />
  );
};
