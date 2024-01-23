import type { ReactNode } from "react";
import { Box } from "@mantine/core";
import { Navbar } from "@/app/_components/navbar";

type Props = {
  children: ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <Box w="100%" style={{ border: "1px solid red" }}>
      <Navbar />
      {children}
    </Box>
  );
}
