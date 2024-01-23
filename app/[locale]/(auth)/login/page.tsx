import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LoginForm } from "@/app/_components/auth/login-form";

type Params = { locale: string };

export async function generateMetadata({
  params: { locale },
}: {
  params: Params;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "login" });
  return {
    title: t("title"),
  };
}

export default function LoginPage() {
  return <LoginForm />;
}