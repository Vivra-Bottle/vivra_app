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
        temperature <= 20 || temperature >= 65
          ? "lime"
          : temperature <= 45
          ? "red.9"
          : "yellow"
      }
    >
      {temperature <= 20 || temperature >= 65
        ? "Low"
        : temperature <= 45
        ? "High"
        : "Medium"}
    </Badge>
  );
};
