import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import { gamesQuerySearchParams } from "../domain/queries/games-query";
import {
  GAMES_PER_PAGE_DEFAULT_OPTION,
  GAMES_PER_PAGE_OPTIONS,
} from "@/util/constants";

export const useGamesPagination = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const calculateCurrentPage = useCallback(() => {
    const limitParams = searchParams.get(gamesQuerySearchParams.limit);
    const limitValue =
      limitParams && GAMES_PER_PAGE_OPTIONS.includes(limitParams)
        ? +limitParams
        : GAMES_PER_PAGE_DEFAULT_OPTION;
    const offsetValue = searchParams.get(gamesQuerySearchParams.offset);
    if (!offsetValue) {
      return 1;
    }
    return Math.floor(+offsetValue / +limitValue) + 1;
  }, [searchParams]);
  const [activePage, setActivePage] = useState(calculateCurrentPage());

  const handlePaginationChange = (val: number) => {
    const limitParams = searchParams.get(gamesQuerySearchParams.limit);
    const limitValue =
      limitParams && GAMES_PER_PAGE_OPTIONS.includes(limitParams)
        ? +limitParams
        : GAMES_PER_PAGE_DEFAULT_OPTION;

    const newOffset = (val - 1) * +limitValue;
    const params = new URLSearchParams(searchParams.toString());
    if (newOffset === 0) {
      params.delete(gamesQuerySearchParams.offset);
    } else {
      params.set(gamesQuerySearchParams.offset, newOffset.toString());
    }
    replace(`${pathname}?${params.toString()}`);

    setActivePage(val);
  };

  const handleResetPages = () => {
    setActivePage(1);
  };

  return { activePage, handlePaginationChange, handleResetPages };
};
