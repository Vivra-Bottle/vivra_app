import { FC } from "react";
import { Sparkline as MantineSparklineChart } from "@mantine/charts";

// export interface BarChartProps {
//   data: {
//     day: string;
//     consumption: number;
//     purity: number; // Porbably will delete this
//   }[];
// }

// TODO figure out if i need a useState or how to capture change in data
export const SparklineChart: FC = () => {
  return (
    <MantineSparklineChart
      w={200}
      h={60}
      data={[10, 20, 40, 20, 40, 10, 50]}
      curveType="linear"
      color="blue"
      fillOpacity={0.6}
      strokeWidth={2}
    />
  );
};
