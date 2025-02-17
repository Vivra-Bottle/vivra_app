"use client";
import {
  Stack,
  Image,
  Text,
  Title,
  //Timeline
} from "@mantine/core";
import classes from "./aboutUs.module.css";
import { VivraTimeline } from "@/components/vivraTimeline/VivraTimeline";

const vivraTimelineItems = [
  { title: "Title 1", description: "Add text here", date: "January 2024" },
  { title: "Title 2", description: "Add text here", date: "January 2024" },
  { title: "Title 3", description: "Add text here", date: "January 2024" },
];

export default function AboutUs() {
  return (
    <Stack display="Flex" mt={59} mb={59}>
      <Image
        alt="Water Bottle Picture"
        src="/assets/pictures/water-bottle.jpg"
      ></Image>
      <Stack className={classes.about}>
        <Title order={2}>About us</Title>
        <Text>
          Vivra was born from a mutual concern over water quality and hydration
          levels in everyday life. We are a team of driven and innovative
          4th-year students from the University of Waterloo&apos;s Faculty of
          Nanotechnology Engineering, collectively bringing eight years of
          industry experience.
        </Text>
        <Text>
          Our mission is to promote health and well-being through proper
          hydration practices, addressing both water quality and consumption. We
          are currently designing and fabricating a smart water bottle that
          leverages advanced sensor technology—down to the nanoscale—to monitor
          both water quality and consumption.
        </Text>
        <Text>
          From the city with &quot;water&quot; in its name, we&apos;re leading
          the way in smarter, safer hydration.
        </Text>
      </Stack>
      <Stack className={classes.founders}>
        <Title order={2}>Founders</Title>
        <Image
          radius="md"
          alt="Team picture"
          src="/assets/pictures/team-picture.jpg"
        ></Image>
      </Stack>
      <Stack className={classes.story}>
        <Title order={2}>Vivra&apos;s Story</Title>
        <VivraTimeline active={1} items={vivraTimelineItems}></VivraTimeline>
      </Stack>
    </Stack>
  );
}
