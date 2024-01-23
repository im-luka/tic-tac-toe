import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { RegisterClient } from "@/app/_components/auth/register-client";
import { withPublicOnlyPage } from "@/app/_hoc/with-public-only-page";

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

function RegisterPage() {
  return <RegisterClient />;
}

export default withPublicOnlyPage(RegisterPage);
