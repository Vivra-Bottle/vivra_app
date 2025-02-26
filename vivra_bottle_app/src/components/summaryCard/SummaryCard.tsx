import {
  Card,
  Group,
  Text,
  Stack,
  Tooltip,
  ActionIcon,
  Image,
} from "@mantine/core";
import classes from "./SummaryCard.module.css";
import { FC } from "react";

interface SummaryCardProps {
  graph: React.ReactNode;
  title: string;
  cardStats: React.ReactNode;
  tooltipLabel: string;
}

export const SummaryCard: FC<SummaryCardProps> = ({
  graph,
  title,
  cardStats,
  tooltipLabel,
}) => {
  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Group className={classes.inner}>
        <Stack className={classes.stats}>
          <Group className={classes.tooltipGroup}>
            <Text fz="xl" className={classes.label}>
              {title}
            </Text>
            <Tooltip
              className={classes.tooltip}
              events={{ hover: true, focus: true, touch: true }}
              multiline
              w={220}
              withArrow
              transitionProps={{ duration: 200 }}
              label={tooltipLabel}
              position="bottom"
            >
              <ActionIcon
                className={classes.tooltip}
                variant="transparent"
                title={title + "Info"}
              >
                <Image
                  alt="info icon"
                  className={classes.color_icon}
                  src="/assets/icons/info-circle.svg"
                  height={22}
                  width={22}
                />
              </ActionIcon>
            </Tooltip>
          </Group>
          <div className={classes.cardStats}>{cardStats}</div>
        </Stack>
        <div className={classes.graph}>{graph}</div>
        <div className={classes.cardStatPhone}>{cardStats}</div>
      </Group>
    </Card>
  );
};
