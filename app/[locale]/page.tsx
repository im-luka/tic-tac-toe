import { useTranslations } from "next-intl";
import { Box, Title } from "@mantine/core";

export default function HomePage() {
  const t = useTranslations();

  return (
    <Box w={300} h={100} bg="primary">
      <Title>{t("appName")}</Title>
    </Box>
  );
}
