import { FC } from "react";
import { Badge, Button, Group } from "@mantine/core";
import { useToggle } from "@mantine/hooks";

export interface WaterQualBadgeProps {
  value: number;
  conductivityVal: number;
}

// TODO figure out if i need a useState or how to capture change in data
export const WaterQualBadge: FC<WaterQualBadgeProps> = ({
  value,
  conductivityVal,
}) => {
  const [display, toggle] = useToggle([
    `${value}%`,
    `${conductivityVal} μs/cm`,
  ]);
  return (
    <Group>
      <Badge
        size="xl"
        variant="gradient"
        gradient={
          value >= 85
            ? { from: "teal", to: "lime", deg: 59 }
            : value >= 65
            ? { from: "yellow", to: "rgba(255, 232, 56, 1)", deg: 168 }
            : {
                from: "rgba(255, 25, 25, 1)",
                to: "rgba(128, 61, 61, 1)",
                deg: 90,
              }
        }
      >
        {value >= 85 ? "Excellent" : value >= 65 ? "Good" : "Poor"}
      </Badge>
      {/* <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={
          value >= 85
            ? { from: "teal", to: "lime", deg: 59 }
            : value >= 65
            ? { from: "yellow", to: "rgba(255, 232, 56, 1)", deg: 168 }
            : {
                from: "rgba(255, 25, 25, 1)",
                to: "rgba(128, 61, 61, 1)",
                deg: 90,
              }
        }
      >
        {value}%
      </Text> */}
      <Button
        variant="light"
        color={value >= 85 ? "teal" : value >= 65 ? "orange" : "red"}
        onClick={() => toggle()}
      >
        {display}
      </Button>
    </Group>
  );
};
