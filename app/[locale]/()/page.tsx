"use client";

import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Box, Button, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
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
}
