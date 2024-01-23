"use client";

import { FC, ReactNode } from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/styles/global.scss";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";
import { components } from "./components";
import { other, resolver } from "./other";

type Props = {
  children: ReactNode;
};

const theme = createTheme({
  ...colors,
  ...typography,
  spacing,
  components,
  other,
});

export const ThemeProvider: FC<Props> = ({ children }) => {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={resolver}
      defaultColorScheme="dark"
    >
      <Notifications
        position="top-right"
        limit={5}
        containerWidth={300}
        transitionDuration={500}
      />
      {children}
    </MantineProvider>
  );
};
