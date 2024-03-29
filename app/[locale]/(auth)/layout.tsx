import type { ReactNode } from "react";
import { Center } from "@mantine/core";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return <Center w="100%">{children}</Center>;
}
