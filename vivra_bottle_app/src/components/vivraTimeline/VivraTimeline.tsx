import { FC } from "react";
import { Timeline, Text } from "@mantine/core";

import classes from "./VivraTimeline.module.css";

export interface TimelineItem {
  title: string;
  description: string;
  date: string;
}

export interface TimelineProps {
  active: number;
  items: TimelineItem[];
}

export const VivraTimeline: FC<TimelineProps> = ({ active, items }) => {
  return (
    <div>
      <Timeline active={active} bulletSize={25}>
        {items.map((item, index) => (
          <Timeline.Item key={index} title={item.title}>
            <Text className={classes.description}>{item.description}</Text>
            <Text className={classes.date}>{item.date}</Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  );
};
