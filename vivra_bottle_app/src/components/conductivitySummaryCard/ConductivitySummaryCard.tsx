"use-client";
import {
  Card,
  Text,
  Stack,
  Badge,
  Group,
  Tooltip,
  ActionIcon,
  Image,
} from "@mantine/core";
import classes from "./ConductivitySummaryCard.module.css";
import { FC } from "react";
import { ConductivityLineChart } from "../conductivityLineChart/ConductivityLineChart";

interface ConductivitySummaryCardProps {
  data: { time: string; conductivity: number | undefined }[];
  tooltipLabel: string;
}

export const ConductivitySummaryCard: FC<ConductivitySummaryCardProps> = ({
  data,
  tooltipLabel,
}) => {
  const lastestConductivity = data.at(-1)?.conductivity ?? "undefined";

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Stack className={classes.inner}>
        <Group className={classes.tooltipGroup}>
          <Text fz="xl" className={classes.label}>
            Conductivity
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
              title="Conductivity Info"
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
        <Group className={classes.stats}>
          <Badge
            className={classes.conductivityBadge}
            size="xl"
            variant="gradient"
            gradient={
              lastestConductivity == "undefined"
                ? { from: "grey", to: "grey", deg: 59 }
                : lastestConductivity <= 800
                ? { from: "teal", to: "lime", deg: 59 }
                : lastestConductivity <= 1000
                ? { from: "yellow", to: "rgba(255, 232, 56, 1)", deg: 168 }
                : {
                    from: "rgba(255, 25, 25, 1)",
                    to: "rgba(128, 61, 61, 1)",
                    deg: 90,
                  }
            }
          >
            {lastestConductivity == "undefined"
              ? "undefined"
              : lastestConductivity <= 800
              ? "Excellent"
              : lastestConductivity <= 1000
              ? "Caution"
              : "Poor"}
          </Badge>

          <Badge
            variant="outline"
            color={"rgba(39, 176, 167, 1)"}
            className={classes.conductivityBadge}
          >
            {lastestConductivity}{" "}
            <span style={{ textTransform: "none" }}>µ</span>S/
            <span style={{ textTransform: "none" }}>cm</span>
          </Badge>
        </Group>
        <ConductivityLineChart data={data}></ConductivityLineChart>
      </Stack>
    </Card>
  );
};
