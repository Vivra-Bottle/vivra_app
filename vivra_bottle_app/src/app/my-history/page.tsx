"use client";
import { BarChart } from "@/components/barChart/BarChart";
import { SparklineChart } from "@/components/sparklineChart/SparklineChart";
import { Stack } from "@mantine/core";

// Use module styling
export default function MyHistory() {
  return (
    <Stack>
      <p>History Page</p>
      <BarChart></BarChart>
      <SparklineChart></SparklineChart>
      <div style={{ height: "200px" }}></div>
    </Stack>
  );
}
