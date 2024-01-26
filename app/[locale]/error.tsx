"use client";

import { useTranslations } from "next-intl";
import { Button, Center, Group, Stack, Title } from "@mantine/core";
import { IconHome, IconRepeat } from "@tabler/icons-react";
import { useRouter } from "@/navigation";
import { paths } from "@/navigation/paths";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error(props: Props) {
  const { t, message, reset, handleGoHome } = useError(props);

  return (
    <Center h="100vh" w="100%">
      <Stack gap="xl" align="center">
        <Title c="red.7">{message}</Title>
        <Group>
          <Button
            size="lg"
            color="dark.5"
            leftSection={<IconRepeat />}
            onClick={reset}
          >
            {t("tryAgainAction")}
          </Button>
          <Button
            size="lg"
            color="dark.5"
            leftSection={<IconHome />}
            onClick={handleGoHome}
          >
            {t("homeAction")}
          </Button>
        </Group>
      </Stack>
    </Center>
  );
}

function useError({ error, reset }: Props) {
  const t = useTranslations("shared.error");
  const { replace } = useRouter();

  const message = error.message ?? t("label");

  const handleGoHome = () => {
    replace(paths.home());
  };

  return { t, message, reset, handleGoHome };
}
