import { userService } from "../services/user";

export const logoutMutation = {
  fnc: userService.logout,
};
