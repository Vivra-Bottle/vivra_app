import { ProgressRing } from "@/components/progressRing/ProgressRing";
import { ActionIcon, Box } from "@mantine/core";

import classes from "./myProfile.module.css";

export default function MyProfile() {
  return (
    <Box className={classes.box} display="Flex">
      <p>Consumption</p>
      {/* TO DO work on this */}
      <ActionIcon
        size="auto"
        variant="default"
        aria-label="ActionIcon the same size as inputs"
      >
        Goal: 1.65 L/day
      </ActionIcon>
      <p>Goal: 1.65 L/day</p>
      <p>You drank: 1.1 L</p>
      <ProgressRing value={78} size={220} thickness={12}></ProgressRing>
    </Box>
  );
}
