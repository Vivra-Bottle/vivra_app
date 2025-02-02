import { Box, Skeleton as MantineSkeleton } from "@mantine/core";

//TODO work on loading page
export default function Loading() {
  return (
    <Box mr={"10%"} ml={"10%"}>
      <MantineSkeleton mt={"80px"} height={50} circle mb="xl" />
      <MantineSkeleton height={8} radius="xl" />
      <MantineSkeleton height={8} mt={6} radius="xl" />
      <MantineSkeleton height={8} mt={6} width="70%" radius="xl" />
    </Box>
  );
}
