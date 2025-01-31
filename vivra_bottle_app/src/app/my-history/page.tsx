import { ProgressRing } from "@/components/progressRing/ProgressRing";
import { Box } from "@mantine/core";
import classes from "./myHistory.module.css";

// Use module styling
export default function MyHistory() {
  return (
    <Box className={classes.box} display="Flex">
      <p>Replace progress Ring with chart component</p>
      <ProgressRing value={67} size={220} thickness={12}></ProgressRing>
    </Box>
  );
}
