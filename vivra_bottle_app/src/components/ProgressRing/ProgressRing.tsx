import { FC } from "react";
import {
  Flex,
  Text,
  RingProgress as MantineRingProgress,
  Center,
  ActionIcon,
} from "@mantine/core";

export interface ProgressRingProps {
  value: number;
  size: number;
  thickness: number;
}

// TODO figure out if i need a useState or how to capture change in data
export const ProgressRing: FC<ProgressRingProps> = ({
  value,
  size,
  thickness,
}) => {
  return (
    <Flex>
      <MantineRingProgress
        label={
          value == 100 ? (
            <Center>
              <Text c="blue" fw={700} ta="center" size="xl">
                {value}
              </Text>
            </Center>
          ) : (
            <Center>
              <ActionIcon color="teal" variant="light" radius="xl">
                {/* <IconCheck size={22} /> */}
              </ActionIcon>
            </Center>
          )
        }
        roundCaps
        sections={[{ value: value, color: "blue" }]}
        size={size} // Set size to be 220
        thickness={thickness} // Set to 14
      ></MantineRingProgress>
    </Flex>
  );
};
