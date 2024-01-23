"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Center } from "@mantine/core";

export const HomeClient: FC = () => {
  const { data: games } = useQuery({
    queryKey: ["games/"],
  });
  console.log(games);

  return (
    <Center h="100%">
      <h1>Home Screen</h1>
    </Center>
  );
};
