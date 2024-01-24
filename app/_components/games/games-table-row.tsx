import { FC, useCallback } from "react";
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
import { Game, GameStatus } from "@/types/game";
import { formatDate } from "@/util/date";
import { useRouter } from "@/navigation";
import { paths } from "@/navigation/paths";

type Props = {
  item: Game;
};

export const GamesTableRow: FC<Props> = (props) => {
  const {
    t,
    item,
    disableJoin,
    generateBadgeColor,
    generateUserLabel,
    handleNavigation,
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
        <Button disabled={disableJoin} onClick={handleNavigation}>
          {t("joinAction")}
        </Button>
      </Table.Td>
    </Table.Tr>
  );
};

function useGamesTableRow({ item }: Props) {
  const t = useTranslations("home.table.body");
  const { data } = useSession();
  const { push } = useRouter();

  const disableJoin =
    item.status !== GameStatus.Open || item.first_player.id === data?.user?.id;

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

  const handleNavigation = () => {
    push(paths.game(item.id));
  };

  return {
    t,
    item,
    disableJoin,
    generateBadgeColor,
    generateUserLabel,
    handleNavigation,
  };
}
