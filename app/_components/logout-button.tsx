"use client";

import { FC } from "react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@mantine/core";
import { IconDoorExit } from "@tabler/icons-react";
import { logoutMutation } from "@/domain/mutations/logout-mutation";

export const LogoutButton: FC = () => {
  const { t, handleLogout, isPending } = useLogoutButton();

  return (
    <Button
      color="red.8"
      loading={isPending}
      leftSection={<IconDoorExit size={20} />}
      onClick={handleLogout}
    >
      {t("label")}
    </Button>
  );
};

function useLogoutButton() {
  const t = useTranslations("component.logoutButton");

  const { mutateAsync: logout, isPending } = useMutation({
    mutationFn: logoutMutation.fnc,
  });

  const handleLogout = async () => {
    const response = await logout();
    if (response) {
      await signOut();
    }
  };

  return { t, handleLogout, isPending };
}
