import { userService } from "../services/user";

export const registerMutation = {
  fnc: userService.register,
};
