import { FC } from "react";
import {
  Flex,
  Text,
  RingProgress as MantineRingProgress,
  Center,
  ActionIcon,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

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
              <ActionIcon color="teal" radius="100px" size={"90px"}>
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    fontSize: "50px", // Adjust size as needed
                    fontWeight: "10",
                    background: "#12b886",
                    color: "#c3fae8",
                  }}
                ></FontAwesomeIcon>
              </ActionIcon>
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
