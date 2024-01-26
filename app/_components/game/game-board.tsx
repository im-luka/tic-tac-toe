import { FC } from "react";
import { Group } from "@mantine/core";
import { BoardGrid } from "./board-grid";
import { GameInfo } from "./game-info";
import { Game } from "@/types/game";

type Props = {
  game: Game | undefined;
  onPlayMove: (row: number, column: number) => Promise<void>;
};

export const GameBoard: FC<Props> = (props) => {
  const { game, onPlayMove, board } = useGameBoard(props);

  return (
    <Group w="100%" mt="md" align="flex-start" gap={48}>
      <BoardGrid board={board} onPlayMove={onPlayMove} />
      <GameInfo
        board={board}
        firstPlayer={game?.first_player ?? null}
        secondPlayer={game?.second_player ?? null}
        winner={game?.winner ?? null}
      />
    </Group>
  );
};

function useGameBoard({ game, onPlayMove }: Props) {
  const board = game?.board ?? [];

  return { game, onPlayMove, board };
}
