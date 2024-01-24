"use client";

import { FC, ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider as QCProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getAxiosData } from "@/domain/remote/response/data";
import { remoteApi } from "@/domain/remote";
import { useNotificationError } from "@/hooks/use-notification-error";

type Props = {
  children: ReactNode;
};

export const QueryClientProvider: FC<Props> = ({ children }) => {
  const { queryClient } = useQueryClientProvider();

  return (
    <QCProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QCProvider>
  );
};

function useQueryClientProvider() {
  const { showNotification: onError } = useNotificationError();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: async ({ queryKey }) => {
              const [path, params] = queryKey as [string, string];
              return getAxiosData(
                await remoteApi.get(`${path}/${params ?? ""}`)
              );
            },
          },
          mutations: {
            onError,
          },
        },
      })
  );

  return { queryClient };
}
