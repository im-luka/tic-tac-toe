import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCombobox } from "@mantine/core";
import { usePathname, useRouter } from "@/navigation";
import {
  GAMES_PER_PAGE_DEFAULT_OPTION,
  GAMES_PER_PAGE_OPTIONS,
} from "@/util/constants";
import { gamesQuerySearchParams } from "../domain/queries/games-query";

export const usePerPageCombobox = (resetPages: () => void) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState<number>(() => {
    const limitParams = searchParams.get(gamesQuerySearchParams.limit);
    return limitParams && GAMES_PER_PAGE_OPTIONS.includes(limitParams)
      ? +limitParams
      : +GAMES_PER_PAGE_DEFAULT_OPTION;
  });
  const combobox = useCombobox();

  const handleOptionSubmit = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(gamesQuerySearchParams.limit, val);
    params.delete(gamesQuerySearchParams.offset);
    resetPages();

    setValue(+val);
    combobox.closeDropdown();

    replace(`${pathname}?${params.toString()}`);
  };

  return { value, combobox, handleOptionSubmit };
};
