import { FC, useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import {
  Badge,
  Button,
  DefaultMantineColor,
  Group,
  Table,
  Text,
} from "@mantine/core";
import { IconDice, IconTrophy, IconX } from "@tabler/icons-react";
import { flatten, isNull, some } from "lodash";
import { useRouter } from "@/navigation";
import { Game, GameStatus } from "@/types/game";
import { formatDate } from "@/util/date";
import { paths } from "@/navigation/paths";

type Props = {
  item: Game;
  isJoiningGame: boolean;
  onJoinGame: (id: number) => Promise<void>;
};

export const GamesTableRow: FC<Props> = (props) => {
  const {
    item,
    disableJoin,
    actionLabel,
    loading,
    generateBadgeColor,
    generateUserLabel,
    handleJoinGame,
  } = useGamesTableRow(props);

  return (
    <Table.Tr>
      <Table.Td>
        <Text size="sm">
          {formatDate(item.created, "dateWithYearAndLongDayMonth")}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge
          size="sm"
          variant="filled"
          color={generateBadgeColor(item.status)}
        >
          {item.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        {generateUserLabel(item.first_player?.username, "player")}
      </Table.Td>
      <Table.Td>
        {generateUserLabel(item.second_player?.username, "player")}
      </Table.Td>
      <Table.Td>{generateUserLabel(item.winner?.username, "winner")}</Table.Td>
      <Table.Td>
        <Button
          disabled={disableJoin}
          loading={loading}
          fullWidth
          onClick={handleJoinGame}
        >
          {actionLabel}
        </Button>
      </Table.Td>
    </Table.Tr>
  );
};

function useGamesTableRow({ item, isJoiningGame, onJoinGame }: Props) {
  const t = useTranslations("home.table.body");
  const [clicked, setClicked] = useState(false);
  const { push } = useRouter();
  const { data } = useSession();
  const { id: userId } = data?.user ?? {};

  const userPlaying =
    item.first_player?.id === userId || item.second_player?.id === userId;
  const disableJoin = item.status !== GameStatus.Open && !userPlaying;

  const actionLabel = userPlaying
    ? !!item.winner || !some(flatten(item.board), isNull)
      ? t("inspectAction")
      : t("continueAction")
    : t("joinAction");

  const generateBadgeColor = useCallback(
    (status: GameStatus): DefaultMantineColor => {
      switch (status) {
        case GameStatus.Open:
          return "green";
        case GameStatus.Progress:
          return "orange";
        case GameStatus.Finished:
          return "red.9";
        default:
          return "dark";
      }
    },
    []
  );

  const generateUserLabel = useCallback(
    (name?: string, type?: "player" | "winner") => {
      if (!name) {
        return <IconX color="red" />;
      }
      const icon =
        type === "winner" ? (
          <IconTrophy size={20} color="yellow" />
        ) : (
          <IconDice size={20} color="gray" />
        );
      return (
        <Group gap="xs">
          {icon}
          <Text>{name}</Text>
        </Group>
      );
    },
    []
  );

  const handleJoinGame = async () => {
    setClicked(true);
    if (userPlaying) {
      push(paths.game(item.id));
    } else {
      await onJoinGame(item.id);
    }
  };

  return {
    item,
    disableJoin,
    actionLabel,
    loading: isJoiningGame && clicked,
    generateBadgeColor,
    generateUserLabel,
    handleJoinGame,
  };
}
