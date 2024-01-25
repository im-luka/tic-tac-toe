"use client";

import { FC } from "react";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { Button, Group, Text } from "@mantine/core";
import { IconDoorExit } from "@tabler/icons-react";
import { logoutMutation } from "@/domain/mutations/logout-mutation";

export const NavbarAuth: FC = () => {
  const { t, username, isPending, handleLogout } = useNavbarAuth();

  return (
    <Group>
      {username && (
        <Text fw="bold">{t.rich("welcomeMessage", { username })}</Text>
      )}
      <Button
        color="red.8"
        loading={isPending}
        leftSection={<IconDoorExit size={20} />}
        onClick={handleLogout}
      >
        {t("logoutAction")}
      </Button>
    </Group>
  );
};

function useNavbarAuth() {
  const t = useTranslations("component.navbar");
  const { data } = useSession();
  const username = data?.user?.username;

  const { mutateAsync: logout, isPending } = useMutation({
    mutationFn: logoutMutation.fnc,
  });

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      await signOut();
    }
  };

  return { t, username, isPending, handleLogout };
}
