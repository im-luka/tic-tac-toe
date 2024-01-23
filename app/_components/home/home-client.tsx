"use client";

import { FC } from "react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Stack, Title } from "@mantine/core";

export const HomeClient: FC = () => {
  const t = useTranslations();
  const { data } = useSession();
  console.log(data);

  const { data: games } = useQuery({
    queryKey: ["games/"],
  });
  console.log(games);

  return (
    <Stack>
      <Box w={300} h={100} bg="primary">
        <Title>{t("appName")}</Title>
      </Box>
      {data?.user && (
        <Button
          onClick={async () => {
            signOut();
          }}
        >
          Log out
        </Button>
      )}
    </Stack>
  );
};
