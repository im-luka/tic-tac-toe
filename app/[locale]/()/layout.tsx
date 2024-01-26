import type { ReactNode } from "react";
import { Box } from "@mantine/core";
import { Navbar } from "@/app/_components/navbar";
import { withPrivatePage } from "@/app/_hoc/with-private-page";

type Props = {
  children: ReactNode;
};

function HomeLayout({ children }: Props) {
  return (
    <Box w="100%">
      <Navbar />
      {children}
    </Box>
  );
}

export default withPrivatePage(HomeLayout);
