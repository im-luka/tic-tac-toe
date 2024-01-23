import { userService } from "../services/user";

export const loginMutation = {
  fnc: userService.login,
};
