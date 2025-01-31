"use client";
import { FC } from "react";

import {
  ActionIcon,
  Drawer as MantineDrawer,
  NavLink,
  ThemeIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

import classes from "./Drawer.module.css";

export interface HeaderProps {
  opened: boolean;
  close: () => void;
}

// TODO make the rest of the pages and add the navlinks and icons then test
// TODO fix loading page
export const Drawer: FC<HeaderProps> = ({ opened, close }) => {
  const { setColorScheme } = useMantineColorScheme();

  const colorMode = useComputedColorScheme("light");
  return (
    <MantineDrawer opened={opened} onClose={close} title="Options">
      <NavLink
        href="/"
        label="About us"
        rightSection={
          <ThemeIcon
            style={{
              backgroundColor: "transparent",
            }}
          >
            <img
              className={classes.chevron}
              style={{
                backgroundColor: "transparent",
                height: "12px",
                width: "12px",
              }}
              src={
                colorMode == "dark"
                  ? "/assets/icons/chevron-right-solid-dark.svg"
                  : "/assets/icons/chevron-right-solid-light.svg"
              }
            ></img>
          </ThemeIcon>
        }
      />
      <NavLink
        href="/my-profile"
        label="Summary"
        rightSection={
          <ThemeIcon
            style={{
              backgroundColor: "transparent",
            }}
          >
            <img
              className={classes.chevron}
              style={{
                backgroundColor: "transparent",
                height: "12px",
                width: "12px",
              }}
              src={
                colorMode == "dark"
                  ? "/assets/icons/chevron-right-solid-dark.svg"
                  : "/assets/icons/chevron-right-solid-light.svg"
              }
            ></img>
          </ThemeIcon>
        }
      />

      <NavLink href="/" label="History" />
      <NavLink
        href="/profile-settings"
        label="Profile Settings"
        // leftSection={<IconActivity size={16} stroke={1.5} />}
        // rightSection={
        //   <IconChevronRight
        //     size={12}
        //     stroke={1.5}
        //     className="mantine-rotate-rtl"
        //   />
        // }
      />
    </MantineDrawer>
  );
};
