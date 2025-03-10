"use client";
import {
  Stack,
  Title,
  Badge,
  Group,
  Tooltip,
  ActionIcon,
  Image,
} from "@mantine/core";
import classes from "./myHistory.module.css";
import { ConsumptionHistoryCard } from "@/components/consumptionHistoryCard/ConsumptionHistoryCard";
import { ConductivityHistoryCard } from "@/components/conductivityHistoryCard/ConductivityHistoryCard";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  gender: string;
  weight: number;
  goal: number;
  age: number;
  activity: number;
  first_name: string;
  last_name: string;
}

interface ConductivityItem {
  time: string; // The time in 12-hour AM/PM format
  conductivity: number; // The conductivity value
}


//Consumption data
const consumptionData = [
  { day: "may 5th", consumption: 1.5, dayabbrev: "M"},
  { day: "Tuesday", consumption: 2.2, dayabbrev: "M"},
  { day: "Wednesday", consumption: 1.8, dayabbrev: "M"},
  { day: "Thursday", consumption: 2.5, dayabbrev: "M"},
  { day: "Friday", consumption: 3.0, dayabbrev: "M"},
  { day: "Saturday", consumption: 2.7, dayabbrev: "M"},
  { day: "Sunday", consumption: 1.9, dayabbrev: "M"},
];

const averageConsumption =
  consumptionData.reduce((sum, entry) => sum + entry.consumption, 0) /
  consumptionData.length;

const goal = 2.0; // Example daily goal in liters
const age = 23; //TODO change
const heightInCM = 176;
const weightInKG = 176;
const gender = "male";

const hydrationMale =
  2.447 - 0.09156 * age + 0.1074 * heightInCM + 0.3362 * weightInKG;
const hydrationFemale = -2.097 + 0.1069 * heightInCM + 0.2466 * weightInKG;

//Conductivity data
const conductivityData = [
  { day: "Monday", dayabbrev: "Mon", conductivity: 750 },
  { day: "Tuesday", dayabbrev: "Tue", conductivity: 820 },
  { day: "Wednesday", dayabbrev: "Wed", conductivity: 900 },
  { day: "Thursday", dayabbrev: "Thu", conductivity: 1100 },
  { day: "Friday", dayabbrev: "Fri", conductivity: 950 },
  { day: "Saturday", dayabbrev: "Sat", conductivity: 1020 },
  { day: "Sunday", dayabbrev: "Sun", conductivity: 870 },
];

interface ConductivityData {
  [time: string]: number; // The key is a time in 24-hour format and the value is a conductivity number
}

interface ConductivityItem {
  time: string; // The time in 12-hour AM/PM format
  conductivity: number; // The conductivity value
}

const averageConductivity =
  conductivityData.reduce((sum, item) => sum + item.conductivity, 0) /
  conductivityData.length;

const hydrationScoreMale = Math.round(
  (averageConsumption * 100) / hydrationMale
);
const hydrationScoreFemale = Math.round(
  (averageConsumption * 100) / hydrationFemale
);

export default function MyHistory() {
  const [user, setUser] = useState<User | null>(null);
  const [consumption, setConsumption] = useState<{day: string; consumption: number; dayabbrev: string; }[]>([]);
  const [averageConsumption, setAverageConsumption] = useState(0);

  const [conductivity, setConductivity] = useState<ConductivityItem[]>([]);
  const [averageConductivity, setAverageConductivity] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const getUserData = async () => {
    try {
      const response = await axios.get("https://getuser-gxx3sm32mq-uc.a.run.app/");
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getDayAbbreviation = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" })[0];
  };

  const getFormattedDate = (dateString: string): string => {
    const date = new Date(dateString);
  
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();
  
    // Function to add ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (num: number): string => {
      if (num >= 11 && num <= 13) return `${num}th`; // Special case for 11-13
      const lastDigit = num % 10;
      if (lastDigit === 1) return `${num}st`;
      if (lastDigit === 2) return `${num}nd`;
      if (lastDigit === 3) return `${num}rd`;
      return `${num}th`;
    };
  
    return `${month} ${getOrdinalSuffix(day)}`;
  };

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

  const getDayConsumptionData = async (date: string) => {
    try {
      console.log("date: ");
      console.log(date);

      const response = await axios.get("https://getdayloadcell-gxx3sm32mq-uc.a.run.app", { params: { date }});
      const sortedData = sortDataByTime(response.data);
      const formattedDate = getFormattedDate(date);
      const volume = calculateWaterConsumption(sortedData)/1000;
      const dateAbbrev = getDayAbbreviation(date);
      const data = {day: formattedDate, consumption: volume, dayabbrev: dateAbbrev};

      // console.log("consumption: ");
      // console.log(data);

      const updatedConsumption = [...consumption, data];
      setConsumption(updatedConsumption);

      // console.log("updated consumption: ");
      // console.log(consumption);

    } catch (err) {
      console.error(err);
    }
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
  const getDayConductivityData = async (date: string) => {
    try {
      const response = await axios.get("https://getdayconductivity-gxx3sm32mq-uc.a.run.app", { params: { date }});
      const transformedData = convertToConductivityArray(response.data)
      setConductivity(transformedData);
    } catch (err) {
      console.error(err);
    }
  };

  const getLast7Days = (): string[] => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Format the date to YYYY-MM-DD in Toronto's timezone
      const formattedDate = date.toLocaleDateString('en-CA', {
        timeZone: 'America/Toronto', // Set the timezone to Toronto
      });
      
      const [year, month, day] = formattedDate.split('-');
      dates.push(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD
    }
    return dates;
  };

  useEffect(() => {
    getUserData();

    const fetchLast7Days = async () => {
      const last7Days = getLast7Days();
      for (const date of last7Days) {
        await getDayConsumptionData(date);
        await getDayConductivityData(date);
        // getDayConsumptionData("2025-03-09");
      }
    };

    fetchLast7Days();
    console.log('i fire once');
  }, []);


  return (
    <Stack className={classes.stack}>
      <Group className={classes.tooltipGroup}>
        <Title order={2} className={classes.hydrationTitle}>
          Hydration Score
        </Title>
        <Tooltip
          className={classes.tooltip}
          multiline
          w={220}
          withArrow
          transitionProps={{ duration: 200 }}
          label="View your hydration score, calculated based on factors like age, gender, weight, height, and water intake."
          position="bottom"
          events={{ hover: true, focus: true, touch: true }}
        >
          <ActionIcon
            className={classes.tooltip}
            variant="transparent"
            title="Hydration Score Info"
          >
            <Image
              alt="info icon"
              className={classes.color_icon}
              src="/assets/icons/info-circle.svg"
              height={24}
              width={24}
            />
          </ActionIcon>
        </Tooltip>
      </Group>
      <Badge
        className={classes.hydrationScoreBadge}
        styles={{ label: { overflow: "visible" } }}
      >
        {gender == "male" ? hydrationScoreMale : hydrationScoreFemale}%
      </Badge>
      <Title order={2} className={classes.weeklyHistTitle}>
        Last 7-days:
      </Title>
      <ConsumptionHistoryCard
        average={averageConsumption}
        data={consumptionData}
        goal={user?.goal || 1.5}
        toolTipLabel="Track your water consumption throughout the week and stay on top of your hydration goals."
      ></ConsumptionHistoryCard>
      <ConductivityHistoryCard
        average={averageConductivity}
        data={conductivityData}
        toolTipLabel="Monitor water conductivity throughout the week to track changes and ensure water quality."
      ></ConductivityHistoryCard>
      <div style={{ height: "200px" }}></div>
    </Stack>
  );
}
