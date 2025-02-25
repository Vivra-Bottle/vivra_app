import { FC } from "react";
import { Paper, Text } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { TooltipProps } from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

export interface ConductivityHistoryLineChartProps {
  data: { day: string; dayabbrev: string; conductivity: number }[];
  average: number;
}

// Tooltip
function ChartTooltip(props: TooltipProps<ValueType, NameType>) {
  const item = props?.payload?.[0]?.payload;
  if (!item) return null;
  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md" mt={5}>
      <Text fw={500} mb={5}>
        {item.day}
      </Text>
      <Text fz="sm">Conductivity: {item.conductivity} µS/cm</Text>
    </Paper>
  );
}

export const ConductivityHistoryLineChart: FC<
  ConductivityHistoryLineChartProps
> = ({ data, average }) => {
  // offset values calculations based on max y value
  const maxy = 2200;
  // Adjust fadeStart to finetune where the transition between colours starts
  const fadeStart = 100;
  const greenoffset = ((maxy - 800 + fadeStart) / maxy) * 100;
  const yellowoffset = ((maxy - 1000 + fadeStart) / maxy) * 100;
  return (
    <div>
      <LineChart
        withDots={true}
        type="gradient"
        gradientStops={[
          { offset: 0, color: "red.5" },
          { offset: yellowoffset, color: "yellow.4" },
          { offset: greenoffset, color: "lime.5" },
        ]}
        h={300}
        data={data}
        dataKey="day"
        xAxisProps={{
          tickFormatter: (day: string, index: number) => {
            const isSmallScreen = window.innerWidth < 640;
            return isSmallScreen ? data[index].dayabbrev : day;
          },
        }}
        yAxisLabel="Conductivity (µS/cm)"
        yAxisProps={{
          domain: [0, maxy],
        }}
        referenceLines={[
          // { y: 1000, label: "Poor", color: "red" },
          // { y: 800, label: "Caution", color: "yellow" },
          {
            y: average,
            color: "green.6",
            label: "avg",
            strokeDasharray: "10 10",
          },
        ]}
        series={[
          {
            name: "conductivity",
            color: "indigo",
          },
        ]}
        strokeWidth={3}
        tooltipProps={{
          content: ChartTooltip,
          cursor: {
            stroke: "grey",
            strokeWidth: 1,
            strokeDasharray: "5 5",
          },
        }}
      ></LineChart>
    </div>
  );
};
