"use client";
import { Stack, Image, Text, Title } from "@mantine/core";
import classes from "./aboutUs.module.css";
import { VivraTimeline } from "@/components/vivraTimeline/VivraTimeline";

const vivraTimelineItems = [
  {
    title: "Team Formation & Role Assignment",
    description:
      "Team members agreed to form a team with a diverse skill set, each member communicated their goals and expectations, and roles were defined based on expertise. Task management tools and communication channels were established.",
    date: "August 2023",
  },
  {
    title: "Ideation & Proposal",
    description:
      "Identified the problem, defined the project obvjectives, and drafted the formal proposal. Signed Dr. Saad as the team's consultant.",
    date: "September 2023",
  },
  {
    title: "Literature Review",
    description:
      "Conduct a comprehensive review of existing research, technologies, and the market for our problem space.",
    date: "January 2024",
  },
  {
    title: "Concept Development & Feasibility Assessment",
    description:
      "Performed Feasibility analysis based on budget, timeline, and technical constrainst, defined system architecture and key components, developed initial design and finalized project roadmap and milestones. Project scope was adjusted accordingly",
    date: "September 2024",
  },
  {
    title: "Simulations For Design Validation",
    description:
      "Used COMSOL multiphysics to model the consuctivity sensor to optomize geometry and dimensions. Simulations were used to validate temperature and conductivity ranges.",
    date: "October 2024",
  },
  {
    title: "Electrical Design & Firmware Prototyping Begins",
    description:
      "Develop first round of circuit schematics and PCB layouts, and writing initial firmware for sensor integration and data processing.",
    date: "November 2024",
  },
  {
    title: "Conductivity Sensor Fabrication",
    description:
      "Fabricated the conductivity sensor with some steps completed by the  Quantum-Nano Fabrication and Characterization Facility (QNFCF).",
    date: "November 2024",
  },
  {
    title: "Software App Development Begins",
    description:
      "Develop user interface and backend architecture, and established bluetooth communication between hardware and software.",
    date: "January 2025",
  },
  {
    title: "Mechanical Design",
    description:
      "Designed the physical structure of the water bottle for sensor housing and durability and ensured waterproofing and structural integrity for long-term use.",
    date: "Februry 2025",
  },
  {
    title: "Testing and Validation",
    description:
      "Conduct detailed performance testing on hardware and software integration, address technical challenges, and refined design.",
    date: "Februry 2025",
  },
  {
    title: "Seminar & Symposium",
    description:
      "Present final design and working prototype to faculty and members of the public at the nano-symposium and seminar",
    date: "March 2025",
  },
  {
    title: "Grad Toast",
    description:
      "Grad toast to celebrate capstone achievement and appreciate the Nanotechnology Engineering undergraduate journey.",
    date: "April 2025",
  },
];

export default function AboutUs() {
  return (
    <Stack display="Flex" mt={59} mb={59}>
      <Stack className={classes.founders}>
        <Title order={2}>Meet the Founders</Title>
        <Image
          radius="md"
          alt="Team picture"
          src="/assets/pictures/team-picture.jpg"
        ></Image>
      </Stack>
      <Stack className={classes.about}>
        <Title order={2}>About us</Title>
        <Text>
          Most people don&apos;t drink enough water. According to the World
          Health Organization (WHO), inadequate hydration can lead to fatigue,
          reduced cognitive function, and long-term health risks. At the same
          time, water quality concerns stop many from drinking as much as they
          should.
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
          From the city with &quot;water&quot; in its name, we are committed to
          making every sip count.
        </Text>
      </Stack>
      <Stack className={classes.story}>
        <Title order={2}>Vivra&apos;s Story</Title>
        <VivraTimeline active={10} items={vivraTimelineItems}></VivraTimeline>
      </Stack>
    </Stack>
  );
}
