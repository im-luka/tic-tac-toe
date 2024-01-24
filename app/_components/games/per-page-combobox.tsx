import { FC } from "react";
import { useTranslations } from "next-intl";
import { Combobox, Group, InputBase, Text } from "@mantine/core";
import { GAMES_PER_PAGE_OPTIONS } from "@/util/constants";
import { usePerPageCombobox as usePerPageComboboxHook } from "@/hooks/use-per-page-combobox";

type Props = {
  resetPages: () => void;
};

export const PerPageCombobox: FC<Props> = (props) => {
  const { t, value, combobox, handleOptionSubmit } = usePerPageCombobox(props);

  const renderOption = (value: string) => (
    <Combobox.Option key={value} value={value.toString()}>
      {value.toString()}
    </Combobox.Option>
  );

  return (
    <Group gap="sm">
      <Text>{t("pagination.perPageLabel")}</Text>
      <Combobox store={combobox} onOptionSubmit={handleOptionSubmit}>
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
          >
            {value}
          </InputBase>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            {GAMES_PER_PAGE_OPTIONS.map(renderOption)}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Group>
  );
};

function usePerPageCombobox({ resetPages }: Props) {
  const t = useTranslations("home");
  const { value, combobox, handleOptionSubmit } =
    usePerPageComboboxHook(resetPages);

  return { t, value, combobox, handleOptionSubmit };
}
