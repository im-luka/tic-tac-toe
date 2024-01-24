import { Game } from "@/types/game";
import { remoteApi } from "../remote";
import { getAxiosData } from "../remote/response/data";

const create = () => remoteApi.post("games/").then(getAxiosData<Game>);

export const gameService = {
  create,
};
