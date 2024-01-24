"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Button, Stack, Text } from "@mantine/core";
import { IconArrowLeftTail } from "@tabler/icons-react";
import { useRouter } from "@/navigation";
import { gameQuery } from "@/domain/queries/game-query";
import { paths } from "@/navigation/paths";

type Props = {
  id: string;
};

export const GameClient: FC<Props> = (props) => {
  const { t, id, handleGoBack } = useGameClient(props);

  return (
    <Stack p="md" align="flex-start">
      <Button
        variant="outline"
        leftSection={<IconArrowLeftTail />}
        onClick={handleGoBack}
      >
        {t("backAction")}
      </Button>
      <Text>{id}</Text>
    </Stack>
  );
};

function useGameClient({ id }: Props) {
  const t = useTranslations("game");
  const { replace } = useRouter();

  const { data: game } = useQuery({
    queryKey: gameQuery.key(id),
  });
  console.log(game);

  const handleGoBack = () => {
    replace(paths.home());
  };

  return { t, id, handleGoBack };
}
