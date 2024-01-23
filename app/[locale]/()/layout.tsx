import { Box } from "@mantine/core";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <Box w="100%" style={{ border: "1px solid red" }}>
      {children}
    </Box>
  );
}
