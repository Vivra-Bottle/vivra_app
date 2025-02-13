import { FC } from "react";
import { Sparkline as MantineSparklineChart } from "@mantine/charts";

// export interface BarChartProps {
//   data: {
//     day: string;
//     consumption: number;
//     purity: number; // Porbably will delete this
//   }[];
// }

// TODO change sparklineChart to line chart with threshold bc/ sparkline does not have x and y axis
export const SparklineChart: FC = () => {
  const datain = [10, 20, 40, 20, 40, 10, 50];

  return (
    <MantineSparklineChart
      w={200}
      h={60}
      data={datain}
      curveType="linear"
      color="Blue"
      fillOpacity={0.6}
      strokeWidth={2}
    />
  );
};
