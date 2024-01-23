import "next-auth";
import { LoginUser } from "../domain/types/login-user";

export type SessionUser = Pick<LoginUser, "id" | "username">;

declare module "next-auth" {
  export interface Session {
    user?: SessionUser;
    token?: string;
  }

  interface User extends LoginUser {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: SessionUser;
    accessToken?: string;
  }
}
