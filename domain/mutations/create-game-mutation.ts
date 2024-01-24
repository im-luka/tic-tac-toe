import { gameService } from "../services/game";

export const createGameMutation = {
  fnc: gameService.create,
};
