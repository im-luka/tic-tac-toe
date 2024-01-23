import { FC, ReactNode } from "react";
import type { Session } from "next-auth";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ThemeProvider } from "./theme";
import { QueryClientProvider } from "./query-client";
import { getCurrentTimezone } from "@/util/date";
import { SessionProvider } from "./session";

type Props = {
  locale: string;
  session: Session | null;
  children: ReactNode;
};

export const Providers: FC<Props> = ({ locale, session, children }) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={getCurrentTimezone()}
    >
      <SessionProvider session={session}>
        <ThemeProvider>
          <QueryClientProvider>{children}</QueryClientProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  );
};
