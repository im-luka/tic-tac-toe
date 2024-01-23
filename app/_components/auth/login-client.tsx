"use client";

import { FC } from "react";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { LoginForm, LoginFormValues } from "./login-form";
import { useNotificationSuccess } from "@/hooks/use-notification-success";
import { loginMutation } from "@/domain/mutations/login-mutation";

export const LoginClient: FC = () => {
  const { handleLogin } = useLoginClient();

  return <LoginForm onSubmit={handleLogin} />;
};

function useLoginClient() {
  const onSuccess = useNotificationSuccess("login");

  const { mutateAsync: login } = useMutation({
    mutationFn: loginMutation.fnc,
    onSuccess,
  });

  const handleLogin = async (values: LoginFormValues) => {
    const user = await login(values).catch(() => null);
    if (user) {
      await signIn("credentials", { ...user, redirect: false });
    }
  };

  return { handleLogin };
}
