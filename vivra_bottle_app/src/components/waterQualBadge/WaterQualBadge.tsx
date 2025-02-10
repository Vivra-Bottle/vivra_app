import { FC } from "react";
import { Badge } from "@mantine/core";

export interface WaterQualBadgeProps {
  value: number;
}

// TODO figure out if i need a useState or how to capture change in data
export const WaterQualBadge: FC<WaterQualBadgeProps> = ({ value }) => {
  return (
    <Badge
      size="xl"
      variant="gradient"
      gradient={{ from: "blue", to: "cyan", deg: 90 }}
    >
      Gradient badge
    </Badge>
  );
};
