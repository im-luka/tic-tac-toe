import { remoteApi } from "../remote";
import { RegisterData } from "../types/register";
import { LoginData } from "../types/login";
import { LoginUser } from "../types/login-user";
import { getAxiosData } from "../remote/response/data";

const register = (data: RegisterData) => remoteApi.post("register/", data);

const login = (data: LoginData) =>
  remoteApi.post("login/", data).then(getAxiosData<LoginUser>);

export const userService = {
  register,
  login,
};
