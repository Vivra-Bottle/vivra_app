"use client";
import { ProgressRing } from "@/components/ProgressRing/ProgressRing";
import { Badge, Stack, Title, Text, Loader } from "@mantine/core";
import axios from "axios";

import classes from "./page.module.css";
import { SummaryCard } from "@/components/summaryCard/SummaryCard";
import { TempQualBadge } from "@/components/tempQualBadge/TempQualBadge";
import { ConductivitySummaryCard } from "@/components/conductivitySummaryCard/ConductivitySummaryCard";
import { useEffect, useState } from "react";

// User details
interface User {
  gender: string;
  weight: number;
  goal: number;
  age: number;
  activity: number;
  first_name: string;
  last_name: string;
}

interface ConductivityData {
  [time: string]: number; // The key is a time in 24-hour format and the value is a conductivity number
}

interface ConductivityItem {
  time: string; // The time in 12-hour AM/PM format
  conductivity: number; // The conductivity value
}

export default function Summary() {
  // profile details
  const [user, setUser] = useState<User | null>(null);
  const [temp, setTemp] = useState(0);
  const [consumption, setConsumption] = useState(10);
  const [conductivity, setConductivity] = useState<ConductivityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const sortDataByTime = (data: { [key: string]: number }): { [key: string]: number } => {
    const dataArray = Object.entries(data);

    const sortedArray = dataArray.sort(([timeA], [timeB]) => {
      const [hoursA, minutesA] = timeA.split(':').map(Number);
      const [hoursB, minutesB] = timeB.split(':').map(Number);
  
      const dateA = new Date(0, 0, 0, hoursA, minutesA); 
      const dateB = new Date(0, 0, 0, hoursB, minutesB);
  
      return dateA.getTime() - dateB.getTime();
    });
  
    const sortedData = Object.fromEntries(sortedArray);
    return sortedData;
  };
  
  const convertToConductivityArray = (data: ConductivityData): ConductivityItem[] => {
    // Helper function to convert 24-hour time to 12-hour AM/PM format
    const convertTo12HourFormat = (time24: string): string => {
      const [hour, minute] = time24.split(":").map(Number);
      const period = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12; // Convert 0 -> 12 for midnight
      const minuteFormatted = minute < 10 ? `0${minute}` : minute;
      return `${hour12}:${minuteFormatted} ${period}`;
    };
  
    // Convert the dictionary to an array of objects
    const result: ConductivityItem[] = Object.entries(data).map(([time24, conductivity]) => {
      const time12 = convertTo12HourFormat(time24);
      return { time: time12, conductivity };
    });
  
    return result;
  };

  const calculateWaterConsumption = (data: { [key: string]: number }) => {
    let volume = 0;
    let prev = null;
    const keys = Object.keys(data);

    for (let i = 0; i < keys.length; i++){
      if (prev != null && (data[keys[i]] - prev) < 0){
        volume -= (data[keys[i]] - prev);
      }
      prev = data[keys[i]];
    }

    return volume
  }

  const getUserData = async () => {
    try {
      const response = await axios.get("https://getuser-gxx3sm32mq-uc.a.run.app/");
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getAllData = async (date:string) => {
    try {
      const response = await axios.get("https://getalldata-gxx3sm32mq-uc.a.run.app", {params: {date}});
      console.log(response.data);

      //Load cell
      const sortedDataLC = sortDataByTime(response.data.load_cell);
      const volume = calculateWaterConsumption(sortedDataLC);
      setConsumption(volume);

      //Temperature
      const sortedData = sortDataByTime(response.data.temperature);  // Sort the data
      const sortedKeys = Object.keys(sortedData)
      const finalKey = sortedKeys[sortedKeys.length - 1];
      setTemp(sortedData[finalKey]);

      //Conductivity
      const transformedData = convertToConductivityArray(response.data.conductivity)
      setConductivity(transformedData);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fullDate = new Date();
    const torontoDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Toronto",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).format(fullDate);


    const fetchData = async () => {
      try {
        await Promise.all([
          getUserData(),
          getAllData(torontoDate),
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);

        const date = new Date();
        console.log(date);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader size={30} />;
  }

  return (
    
    <Stack className={classes.stack}>
      <Title order={2} className={classes.name}>
        Welcome, {user?.first_name || "Guest"}
      </Title>
      <SummaryCard
        title="Water Consumption"
        graph={
          <ProgressRing
            value={Math.min(100, (Math.round(((consumption/1000) / (user?.goal || 0)) * 100)))}
            size={220}
            thickness={12} 
          ></ProgressRing>
        }
        tooltipLabel="See your hydration progress at a glance! Here is today&apos;s goal, intake, and progress."
        cardStats={
          <Stack className={classes.consumptionStats}>
            <Badge
              variant="light"
              color="blue"
              className={classes.consumptionBadge}
            >
              Goal: {user?.goal} L/day
            </Badge>
            <Badge
              variant="light"
              color="rgba(39, 176, 167, 1)"
              className={classes.consumptionBadge}
            >
              You drank: {Math.round(consumption)} mL
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
            <TempQualBadge temperature={temp}></TempQualBadge>
            <Text className={classes.tempText}>
              High, Medium, and Low risk of bacterial growth
            </Text>
          </Stack>
        }
      ></SummaryCard>
      <ConductivitySummaryCard
        data={conductivity}
        tooltipLabel="Conductivity informs mineral content dictating hydration quality to ensure a healthy balance of minerals in your water"
      ></ConductivitySummaryCard>
      <div style={{ marginTop: "50px" }}></div>
    </Stack>
  );
}
