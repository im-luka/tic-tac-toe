import React, { FC } from "react";
import { Card } from "@mantine/core";
import { BoardGridItem } from "./board-grid-item";
import styles from "@/styles/components/board-grid.module.scss";

type Props = {
  board: (number | null)[][];
  onPlayMove: (row: number, column: number) => Promise<void>;
};

export const BoardGrid: FC<Props> = (props) => {
  const { board, handleItemClick } = useBoardGrid(props);

  const renderGridRow = (arr: (number | null)[], arrIndex: number) => (
    <React.Fragment key={arrIndex}>
      {arr.map((value, index) => (
        <BoardGridItem
          key={index}
          value={value}
          onClick={() => handleItemClick(arrIndex, index)}
        />
      ))}
    </React.Fragment>
  );

  return (
    <Card p="xl" className={styles.grid}>
      {board.map(renderGridRow)}
    </Card>
  );
};

function useBoardGrid({ board, onPlayMove }: Props) {
  const handleItemClick = (row: number, column: number) => {
    onPlayMove(row, column);
  };

  return { board, handleItemClick };
}
