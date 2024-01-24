"use client";

import { FC } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Group, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import {
  gamesQuery,
  gamesQuerySearchParams,
} from "@/domain/queries/games-query";
import { GameList } from "@/types/game-list";
import { GamesTable } from "../games/games-table";
import { GAMES_PER_PAGE_DEFAULT_OPTION } from "@/util/constants";
import { GamesPagination } from "../games/games-pagination";
import { createGameMutation } from "@/domain/mutations/create-game-mutation";
import { useNotificationSuccess } from "@/hooks/use-notification-success";

export const HomeClient: FC = () => {
  const { t, results, total, isCreatingGame, handleCreateGame } =
    useHomeClient();

  return (
    <Stack p="md">
      <Group justify="space-between">
        <Button
          variant="outline"
          leftSection={<IconPlus size={20} />}
          loading={isCreatingGame}
          onClick={handleCreateGame}
        >
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
  const onSuccess = useNotificationSuccess("createGame");

  const searchParams = useSearchParams();
  const limit =
    searchParams.get(gamesQuerySearchParams.limit) ??
    GAMES_PER_PAGE_DEFAULT_OPTION;
  const offset = searchParams.get(gamesQuerySearchParams.offset) ?? undefined;

  const { data: games, refetch: refetchGames } = useQuery<GameList>({
    queryKey: gamesQuery.key({ limit, offset }),
  });

  const { mutateAsync: createGame, isPending: isCreatingGame } = useMutation({
    mutationFn: createGameMutation.fnc,
    onSuccess: async () => {
      await refetchGames();
      onSuccess();
    },
  });

  const handleCreateGame = async () => {
    await createGame().catch(() => null);
  };

  return {
    t,
    results: games?.results ?? [],
    total: Math.ceil((games?.count ?? 1) / +limit),
    isCreatingGame,
    handleCreateGame,
  };
}
