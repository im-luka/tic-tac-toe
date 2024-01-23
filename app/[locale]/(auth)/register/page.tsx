import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RegisterClient } from "@/app/_components/auth/register-client";

type Params = { locale: string };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "register" });
  return {
    title: t("title"),
  };
}

export default function RegisterPage() {
  return <RegisterClient />;
}
