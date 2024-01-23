"use client";

import { FC, useRef } from "react";
import {
  SessionProvider as AuthSessionProvider,
  SessionProviderProps as AuthSessionProviderProps,
} from "next-auth/react";
import { remoteApi } from "@/domain/remote";

type Props = AuthSessionProviderProps;

export const SessionProvider: FC<Props> = (props) => {
  const { children, session, restProps } = useSessionProvider(props);

  return (
    <AuthSessionProvider session={session} {...restProps}>
      {children}
    </AuthSessionProvider>
  );
};

function useSessionProvider({ children, session, ...restProps }: Props) {
  const token = session?.token;
  const interceptor = useRef<number>();
  if (typeof window !== "undefined") {
    if (interceptor.current) {
      remoteApi.interceptors.request.eject(interceptor.current);
    }
    interceptor.current = remoteApi.interceptors.request.use((config) => {
      config.headers["Authorization"] = token ? `Bearer ${token}` : undefined;
      return config;
    });
  }

  return { children, session, restProps };
}
