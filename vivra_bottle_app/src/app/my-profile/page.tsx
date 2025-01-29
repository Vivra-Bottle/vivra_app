// Fix by importing div/other components from react or matine

import { ProgressRing } from "@/components/progressRing/ProgressRing";
import { Box, Grid } from "@mantine/core";

export default function MyProfile() {
  return (
    <Box
      display="Flex"
      style={{
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "59px",
      }}
    >
      <p>hi, how are you</p>
      <ProgressRing value={67} size={220} thickness={12}></ProgressRing>
    </Box>
  );
}
