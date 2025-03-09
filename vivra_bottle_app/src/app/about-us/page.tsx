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
          Most people don&apos;t drink enough water. According to the World Health
          Organization (WHO), inadequate hydration can lead to fatigue, reduced
          cognitive function, and long-term health risks. At the same time,
          water quality concerns stop many from drinking as much as they should.
        </Text>
        <Text>
          Vivra was founded to solve both problems with the first-ever smart
          water bottle that tracks both how much you drink and how safe your
          water is. Our team—Nanotechnology Engineering students from the
          University of Waterloo—has developed a bottle that integrates
          precision sensors with intelligent tracking.
        </Text>
        <Text>
          A load cell accurately measures water consumption, while a
          custom-built conductivity sensor evaluates water purity. No other
          product on the market combines real-time hydration tracking with water
          quality assessment in a single, user-friendly system. Through our
          intuitive digital interface, users gain personalized insights that
          empower them to stay properly hydrated and make informed decisions
          about their water. By blending cutting-edge technology with everyday
          wellness, Vivra is redefining hydration—smarter, safer, and
          personalized to your needs.
        </Text>
        <Text>
          From the city with &quot;water&quot; in its name, we are committed to making
          every sip count.
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
