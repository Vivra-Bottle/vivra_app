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

//Consumption data
const consumptionData = [
  { day: "Monday", consumption: 1.5, dayabbrev: "M" },
  { day: "Tuesday", consumption: 2.2, dayabbrev: "T" },
  { day: "Wednesday", consumption: 1.8, dayabbrev: "W" },
  { day: "Thursday", consumption: 2.5, dayabbrev: "T" },
  { day: "Friday", consumption: 3.0, dayabbrev: "F" },
  { day: "Saturday", consumption: 2.7, dayabbrev: "S" },
  { day: "Sunday", consumption: 1.9, dayabbrev: "S" },
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
        goal={goal}
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
