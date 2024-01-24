import { FC } from "react";
import { useTranslations } from "next-intl";
import { Table } from "@mantine/core";
import { GamesTableRow } from "./games-table-row";
import { Game } from "@/types/game";

type Props = {
  results: Game[];
  isJoiningGame: boolean;
  onJoinGame: (id: number) => Promise<void>;
};

export const GamesTable: FC<Props> = (props) => {
  const { results, isJoiningGame, headLabels, onJoinGame } =
    useGamesTable(props);

  const renderHeadLabel = (label: string, index: number) => (
    <Table.Th key={index}>{label}</Table.Th>
  );

  const renderRow = (item: Game) => (
    <GamesTableRow
      key={item.id}
      item={item}
      isJoiningGame={isJoiningGame}
      onJoinGame={onJoinGame}
    />
  );

  return (
    <Table
      horizontalSpacing="md"
      verticalSpacing="xs"
      striped
      stripedColor="dark.9"
      highlightOnHover
      highlightOnHoverColor="primary.9"
      withColumnBorders
      withTableBorder
      withRowBorders={false}
    >
      <Table.Thead>
        <Table.Tr>{headLabels.map(renderHeadLabel)}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>{results.map(renderRow)}</Table.Tbody>
    </Table>
  );
};

function useGamesTable({ results, isJoiningGame, onJoinGame }: Props) {
  const t = useTranslations("home.table");

  const headLabels = [
    t("head.started"),
    t("head.status"),
    t("head.player1"),
    t("head.player2"),
    t("head.winner"),
    "",
  ];

  return { results, isJoiningGame, headLabels, onJoinGame };
}
