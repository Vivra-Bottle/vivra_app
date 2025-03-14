"use client";
import {
  Stack,
  Title,
  Badge,
  Group,
  Tooltip,
  ActionIcon,
  Image,
  Loader
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

//Consumption data
interface ConsumptionItem {
  day: string;
  dayabbrev: string;
  consumption: number;
}

interface ConductivityItem {
  day: string;
  dayabbrev: string;
  conductivity: number;
}

const monthMap: { [key: string]: string } = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

let consumptionData: ConsumptionItem[] = [];
let averageConsumptionval = 0;

const age = 23; //TODO change
const heightInCM = 176;
const weightInKG = 176;
const gender = "male";

const hydrationMale = 2.447 - 0.09156 * age + 0.1074 * heightInCM + 0.3362 * weightInKG;
const hydrationFemale = -2.097 + 0.1069 * heightInCM + 0.2466 * weightInKG;

//Conductivity data
let conductivityData: ConductivityItem[] = [];
let averageConductivityval = 0;

const hydrationScoreMale = Math.round((averageConsumptionval/7 * 100) / hydrationMale);
const hydrationScoreFemale =  Math.round((averageConsumptionval/7 * 100) / hydrationFemale);

export default function MyHistory() {
  const [user, setUser] = useState<User | null>(null);
  const [consumption, setConsumption] = useState<{day: string; consumption: number; dayabbrev: string; }[]>([]);
  const [averageConsumption, setAverageConsumption] = useState(0);

  const [conductivity, setConductivity] = useState<{day: string; conductivity: number; dayabbrev: string; }[]>([]);
  const [averageConductivity, setAverageConductivity] = useState(0);
  const [hydrationScore, setHydrationScore] = useState(0);
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
    const [year, month, day] = dateString.split("-");
    const monthString = monthMap[month];

    // Function to add ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (num: number): string => {
      if (num >= 11 && num <= 13) return `${num}th`; // Special case for 11-13
      const lastDigit = num % 10;
      if (lastDigit === 1) return `${num}st`;
      if (lastDigit === 2) return `${num}nd`;
      if (lastDigit === 3) return `${num}rd`;
      return `${num}th`;
    };
  
    return `${monthString} ${getOrdinalSuffix(Number(day))}`;
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
      const response = await axios.get("https://getdayloadcell-gxx3sm32mq-uc.a.run.app", { params: { date }});
      const sortedData = sortDataByTime(response.data);
      const formattedDate = getFormattedDate(date);
      const volume = calculateWaterConsumption(sortedData)/1000;
      const dateAbbrev = getDayAbbreviation(date);
      const data = {day: formattedDate, consumption: volume, dayabbrev: dateAbbrev};

      consumptionData = [data, ...consumptionData];
      averageConsumptionval = averageConsumption + data.consumption;

    } catch (err) {
      console.error(err);
    }
  };
  
  const getAverageConductivity = (data: {string:number}) => {
    let conductivity = 0;
    const values = Object.values(data);

    for (let i = 0; i < values.length; i++) {
      conductivity += values[i];
    }

    return (conductivity/values.length);
  }

  const getDayConductivityData = async (date: string) => {
    try {
      const response = await axios.get("https://getdayconductivity-gxx3sm32mq-uc.a.run.app", { params: { date }});

      const formattedDate = getFormattedDate(date);
      const dateAbbrev = getDayAbbreviation(date);
      const conductivity = getAverageConductivity(response.data);
      const data = {day: formattedDate, dayabbrev: dateAbbrev, conductivity: conductivity};

      conductivityData = [data, ...conductivityData];
      averageConductivityval = averageConductivityval + data.conductivity;
    } catch (err) {
      console.error(err);
    }
  };

  const getLast7Days = (): string[] => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const formattedDate = date.toLocaleDateString('en-CA', {
        timeZone: 'America/Toronto',
      });
      
      const [year, month, day] = formattedDate.split('-');
      dates.push(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD
    }
    return dates;
  };

  const fetchLast7Days = async () => {
    const last7Days = getLast7Days();
    for (const date of last7Days) {
      await getDayConsumptionData(date);
      await getDayConductivityData(date);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getUserData(),
          fetchLast7Days()
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);

        setConsumption(consumptionData);
        setAverageConsumption(averageConsumptionval);
        
        setConductivity(conductivityData);
        setAverageConductivity(averageConductivityval/7);
        setHydrationScore(Math.round(hydrationMale))
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <Loader size={30} />;
  }

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
        {hydrationScore}%
      </Badge>
      <Title order={2} className={classes.weeklyHistTitle}>
        Last 7-days:
      </Title>
      <ConsumptionHistoryCard
        average={averageConsumption}
        data={consumption}
        goal={user?.goal || 1.5}
        toolTipLabel="Track your water consumption throughout the week and stay on top of your hydration goals."
      ></ConsumptionHistoryCard>
      <ConductivityHistoryCard
        average={averageConductivity}
        data={conductivity}
        toolTipLabel="Monitor water conductivity throughout the week to track changes and ensure water quality."
      ></ConductivityHistoryCard>
      <div style={{ height: "200px" }}></div>
    </Stack>
  );
}
