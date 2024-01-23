"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import { Button, Card, Stack, Text, Title } from "@mantine/core";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormTextInput } from "../base/text-input";
import { Link } from "../base/link";
import { paths } from "@/navigation/paths";

type Props = {
  onSubmit: (values: RegisterFormValues) => Promise<void>;
};

export const RegisterForm: FC<Props> = (props) => {
  const { t, registerForm, isSubmitting, onSubmit } = useRegisterForm(props);

  return (
    <Card maw={600} p="xl">
      <FormProvider {...registerForm}>
        <form onSubmit={onSubmit}>
          <Stack>
            <Title order={3} ta="center">
              {t.rich("form.title", {
                s: (chunk) => (
                  <Text fz={36} fw={700} c="primary" span>
                    {chunk}
                  </Text>
                ),
              })}
            </Title>
            <Stack gap="xs">
              <FormTextInput
                name="username"
                label={t("form.usernameLabel")}
                placeholder={t("form.usernamePlaceholder")}
                withAsterisk
              />
              <FormTextInput
                name="password"
                type="password"
                label={t("form.passwordLabel")}
                placeholder={t("form.passwordPlaceholder")}
                withAsterisk
              />
              <FormTextInput
                name="confirmPassword"
                type="password"
                label={t("form.confirmPasswordLabel")}
                placeholder={t("form.confirmPasswordPlaceholder")}
                withAsterisk
              />
            </Stack>
            <Stack gap="sm">
              <Button type="submit" loading={isSubmitting}>
                {t("form.submitAction")}
              </Button>
              <Text size="xs" ta="center">
                {t.rich("haveAccountLink", {
                  link: (chunk) => (
                    <Link href={paths.login()} c="blue">
                      {chunk}
                    </Link>
                  ),
                })}
              </Text>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Card>
  );
};

function useRegisterForm({ onSubmit }: Props) {
  const t = useTranslations("register");

  const tValidation = useTranslations("validation");
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(
      registerSchema(
        tValidation("required"),
        tValidation("minPassword"),
        tValidation("confirmPassword")
      )
    ),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = registerForm;

  return {
    t,
    registerForm,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;
const registerSchema = (
  required: string,
  minPassword: string,
  confirmPassword: string
) =>
  z
    .object({
      username: z.string().min(1, required),
      password: z.string().min(1, required).min(8, minPassword),
      confirmPassword: z.string(),
    })
    .refine(({ confirmPassword, password }) => confirmPassword === password, {
      message: confirmPassword,
      path: ["confirmPassword"],
    });
