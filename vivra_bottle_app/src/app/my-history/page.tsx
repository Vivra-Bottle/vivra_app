"use client";
import { BarChart } from "@/components/barChart/BarChart";
import { SparklineChart } from "@/components/sparklineChart/SparklineChart";

// Use module styling
export default function MyHistory() {
  return (
    <div>
      <p>History Page</p>
      <BarChart></BarChart>
      <SparklineChart></SparklineChart>
    </div>
  );
}
