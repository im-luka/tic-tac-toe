import { remoteApi } from "../remote";
import { RegisterData } from "../types/register";

const register = (data: RegisterData) => remoteApi.post("register/", data);

export const userService = {
  register,
};
