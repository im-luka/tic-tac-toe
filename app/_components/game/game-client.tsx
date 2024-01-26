"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Stack } from "@mantine/core";
import { IconArrowLeftTail } from "@tabler/icons-react";
import { GameBoard } from "./game-board";
import { Game } from "@/types/game";
import { useRouter } from "@/navigation";
import { gameQuery } from "@/domain/queries/game-query";
import { moveGameMutation } from "@/domain/mutations/move-game-mutation";
import { paths } from "@/navigation/paths";

type Props = {
  id: string;
};

export const GameClient: FC<Props> = (props) => {
  const { t, game, handleGoBack, handlePlayMove } = useGameClient(props);

  return (
    <Stack p="md" align="flex-start">
      <Button
        variant="outline"
        leftSection={<IconArrowLeftTail />}
        onClick={handleGoBack}
      >
        {t("backAction")}
      </Button>
      <GameBoard game={game} onPlayMove={handlePlayMove} />
    </Stack>
  );
};

function useGameClient({ id }: Props) {
  const t = useTranslations("game");
  const { replace } = useRouter();

  const { data: game, refetch } = useQuery<Game>({
    queryKey: gameQuery.key(id),
    refetchInterval: 5000,
  });

  const { mutateAsync: playMove } = useMutation({
    mutationFn: moveGameMutation.fnc,
    onSuccess: async () => {
      await refetch();
    },
  });

  const handleGoBack = () => {
    replace(paths.home());
  };

  const handlePlayMove = async (row: number, column: number) => {
    await playMove({ id: +id, row, col: column }).catch(() => null);
  };

  return { t, game, handleGoBack, handlePlayMove };
}
