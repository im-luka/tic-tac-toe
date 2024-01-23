"use client";

import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { RegisterForm, RegisterFormValues } from "./register-form";
import { registerMutation } from "@/domain/mutations/register-mutation";
import { useNotificationSuccess } from "@/hooks/use-notification-success";
import { useRouter } from "@/navigation";
import { paths } from "@/navigation/paths";

export const RegisterClient: FC = () => {
  const { handleRegistration } = useRegisterClient();

  return <RegisterForm onSubmit={handleRegistration} />;
};

function useRegisterClient() {
  const onSuccess = useNotificationSuccess("register");
  const { replace } = useRouter();

  const { mutateAsync: register } = useMutation({
    mutationFn: registerMutation.fnc,
    onSuccess: () => {
      onSuccess();
      replace(paths.login());
    },
  });

  const handleRegistration = async ({
    username,
    password,
  }: RegisterFormValues) => {
    await register({ username, password }).catch(() => null);
  };

  return { handleRegistration };
}
