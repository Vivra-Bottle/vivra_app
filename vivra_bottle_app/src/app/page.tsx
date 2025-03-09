"use client";
import { ProgressRing } from "@/components/ProgressRing/ProgressRing";
import { Badge, Stack, Title, Text } from "@mantine/core";
import axios from "axios";

import classes from "./page.module.css";
import { SummaryCard } from "@/components/summaryCard/SummaryCard";
import { TempQualBadge } from "@/components/tempQualBadge/TempQualBadge";
import { ConductivitySummaryCard } from "@/components/conductivitySummaryCard/ConductivitySummaryCard";
import { useEffect, useState } from "react";

// TODO Delete and Replace with name from database
const consumptionGoal = 2.4;
const amountDrank = 1.1;
const percentageDrank = Math.round((amountDrank / consumptionGoal) * 100);
const temp = 22;

// Updated data with hours and conductivity values
const conductivityData = [
  { time: "08:00 AM", conductivity: 700 },
  { time: "09:00 AM", conductivity: 600 },
  { time: "10:00 AM", conductivity: 400 },
  { time: "11:00 AM", conductivity: 80 },
  { time: "12:00 PM", conductivity: 0 },
  { time: "01:00 PM", conductivity: 2000 },
  { time: "02:00 PM", conductivity: 200 },
  { time: "03:00 PM", conductivity: 1000 },
  { time: "04:00 PM", conductivity: 500 },
  { time: "05:00 PM", conductivity: 700 },
];

// User details
interface User {
  gender: string;
  weight: number;
  age: number;
  activity: number;
  first_name: string;
  last_name: string;
}

interface conductivityInDay {
  time: string;
  value: number;
}

export default function Summary() {
  // profile details
  const [user, setUser] = useState<User | null>(null);

  const getUserData = async () => {
    try {
      const response = await axios.get(
        "https://getuser-gxx3sm32mq-uc.a.run.app/"
      );
      setUser(response.data);
      console.log(response);
      console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("fetching data on load");
    getUserData();
  }, []);

  // TODO incomplete
  // Conductivity Day data
  const getDayConductivityData = async () => {
    try {
      const response = await axios.get(
        "https://getallconductivitydataday-gxx3sm32mq-uc.a.run.app"
      );
      // setUser(response.data);
      console.log(response.data);
      // console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("fetching data on load");
    getDayConductivityData();
  }, []);

  return (
    <Stack className={classes.stack}>
      <Title order={2} className={classes.name}>
        Welcome, {user?.first_name || "Guest"}
      </Title>
      <SummaryCard
        title="Water Consumption"
        graph={
          <ProgressRing
            value={percentageDrank}
            size={220}
            thickness={12}
          ></ProgressRing>
        }
        tooltipLabel="See your hydration progress at a glance! Here is today's goal, intake, and progress."
        cardStats={
          <Stack className={classes.consumptionStats}>
            <Badge
              variant="light"
              color="blue"
              className={classes.consumptionBadge}
            >
              Goal: {consumptionGoal} L/day
            </Badge>
            <Badge
              variant="light"
              color="rgba(39, 176, 167, 1)"
              className={classes.consumptionBadge}
            >
              You drank: {amountDrank} L
            </Badge>
          </Stack>
        }
      ></SummaryCard>
      <Title order={4} mt={20}>
        Water Quality
      </Title>
      <SummaryCard
        title="Temperature"
        graph={
          <Badge variant="light" color="blue" className={classes.tempBadge}>
            {temp}°
          </Badge>
        }
        tooltipLabel="See water temperature and its risk level for bacterial growth."
        cardStats={
          <Stack className={classes.consumptionStats}>
            <TempQualBadge temperature={56}></TempQualBadge>
            <Text className={classes.tempText}>
              High, Medium, and Low risk of bacterial growth
            </Text>
          </Stack>
        }
      ></SummaryCard>
      <ConductivitySummaryCard
        data={conductivityData}
        tooltipLabel="Monitor your water's conductivity throughout the day and quality score."
      ></ConductivitySummaryCard>
      <div style={{ marginTop: "50px" }}></div>
    </Stack>
  );
}
