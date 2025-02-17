import { FC } from "react";
import { Badge } from "@mantine/core";
import classes from "./TempQualBadge.module.css";

export interface WaterQualBadgeProps {
  temperature: number;
}

// TODO Change temp ranges
export const TempQualBadge: FC<WaterQualBadgeProps> = ({ temperature }) => {
  return (
    <Badge
      className={classes.tempBadge}
      size="xl"
      variant="gradient"
      gradient={
        temperature <= 20
          ? { from: "teal", to: "lime", deg: 59 }
          : temperature <= 25
          ? { from: "yellow", to: "rgba(255, 232, 56, 1)", deg: 168 }
          : {
              from: "rgba(255, 25, 25, 1)",
              to: "rgba(128, 61, 61, 1)",
              deg: 90,
            }
      }
    >
      {temperature <= 20 ? "Low" : temperature <= 25 ? "Medium" : "High"}
    </Badge>
  );
};
