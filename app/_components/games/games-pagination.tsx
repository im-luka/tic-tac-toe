import { FC } from "react";
import { Divider, Group, Pagination } from "@mantine/core";
import { PerPageCombobox } from "./per-page-combobox";
import { useGamesPagination as useGamesPaginationHook } from "@/hooks/use-games-pagination";

type Props = {
  total: number;
};

export const GamesPagination: FC<Props> = (props) => {
  const { total, activePage, handlePaginationChange, handleResetPages } =
    useGamesPagination(props);

  return (
    <Group>
      <PerPageCombobox resetPages={handleResetPages} />
      <Divider orientation="vertical" />
      <Pagination
        total={total}
        value={activePage}
        onChange={handlePaginationChange}
      />
    </Group>
  );
};

function useGamesPagination({ total }: Props) {
  const { activePage, handlePaginationChange, handleResetPages } =
    useGamesPaginationHook();

  return {
    total,
    activePage,
    handlePaginationChange,
    handleResetPages,
  };
}
