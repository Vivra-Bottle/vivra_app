import { Card, Group, Text, Stack } from "@mantine/core";
import classes from "./SummaryCard.module.css";
import { FC } from "react";

interface SummaryCardProps {
  graph: React.ReactNode;
  title: string;
  cardStats: React.ReactNode;
}

export const SummaryCard: FC<SummaryCardProps> = ({
  graph,
  title,
  cardStats,
}) => {
  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Group className={classes.inner}>
        <Stack className={classes.stats}>
          <Text fz="xl" className={classes.label}>
            {title}
          </Text>
          <div className={classes.cardStats}>{cardStats}</div>
        </Stack>
        <div className={classes.graph}>{graph}</div>
        <div className={classes.cardStatPhone}>{cardStats}</div>
      </Group>
    </Card>
  );
};
