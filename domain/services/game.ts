import { Game } from "@/types/game";
import { remoteApi } from "../remote";
import { getAxiosData } from "../remote/response/data";

const create = () => remoteApi.post("games/").then(getAxiosData<Game>);

const join = (id: number) =>
  remoteApi.post(`games/${id}/join/`).then(getAxiosData);

export const gameService = {
  create,
  join,
};
