"use client";

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import {
  DEFAULT_THEME,
  LoadingOverlay,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Track if components are mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Allow the app to mount once the theme is loaded
  }, []);

  // Only render the app after the theme is loaded
  // TODO may not need all this
  if (!mounted)
    return (
      <html {...mantineHtmlProps}>
        <head />
        <body>
          <MantineProvider theme={DEFAULT_THEME} defaultColorScheme="light">
            <LoadingOverlay />
          </MantineProvider>
        </body>
      </html>
    );

  return (
    <html {...mantineHtmlProps}>
      <head />
      <body>
        <MantineProvider theme={DEFAULT_THEME} defaultColorScheme="light">
          <Header />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
