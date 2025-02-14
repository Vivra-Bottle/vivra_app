"use client";
import { FC } from "react";

import { Drawer as MantineDrawer, NavLink } from "@mantine/core";

export interface HeaderProps {
  opened: boolean;
  close: () => void;
}
// TODO, delete Drawer.module.css if not being used
// Does it look weird on the page with the proportions? Add icon or something?
// Fix color scheme why does it break? Maybe cause 404 ERROR?
export const Drawer: FC<HeaderProps> = ({ opened, close }) => {
  return (
    <MantineDrawer opened={opened} onClose={close} title="Options">
      <NavLink href="/" label="Summary" />
      <NavLink href="/my-history" label="History" />
      <NavLink href="/about-us" label="About us" />
    </MantineDrawer>
  );
};
