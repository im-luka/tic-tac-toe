"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "@mantine/core";
import { gamesQuery } from "@/domain/queries/games-query";
import { GameList } from "@/types/game-list";
import { GamesTable } from "../games/games-table";

export const HomeClient: FC = () => {
  const { results } = useHomeClient();

  return (
    <Stack p="md">
      <GamesTable results={results} />
    </Stack>
  );
};

function useHomeClient() {
  const { data: games } = useQuery<GameList>({
    queryKey: gamesQuery.key,
  });

  return {
    results: games?.results ?? [],
  };
}
