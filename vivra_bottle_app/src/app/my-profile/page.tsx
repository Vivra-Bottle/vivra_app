import { ProgressRing } from "@/components/progressRing/ProgressRing";
import { Box } from "@mantine/core";

import classes from "./myProfile.module.css";

export default function MyProfile() {
  return (
    <Box className={classes.box} display="Flex">
      <p>hi, how are you</p>
      <ProgressRing value={67} size={220} thickness={12}></ProgressRing>
    </Box>
  );
}
