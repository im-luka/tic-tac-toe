import { FC } from "react";
import { Flex } from "@mantine/core";
import clsx from "clsx";
import { BoardGameIcon } from "./board-game-icon";
import styles from "@/styles/components/board-grid.module.scss";

type Props = {
  value: number | null;
  onClick: () => void;
};

export const BoardGridItem: FC<Props> = (props) => {
  const { value, handleOnClick } = useBoardGridItem(props);

  return (
    <Flex
      w={175}
      h={175}
      justify="center"
      align="center"
      className={clsx(styles.gridItem, {
        [styles.gridItemHovered]: !value,
      })}
      onClick={handleOnClick}
    >
      <BoardGameIcon value={value} />
    </Flex>
  );
};

function useBoardGridItem({ value, onClick }: Props) {
  const handleOnClick = () => {
    if (value) {
      return;
    }
    onClick();
  };

  return { value, handleOnClick };
}
