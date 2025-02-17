import { FC } from "react";
import { LineChart } from "@mantine/charts";

export interface ConductivityLineChartProps {
  data: { time: string; conductivity: number }[];
}

export const ConductivityLineChart: FC<ConductivityLineChartProps> = ({
  data,
}) => {
  return (
    <div>
      <LineChart
        withTooltip={false}
        type="gradient"
        gradientStops={[
          { offset: 0, color: "red.5" }, // Green at the lowest conductivity values
          { offset: 800, color: "yellow.4" }, // Green up to 800
          { offset: 1000, color: "lime.5" },
        ]}
        h={300}
        // w={300}
        data={data}
        dataKey="time"
        xAxisProps={{
          tickFormatter: (time: string) => time, // Format x-axis ticks as time
        }}
        yAxisLabel="conductivity"
        yAxisProps={{
          domain: [0, 2000], // Set range for conductivity (y-axis)
        }}
        referenceLines={[
          { y: 1000, label: "Poor", color: "red" },
          { y: 800, label: "Caution", color: "yellow" }, // Reference line for conductivity threshold
          // { x: "12:00 PM", label: "Midday", color: "blue" }, // Reference line for midday
        ]}
        series={[
          {
            name: "conductivity", // Data series name
            color: "indigo", // Line color
          },
        ]}
      />
    </div>
  );
};
