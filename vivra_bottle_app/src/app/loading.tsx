import { Box, Skeleton as MantineSkeleton } from "@mantine/core";
import classes from "./page.module.css";

//TODO work on loading page
export default function Loading() {
  return (
    <Box className={classes.loading}>
      <MantineSkeleton mt={"80px"} height={50} circle mb="xl" />
      <MantineSkeleton height={8} radius="xl" />
      <MantineSkeleton height={8} mt={6} radius="xl" />
      <MantineSkeleton height={8} mt={6} width="70%" radius="xl" />
    </Box>
  );
}
