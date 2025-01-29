import { FC } from "react";
import {
  Flex,
  Text,
  RingProgress as MantineRingProgress,
  Center,
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
  ...props
}) => {
  return (
    <Flex>
      <MantineRingProgress
        style={{ ...props }}
        label={
          value == 100 ? (
            <Center>
              <img
                src="/assets/icons/circle-check-solid.svg"
                style={{
                  borderRadius: "50%",
                  blockSize: "90px",
                  fontSize: "50px",
                  fontWeight: "10",
                  background: "#12b886",
                  border: "2px solid #12b886",
                }}
              ></img>
            </Center>
          ) : (
            <Center>
              <Text c="blue" fw={700} ta="center" size={"40px"}>
                {value}%
              </Text>
            </Center>
          )
        }
        roundCaps
        sections={[{ value: value, color: value == 100 ? "teal" : "blue" }]}
        size={size} // Set size to be 220
        thickness={thickness} // Set to 14
      ></MantineRingProgress>
    </Flex>
  );
};
