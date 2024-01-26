import { FC, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Group, Stack, Text } from "@mantine/core";
import { IconEqual, IconTrophy } from "@tabler/icons-react";
import { countBy, flatten, isNull, some } from "lodash";
import { BoardGameIcon } from "./board-game-icon";
import { GameUser } from "@/types/game";
import flexStyles from "@/styles/utilities/flex.module.scss";

type Props = {
  board: (number | null)[][];
  firstPlayer: GameUser | null;
  secondPlayer: GameUser | null;
  winner: GameUser | null;
};

export const GameInfo: FC<Props> = (props) => {
  const { t, firstPlayerName, secondPlayerName, progressLabel } =
    useGameInfo(props);

  return (
    <Stack mt="md" gap="xl" className={flexStyles.flex1}>
      <Group gap="xl">
        <Text fz={56} lh={1} c="primary">
          {firstPlayerName}
        </Text>
        <Text fz={56} lh={1} c="red.7">
          {t("vsLabel")}
        </Text>
        <Text fz={56} lh={1} c={secondPlayerName ? "primary" : "dark.4"}>
          {secondPlayerName || t("vsEmptyPlaceholder")}
        </Text>
      </Group>
      <Group gap="sm">
        {progressLabel.icon}
        <Text size="xl" tt="uppercase">
          {progressLabel.label}
        </Text>
      </Group>
    </Stack>
  );
};

function useGameInfo({ board, firstPlayer, secondPlayer, winner }: Props) {
  const t = useTranslations("game");
  const { data } = useSession();

  const firstPlayerName = firstPlayer?.username ?? "";
  const secondPlayerName = secondPlayer?.username ?? "";
  const winnerName = winner?.username;

  const currentPlayerId = (() => {
    const firstPlayerId = firstPlayer?.id;
    if (!firstPlayerId) {
      return;
    }
    const secondPlayerId = secondPlayer?.id;
    if (!secondPlayerId) {
      return firstPlayerId;
    }
    const flattenBoard = flatten(board);
    const idCounts = countBy(flattenBoard);
    if (idCounts["null"] === 9) {
      return firstPlayerId;
    }
    return idCounts[firstPlayerId] <= idCounts[secondPlayerId]
      ? firstPlayerId
      : secondPlayerId;
  })();

  const progressLabel: { icon: ReactNode; label: string | ReactNode } = (() => {
    if (winnerName) {
      return {
        icon: <IconTrophy size={72} color="yellow" />,
        label: t.rich("winnerLabel", {
          name: winnerName,
          s: (chunk) => (
            <Text span c="yellow" fw={700}>
              {chunk}
            </Text>
          ),
        }),
      };
    }
    if (!some(flatten(board), isNull)) {
      return {
        icon: <IconEqual size={72} color="green" />,
        label: t("drawLabel"),
      };
    }
    if (currentPlayerId === data?.user?.id) {
      return {
        icon: <BoardGameIcon value={currentPlayerId ?? null} />,
        label: t("yourTurn"),
      };
    }
    const opponentName =
      firstPlayer?.id === currentPlayerId
        ? firstPlayer?.username
        : secondPlayer?.username;
    return {
      icon: <BoardGameIcon value={currentPlayerId ?? null} />,
      label: t.rich("opponentTurn", { name: opponentName }),
    };
  })();

  return { t, firstPlayerName, secondPlayerName, progressLabel };
}
