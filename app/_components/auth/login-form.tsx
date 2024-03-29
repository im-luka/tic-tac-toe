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
  onSubmit: (values: LoginFormValues) => Promise<void>;
};

export const LoginForm: FC<Props> = (props) => {
  const { t, loginForm, isSubmitting, onSubmit } = useLoginForm(props);

  return (
    <Card maw={600} p="xl">
      <FormProvider {...loginForm}>
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
            </Stack>
            <Stack gap="sm">
              <Button type="submit" loading={isSubmitting}>
                {t("form.submitAction")}
              </Button>
              <Text size="xs" ta="center">
                {t.rich("createAccountLink", {
                  link: (chunk) => (
                    <Link href={paths.register()} c="blue">
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

function useLoginForm({ onSubmit }: Props) {
  const t = useTranslations("login");

  const tValidation = useTranslations("validation");
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema(tValidation("required"))),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = loginForm;

  return {
    t,
    loginForm,
    isSubmitting,
    onSubmit: handleSubmit(onSubmit),
  };
}

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
const loginSchema = (required: string) =>
  z.object({
    username: z.string().min(1, required),
    password: z.string().min(1, required),
  });
