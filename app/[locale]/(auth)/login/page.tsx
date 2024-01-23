import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LoginClient } from "@/app/_components/auth/login-client";
import { withPublicOnlyPage } from "@/app/_hoc/with-public-only-page";

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

function LoginPage() {
  return <LoginClient />;
}

export default withPublicOnlyPage(LoginPage);
