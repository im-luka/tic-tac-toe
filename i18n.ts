import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { LOCALES } from "./util/constants";

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale)) {
    notFound();
  }

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
