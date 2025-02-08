import { FC } from "react";
import { BarChart as MantineBarChart } from "@mantine/charts";

import { data } from "./data";

// export interface BarChartProps {
//   data: {
//     day: string;
//     consumption: number;
//     purity: number; // Porbably will delete this
//   }[];
// }

// TODO figure out if i need a useState or how to capture change in data
export const BarChart: FC = () => {
  return (
    <MantineBarChart
      mt={"100px"}
      h={300}
      data={data}
      dataKey="month"
      series={[
        { name: "Smartphones", color: "violet.6" },
        { name: "Laptops", color: "blue.6" },
        { name: "Tablets", color: "teal.6" },
      ]}
      tickLine="y"
      barProps={{ radius: [10, 10, 0, 0] }}
      withTooltip={false}
      //   tooltipProps={() =>
      //     data.length > 0 ? (
      //       <div
      //         style={{
      //           padding: "8px",
      //           background: "white",
      //           borderRadius: "4px",
      //           boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      //         }}
      //       >
      //         <strong>{data[0].month}</strong>
      //         <br />
      //         📱 Smartphones: {data[0].Smartphones}
      //         <br />
      //         💻 Laptops: {data[0].Laptops}
      //         <br />
      //         📟 Tablets: {data[0].Tablets}
      //       </div>
      //     ) : null
      //   }
    />
  );
};
