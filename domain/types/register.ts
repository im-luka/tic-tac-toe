import { RegisterFormValues } from "@/app/_components/auth/register-form";

export type RegisterData = Pick<RegisterFormValues, "username" | "password">;
