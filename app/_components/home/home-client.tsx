"use client";

import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Group, Stack } from "@mantine/core";
import {
  gamesQuery,
  gamesQuerySearchParams,
} from "@/domain/queries/games-query";
import { GameList } from "@/types/game-list";
import { GamesTable } from "../games/games-table";
import { IconPlus } from "@tabler/icons-react";
import { GAMES_PER_PAGE_DEFAULT_OPTION } from "@/util/constants";
import { GamesPagination } from "../games/games-pagination";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export const HomeClient: FC = () => {
  const { t, results, total } = useHomeClient();

  return (
    <Stack p="md">
      <Group justify="space-between">
        <Button variant="outline" leftSection={<IconPlus size={20} />}>
          {t("newAction")}
        </Button>
        <GamesPagination total={total} />
      </Group>
      <GamesTable results={results} />
    </Stack>
  );
};

function useHomeClient() {
  const t = useTranslations("home");
  const searchParams = useSearchParams();
  const limit =
    searchParams.get(gamesQuerySearchParams.limit) ??
    GAMES_PER_PAGE_DEFAULT_OPTION;
  const offset = searchParams.get(gamesQuerySearchParams.offset) ?? undefined;

  const { data: games } = useQuery<GameList>({
    queryKey: gamesQuery.key({ limit, offset }),
  });

  return {
    t,
    results: games?.results ?? [],
    total: Math.ceil((games?.count ?? 1) / +limit),
  };
}
