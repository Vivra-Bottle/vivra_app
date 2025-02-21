import { FC } from "react";
import { Badge } from "@mantine/core";
import classes from "./TempQualBadge.module.css";

export interface TempBadgeProps {
  temperature: number;
}

// TODO Change temp ranges
export const TempQualBadge: FC<TempBadgeProps> = ({ temperature }) => {
  return (
    <Badge
      className={classes.tempBadge}
      size="xl"
      variant="filled"
      color={
        temperature <= 20 ? "lime" : temperature <= 25 ? "yellow" : "red.9"
      }
    >
      {temperature <= 20 ? "Low" : temperature <= 25 ? "Medium" : "High"}
    </Badge>
  );
};
