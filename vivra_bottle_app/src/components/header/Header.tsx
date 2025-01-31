"use client";
import { FC } from "react";

import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  Burger,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

import classes from "./Header.module.css";
import { Drawer } from "../drawer/Drawer";

export const Header: FC = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { setColorScheme } = useMantineColorScheme();

  const colorMode = useComputedColorScheme("light");

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Burger
          className={classes.burger}
          opened={opened}
          onClick={toggle}
          size="sm"
          hiddenFrom="sm"
        />
        <Drawer opened={opened} close={close}></Drawer>
        <img
          className={classes.vivra_icon}
          src={
            colorMode == "dark"
              ? "/assets/icons/vivra-dark.svg"
              : "/assets/icons/vivra-light.svg"
          }
        ></img>
        <ActionIcon
          className={classes.action_icon}
          variant="outline"
          color={colorMode == "dark" ? "yellow" : "dark.7"}
          title="Color Scheme Toggle"
          onClick={() =>
            setColorScheme(colorMode === "light" ? "dark" : "light")
          }
        >
          <img
            className={classes.color_icon}
            src={
              colorMode == "dark"
                ? "/assets/icons/sun-icon.svg"
                : "/assets/icons/moon-solid.svg"
            }
          />
        </ActionIcon>
      </div>
    </header>
  );
};
