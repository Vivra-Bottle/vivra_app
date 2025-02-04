"use client";
import { BarChart } from "@/components/barChart/BarChart";
import { Box } from "@mantine/core";
import classes from "./myHistory.module.css";
import { Flex } from "@mantine/core";

// Use module styling
export default function MyHistory() {
  return (
    <div>
      <p>History Page</p>
      <BarChart></BarChart>
    </div>
  );
}
