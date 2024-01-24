import { FC } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Group, Title } from "@mantine/core";
import { LogoutButton } from "./logout-button";
import logo from "@/public/logo.png";

export const Navbar: FC = () => {
  const { t } = useNavbar();

  return (
    <Group px="xl" justify="space-between">
      <Group gap="xl">
        <Image src={logo} width={75} height={75} alt={t("logoAlt")} />
        <Title size="h3" c="primary">
          {t("title")}
        </Title>
      </Group>
      <LogoutButton />
    </Group>
  );
};

function useNavbar() {
  const t = useTranslations("component.navbar");

  return { t };
}
