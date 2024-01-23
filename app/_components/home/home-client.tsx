"use client";

import { FC } from "react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Box, Button, Stack, Title } from "@mantine/core";
import { logoutMutation } from "@/domain/mutations/logout-mutation";

export const HomeClient: FC = () => {
  const t = useTranslations();
  const { data } = useSession();

  const { data: games } = useQuery({
    queryKey: ["games/"],
  });

  const { mutateAsync: logout, isPending } = useMutation({
    mutationFn: logoutMutation.fnc,
  });

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      await signOut();
    }
  };

  return (
    <Stack>
      <Box w={300} h={100} bg="primary">
        <Title>{t("appName")}</Title>
      </Box>
      {data?.user && (
        <Button onClick={handleLogout} loading={isPending}>
          Log out
        </Button>
      )}
    </Stack>
  );
};
