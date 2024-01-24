import { gameService } from "../services/game";

export const joinGameMutation = {
  fnc: (id: number) => gameService.join(id),
};
